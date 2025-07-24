"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { Text } from "@react-three/drei"
import { useOrderbook } from "@/contexts/orderbook-context"
import OrderbookBar from "./orderbook-bar"
import PressureZoneIndicator from "./pressure-zone-indicator"

interface OrderbookSceneProps {
  isDark: boolean
}

export default function OrderbookScene({ isDark }: OrderbookSceneProps) {
  const groupRef = useRef<Group>(null)
  const { state } = useOrderbook()

  // Auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current && state.isRealTime) {
      groupRef.current.rotation.y += delta * state.rotationSpeed * 0.1
    }
  })

  // Filter and process orderbook data
  const processedData = useMemo(() => {
    const now = Date.now()
    const cutoffTime = now - state.timeRange

    return state.entries
      .filter(
        (entry) =>
          state.selectedVenues.includes(entry.venue) &&
          entry.timestamp > cutoffTime &&
          entry.price >= state.priceRange[0] &&
          entry.price <= state.priceRange[1] &&
          entry.quantity >= state.quantityThreshold,
      )
      .sort((a, b) => a.timestamp - b.timestamp)
  }, [state.entries, state.selectedVenues, state.timeRange, state.priceRange, state.quantityThreshold])

  // Create 3D positions
  const bars = useMemo(() => {
    const maxTime = Math.max(...processedData.map((e) => e.timestamp))
    const minTime = Math.min(...processedData.map((e) => e.timestamp))
    const timeRange = maxTime - minTime || 1

    return processedData.map((entry, index) => {
      const x = (entry.price - 42500) * 0.01 // Center around 42500, scale down
      const y = entry.quantity * 2 // Height represents quantity
      const z = ((entry.timestamp - minTime) / timeRange) * 30 - 15 // Time axis

      return {
        ...entry,
        position: [x, y / 2, z] as [number, number, number],
        scale: [0.5, y, 0.5] as [number, number, number],
      }
    })
  }, [processedData])

  const textColor = isDark ? "white" : "#333333"
  const axisColor = isDark ? "#888" : "#666"

  return (
    <group ref={groupRef}>
      {/* Orderbook bars */}
      {bars.map((bar) => (
        <OrderbookBar
          key={bar.id}
          position={bar.position}
          scale={bar.scale}
          side={bar.side}
          venue={bar.venue}
          price={bar.price}
          quantity={bar.quantity}
          isDark={isDark}
        />
      ))}

      {/* Pressure zone indicators */}
      {state.showPressureZones &&
        state.pressureZones.map((zone, index) => (
          <PressureZoneIndicator
            key={`pressure-${zone.priceLevel}`}
            position={[(zone.priceLevel - 42500) * 0.01, zone.totalQuantity, 0]}
            intensity={zone.intensity}
            totalQuantity={zone.totalQuantity}
            venues={zone.venues}
            isDark={isDark}
          />
        ))}

      {/* Axis labels */}
      <Text position={[0, -5, -20]} fontSize={2} color={textColor} anchorX="center" anchorY="middle">
        Time →
      </Text>

      <Text
        position={[-25, -2, 0]}
        fontSize={2}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        ← Price
      </Text>

      <Text
        position={[0, 15, 0]}
        fontSize={2}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 2, 0, 0]}
      >
        Quantity ↑
      </Text>

      {/* Price level indicators */}
      {[41000, 42000, 43000, 44000, 45000].map((price) => (
        <Text
          key={price}
          position={[(price - 42500) * 0.01, -3, 0]}
          fontSize={1}
          color={axisColor}
          anchorX="center"
          anchorY="middle"
        >
          ${price.toLocaleString()}
        </Text>
      ))}
    </group>
  )
}
