"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useOrderbook } from "@/contexts/orderbook-context"
import { Play, Pause, RotateCcw } from "lucide-react"

export default function ControlPanel() {
  const { state, dispatch, generateMockData } = useOrderbook()

  const timeRangeOptions = [
    { value: 60000, label: "1m" },
    { value: 300000, label: "5m" },
    { value: 900000, label: "15m" },
    { value: 3600000, label: "1h" },
  ]

  return (
    <Card className="absolute top-4 right-4 w-80 bg-background/80 backdrop-blur-sm text-foreground border-border/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Real-time toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="realtime">Real-time Updates</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="realtime"
              checked={state.isRealTime}
              onCheckedChange={() => dispatch({ type: "TOGGLE_REAL_TIME" })}
            />
            {state.isRealTime ? (
              <Play className="w-4 h-4 text-green-500" />
            ) : (
              <Pause className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>

        {/* Venue selection */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Trading Venues</Label>
          <div className="flex flex-wrap gap-2">
            {state.venues.map((venue) => (
              <Badge
                key={venue}
                variant={state.selectedVenues.includes(venue) ? "default" : "outline"}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  const newVenues = state.selectedVenues.includes(venue)
                    ? state.selectedVenues.filter((v) => v !== venue)
                    : [...state.selectedVenues, venue]
                  dispatch({ type: "SET_SELECTED_VENUES", venues: newVenues })
                }}
              >
                {venue}
              </Badge>
            ))}
          </div>
        </div>

        {/* Time range */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Time Range</Label>
          <div className="flex gap-2">
            {timeRangeOptions.map((option) => (
              <Button
                key={option.value}
                variant={state.timeRange === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch({ type: "SET_TIME_RANGE", range: option.value })}
                className="transition-colors"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Rotation speed */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Rotation Speed: {state.rotationSpeed.toFixed(1)}x</Label>
          <Slider
            value={[state.rotationSpeed]}
            onValueChange={([value]) => dispatch({ type: "SET_ROTATION_SPEED", speed: value })}
            max={2}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Quantity threshold */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Min Quantity: {state.quantityThreshold.toFixed(2)}</Label>
          <Slider
            value={[state.quantityThreshold]}
            onValueChange={([value]) => dispatch({ type: "SET_QUANTITY_THRESHOLD", threshold: value })}
            max={5}
            min={0.01}
            step={0.01}
            className="w-full"
          />
        </div>

        {/* Pressure zones toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="pressure-zones">Show Pressure Zones</Label>
          <Switch
            id="pressure-zones"
            checked={state.showPressureZones}
            onCheckedChange={() => dispatch({ type: "TOGGLE_PRESSURE_ZONES" })}
          />
        </div>

        {/* Manual refresh */}
        <Button onClick={generateMockData} className="w-full bg-transparent" variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </CardContent>
    </Card>
  )
}
