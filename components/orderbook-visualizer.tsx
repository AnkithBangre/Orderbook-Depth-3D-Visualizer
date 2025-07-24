"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Grid } from "@react-three/drei"
import { Suspense, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import OrderbookScene from "./orderbook-scene"
import ControlPanel from "./control-panel"
import StatsPanel from "./stats-panel"
import { ThemeToggle } from "./theme-toggle"

export default function OrderbookVisualizer() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine the current theme
  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [50, 30, 50], fov: 60 }}
        className={`transition-colors duration-300 ${mounted ? (isDark ? "bg-gray-900" : "bg-gray-100") : "bg-gray-900"}`}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={mounted ? (isDark ? 0.4 : 0.6) : 0.4} />
          <directionalLight position={[10, 10, 5]} intensity={mounted ? (isDark ? 1 : 1.2) : 1} />
          <pointLight position={[-10, -10, -5]} intensity={mounted ? (isDark ? 0.5 : 0.7) : 0.5} />

          <Environment preset={mounted ? (isDark ? "night" : "dawn") : "night"} />

          <OrderbookScene isDark={mounted ? isDark : true} />

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={20} maxDistance={200} />

          <Grid
            args={[100, 100]}
            position={[0, -1, 0]}
            cellSize={2}
            cellThickness={0.5}
            cellColor={mounted ? (isDark ? "#444" : "#ccc") : "#444"}
            sectionSize={10}
            sectionThickness={1}
            sectionColor={mounted ? (isDark ? "#666" : "#999") : "#666"}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <ControlPanel />
      <StatsPanel />

      {/* Theme Toggle */}
      <div className="absolute top-4 right-96">
        <ThemeToggle />
      </div>

      {/* Title */}
      <div className="absolute top-4 left-4 text-foreground">
        <h1 className="text-2xl font-bold mb-2">3D Orderbook Depth Visualizer</h1>
        <p className="text-sm text-muted-foreground">
          Real-time cryptocurrency orderbook visualization with pressure zone analysis
        </p>
      </div>
    </div>
  )
}
