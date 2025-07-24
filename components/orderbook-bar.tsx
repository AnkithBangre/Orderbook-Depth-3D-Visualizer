"use client"

import { useRef, useState } from "react"
import type { Mesh } from "three"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"

interface OrderbookBarProps {
  position: [number, number, number]
  scale: [number, number, number]
  side: "bid" | "ask"
  venue: string
  price: number
  quantity: number
  isDark: boolean
}

const venueColors = {
  Binance: "#F3BA2F",
  OKX: "#0052FF",
  Bybit: "#F7931A",
  Deribit: "#00D4AA",
}

const lightThemeColors = {
  bid: "#059669", // Darker green for light mode
  ask: "#DC2626", // Darker red for light mode
}

const darkThemeColors = {
  bid: "#10B981", // Brighter green for dark mode
  ask: "#EF4444", // Brighter red for dark mode
}

export default function OrderbookBar({ position, scale, side, venue, price, quantity, isDark }: OrderbookBarProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.opacity = hovered ? 0.9 : isDark ? 0.7 : 0.8
    }
  })

  const colors = isDark ? darkThemeColors : lightThemeColors
  const baseColor = colors[side]
  const venueColor = venueColors[venue as keyof typeof venueColors] || "#888888"

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={baseColor}
        transparent
        opacity={isDark ? 0.7 : 0.8}
        emissive={venueColor}
        emissiveIntensity={isDark ? 0.1 : 0.05}
      />

      {hovered && (
        <Html distanceFactor={10}>
          <div
            className={`${isDark ? "bg-black" : "bg-white"} ${isDark ? "bg-opacity-80" : "bg-opacity-90"} ${isDark ? "text-white" : "text-black"} p-2 rounded text-xs whitespace-nowrap border ${isDark ? "border-gray-600" : "border-gray-300"} shadow-lg`}
          >
            <div className="font-bold">{venue}</div>
            <div>{side.toUpperCase()}</div>
            <div>Price: ${price.toFixed(2)}</div>
            <div>Quantity: {quantity.toFixed(4)}</div>
          </div>
        </Html>
      )}
    </mesh>
  )
}
