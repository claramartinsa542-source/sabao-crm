import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricTrendProps {
  value: number
  previousValue: number
  suffix?: string
  className?: string
}

export function MetricTrend({
  value,
  previousValue,
  suffix = "%",
  className,
}: MetricTrendProps) {
  if (previousValue === 0) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        — sem período anterior
      </span>
    )
  }

  const change = ((value - previousValue) / Math.abs(previousValue)) * 100
  const isPositive = change >= 0
  const formatted = Math.abs(change).toFixed(1)

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium",
        isPositive ? "text-accent-green" : "text-accent-red",
        className
      )}
    >
      {isPositive ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      <span>
        {isPositive ? "+" : "-"}
        {formatted}
        {suffix}
      </span>
      <span className="text-muted-foreground font-normal">vs período anterior</span>
    </div>
  )
}