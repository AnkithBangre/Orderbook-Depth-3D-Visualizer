"use client"

import { Suspense } from "react"
import OrderbookVisualizer from "@/components/orderbook-visualizer"
import { OrderbookProvider } from "@/contexts/orderbook-context"

export default function Home() {
  return (
    <OrderbookProvider>
      <div className="w-full h-screen bg-background transition-colors duration-300">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="text-foreground text-xl">Loading 3D Orderbook Visualizer...</div>
            </div>
          }
        >
          <OrderbookVisualizer />
        </Suspense>
      </div>
    </OrderbookProvider>
  )
}
