"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useCallback } from "react"

export interface OrderbookEntry {
  price: number
  quantity: number
  timestamp: number
  venue: string
  side: "bid" | "ask"
  id: string
}

export interface PressureZone {
  priceLevel: number
  totalQuantity: number
  intensity: number
  venues: string[]
}

export interface OrderbookState {
  entries: OrderbookEntry[]
  venues: string[]
  selectedVenues: string[]
  timeRange: number
  priceRange: [number, number]
  quantityThreshold: number
  pressureZones: PressureZone[]
  isRealTime: boolean
  rotationSpeed: number
  showPressureZones: boolean
}

type OrderbookAction =
  | { type: "ADD_ENTRIES"; entries: OrderbookEntry[] }
  | { type: "SET_SELECTED_VENUES"; venues: string[] }
  | { type: "SET_TIME_RANGE"; range: number }
  | { type: "SET_PRICE_RANGE"; range: [number, number] }
  | { type: "SET_QUANTITY_THRESHOLD"; threshold: number }
  | { type: "SET_PRESSURE_ZONES"; zones: PressureZone[] }
  | { type: "TOGGLE_REAL_TIME" }
  | { type: "SET_ROTATION_SPEED"; speed: number }
  | { type: "TOGGLE_PRESSURE_ZONES" }
  | { type: "CLEAR_OLD_ENTRIES"; cutoffTime: number }

const initialState: OrderbookState = {
  entries: [],
  venues: ["Binance", "OKX", "Bybit", "Deribit"],
  selectedVenues: ["Binance", "OKX"],
  timeRange: 300000, // 5 minutes
  priceRange: [40000, 45000],
  quantityThreshold: 0.1,
  pressureZones: [],
  isRealTime: true,
  rotationSpeed: 0.5,
  showPressureZones: true,
}

function orderbookReducer(state: OrderbookState, action: OrderbookAction): OrderbookState {
  switch (action.type) {
    case "ADD_ENTRIES":
      return {
        ...state,
        entries: [...state.entries, ...action.entries].slice(-1000), // Keep last 1000 entries
      }
    case "SET_SELECTED_VENUES":
      return { ...state, selectedVenues: action.venues }
    case "SET_TIME_RANGE":
      return { ...state, timeRange: action.range }
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.range }
    case "SET_QUANTITY_THRESHOLD":
      return { ...state, quantityThreshold: action.threshold }
    case "SET_PRESSURE_ZONES":
      return { ...state, pressureZones: action.zones }
    case "TOGGLE_REAL_TIME":
      return { ...state, isRealTime: !state.isRealTime }
    case "SET_ROTATION_SPEED":
      return { ...state, rotationSpeed: action.speed }
    case "TOGGLE_PRESSURE_ZONES":
      return { ...state, showPressureZones: !state.showPressureZones }
    case "CLEAR_OLD_ENTRIES":
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.timestamp > action.cutoffTime),
      }
    default:
      return state
  }
}

const OrderbookContext = createContext<{
  state: OrderbookState
  dispatch: React.Dispatch<OrderbookAction>
  generateMockData: () => void
} | null>(null)

export function OrderbookProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(orderbookReducer, initialState)

  const generateMockData = useCallback(() => {
    const now = Date.now()
    const basePrice = 42500
    const entries: OrderbookEntry[] = []

    // Generate mock orderbook data
    state.venues.forEach((venue) => {
      // Generate bid orders (below base price)
      for (let i = 0; i < 20; i++) {
        const price = basePrice - i * 10 - Math.random() * 10
        const quantity = Math.random() * 5 + 0.1
        entries.push({
          id: `${venue}-bid-${i}-${now}`,
          price,
          quantity,
          timestamp: now - Math.random() * state.timeRange,
          venue,
          side: "bid",
        })
      }

      // Generate ask orders (above base price)
      for (let i = 0; i < 20; i++) {
        const price = basePrice + i * 10 + Math.random() * 10
        const quantity = Math.random() * 5 + 0.1
        entries.push({
          id: `${venue}-ask-${i}-${now}`,
          price,
          quantity,
          timestamp: now - Math.random() * state.timeRange,
          venue,
          side: "ask",
        })
      }
    })

    dispatch({ type: "ADD_ENTRIES", entries })
  }, [state.venues, state.timeRange])

  // Calculate pressure zones
  useEffect(() => {
    const priceGroups = new Map<number, { quantity: number; venues: Set<string> }>()

    state.entries
      .filter((entry) => state.selectedVenues.includes(entry.venue))
      .forEach((entry) => {
        const priceLevel = Math.round(entry.price / 10) * 10 // Group by $10 levels
        const existing = priceGroups.get(priceLevel) || { quantity: 0, venues: new Set() }
        existing.quantity += entry.quantity
        existing.venues.add(entry.venue)
        priceGroups.set(priceLevel, existing)
      })

    const zones: PressureZone[] = Array.from(priceGroups.entries())
      .map(([price, data]) => ({
        priceLevel: price,
        totalQuantity: data.quantity,
        intensity: Math.min(data.quantity / 10, 1), // Normalize intensity
        venues: Array.from(data.venues),
      }))
      .filter((zone) => zone.totalQuantity > state.quantityThreshold * 5)
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 10) // Top 10 pressure zones

    dispatch({ type: "SET_PRESSURE_ZONES", zones })
  }, [state.entries, state.selectedVenues, state.quantityThreshold])

  // Simulate real-time data updates
  useEffect(() => {
    if (!state.isRealTime) return

    const interval = setInterval(() => {
      generateMockData()
      // Clean old entries
      const cutoffTime = Date.now() - state.timeRange
      dispatch({ type: "CLEAR_OLD_ENTRIES", cutoffTime })
    }, 1000)

    return () => clearInterval(interval)
  }, [state.isRealTime, generateMockData, state.timeRange])

  // Initial data generation
  useEffect(() => {
    generateMockData()
  }, [generateMockData])

  return <OrderbookContext.Provider value={{ state, dispatch, generateMockData }}>{children}</OrderbookContext.Provider>
}

export function useOrderbook() {
  const context = useContext(OrderbookContext)
  if (!context) {
    throw new Error("useOrderbook must be used within OrderbookProvider")
  }
  return context
}
