import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { MetricTrend } from "./metric-trend"

interface KpiCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  previousValue?: number
  color?: "primary" | "blue" | "green" | "red" | "amber"
  prefix?: string
  suffix?: string
  className?: string
}

const COLOR_MAP = {
  primary: {
    bg: "bg-primary/15",
    text: "text-primary",
    border: "border-primary/20",
  },
  blue: {
    bg: "bg-accent-blue/15",
    text: "text-accent-blue",
    border: "border-accent-blue/20",
  },
  green: {
    bg: "bg-accent-green/15",
    text: "text-accent-green",
    border: "border-accent-green/20",
  },
  red: {
    bg: "bg-accent-red/15",
    text: "text-accent-red",
    border: "border-accent-red/20",
  },
  amber: {
    bg: "bg-accent-amber/15",
    text: "text-accent-amber",
    border: "border-accent-amber/20",
  },
}

export function KpiCard({
  icon: Icon,
  label,
  value,
  previousValue,
  color = "primary",
  prefix,
  suffix,
  className,
}: KpiCardProps) {
  const colors = COLOR_MAP[color]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all hover:border-border/80 hover:bg-surface-elevated",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            {prefix && (
              <span className="text-sm text-muted-foreground">{prefix}</span>
            )}
            <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
              {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
            </span>
            {suffix && (
              <span className="text-sm text-muted-foreground">{suffix}</span>
            )}
          </div>
          {previousValue !== undefined && typeof value === "number" && (
            <MetricTrend value={value} previousValue={previousValue} />
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border",
            colors.bg,
            colors.border
          )}
        >
          <Icon className={cn("h-5 w-5", colors.text)} />
        </div>
      </div>
    </div>
  )
}