"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOrderbook } from "@/contexts/orderbook-context"
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react"

export default function StatsPanel() {
  const { state } = useOrderbook()

  const stats = {
    totalEntries: state.entries.length,
    bidEntries: state.entries.filter((e) => e.side === "bid").length,
    askEntries: state.entries.filter((e) => e.side === "ask").length,
    totalVolume: state.entries.reduce((sum, e) => sum + e.quantity, 0),
    avgSpread: 0, // Calculate based on best bid/ask
    pressureZones: state.pressureZones.length,
  }

  const filteredEntries = state.entries.filter(
    (entry) =>
      state.selectedVenues.includes(entry.venue) &&
      entry.price >= state.priceRange[0] &&
      entry.price <= state.priceRange[1],
  )

  const bidEntries = filteredEntries.filter((e) => e.side === "bid")
  const askEntries = filteredEntries.filter((e) => e.side === "ask")

  const bestBid = Math.max(...bidEntries.map((e) => e.price), 0)
  const bestAsk = Math.min(...askEntries.map((e) => e.price), Number.POSITIVE_INFINITY)
  const spread = bestAsk - bestBid

  return (
    <Card className="absolute bottom-4 left-4 w-80 bg-background/80 backdrop-blur-sm text-foreground border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Market Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Order counts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center text-green-500 mb-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Bids</span>
            </div>
            <div className="text-xl font-bold">{bidEntries.length}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-red-500 mb-1">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Asks</span>
            </div>
            <div className="text-xl font-bold">{askEntries.length}</div>
          </div>
        </div>

        {/* Best bid/ask */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Best Bid:</span>
            <span className="text-green-500 font-mono">${bestBid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Best Ask:</span>
            <span className="text-red-500 font-mono">${bestAsk.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Spread:</span>
            <span className="text-yellow-500 font-mono">${spread.toFixed(2)}</span>
          </div>
        </div>

        {/* Volume stats */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total Volume:</span>
            <span className="font-mono">{filteredEntries.reduce((sum, e) => sum + e.quantity, 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Avg Order Size:</span>
            <span className="font-mono">
              {filteredEntries.length > 0
                ? (filteredEntries.reduce((sum, e) => sum + e.quantity, 0) / filteredEntries.length).toFixed(4)
                : "0.0000"}
            </span>
          </div>
        </div>

        {/* Pressure zones */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-2 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Pressure Zones:</span>
          </div>
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            {state.pressureZones.length}
          </Badge>
        </div>

        {/* Active venues */}
        <div>
          <span className="text-sm text-muted-foreground block mb-2">Active Venues:</span>
          <div className="flex flex-wrap gap-1">
            {state.selectedVenues.map((venue) => (
              <Badge key={venue} variant="secondary" className="text-xs">
                {venue}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
