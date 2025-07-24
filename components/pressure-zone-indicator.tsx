"use client"

import { useRef } from "react"
import type { Mesh } from "three"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"

interface PressureZoneIndicatorProps {
  position: [number, number, number]
  intensity: number
  totalQuantity: number
  venues: string[]
  isDark: boolean
}

const lightThemeColors = {
  high: "#DC2626", // Red
  medium: "#D97706", // Orange
  low: "#059669", // Green
}

const darkThemeColors = {
  high: "#FF6B6B", // Light red
  medium: "#FFE66D", // Yellow
  low: "#4ECDC4", // Cyan
}

export default function PressureZoneIndicator({
  position,
  intensity,
  totalQuantity,
  venues,
  isDark,
}: PressureZoneIndicatorProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.material.opacity = (isDark ? 0.3 : 0.4) + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  const colors = isDark ? darkThemeColors : lightThemeColors
  const color = intensity > 0.7 ? colors.high : intensity > 0.4 ? colors.medium : colors.low

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[intensity * 3, intensity * 3, 0.5, 8]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={isDark ? 0.4 : 0.5}
        emissive={color}
        emissiveIntensity={isDark ? 0.3 : 0.2}
      />

      <Html distanceFactor={15}>
        <div
          className={`${isDark ? "bg-black" : "bg-white"} ${isDark ? "bg-opacity-90" : "bg-opacity-95"} ${isDark ? "text-white" : "text-black"} p-2 rounded text-xs border ${isDark ? "border-gray-600" : "border-gray-300"} shadow-lg`}
        >
          <div className="font-bold text-yellow-500">Pressure Zone</div>
          <div>Quantity: {totalQuantity.toFixed(2)}</div>
          <div>Venues: {venues.join(", ")}</div>
          <div>Intensity: {(intensity * 100).toFixed(0)}%</div>
        </div>
      </Html>
    </mesh>
  )
}
