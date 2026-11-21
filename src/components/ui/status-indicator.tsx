import { cn } from "@/lib/utils"

type StatusType =
  | "active"
  | "inactive"
  | "warning"
  | "error"
  | "rate_limited"
  | "paused"

interface StatusIndicatorProps {
  status: StatusType
  pulse?: boolean
  label?: string
  className?: string
}

const STATUS_CONFIG: Record<
  StatusType,
  { color: string; glow: string; defaultLabel: string }
> = {
  active: {
    color: "bg-accent-green",
    glow: "shadow-[0_0_6px_oklch(0.65_0.20_160/0.6)]",
    defaultLabel: "Ativo",
  },
  inactive: {
    color: "bg-muted-foreground/40",
    glow: "",
    defaultLabel: "Inativo",
  },
  warning: {
    color: "bg-accent-amber",
    glow: "shadow-[0_0_6px_oklch(0.75_0.18_80/0.6)]",
    defaultLabel: "Atenção",
  },
  error: {
    color: "bg-accent-red",
    glow: "shadow-[0_0_6px_oklch(0.60_0.22_25/0.6)]",
    defaultLabel: "Erro",
  },
  rate_limited: {
    color: "bg-accent-amber",
    glow: "shadow-[0_0_6px_oklch(0.75_0.18_80/0.6)]",
    defaultLabel: "Rate Limited",
  },
  paused: {
    color: "bg-muted-foreground/40",
    glow: "",
    defaultLabel: "Pausado",
  },
}

export function StatusIndicator({
  status,
  pulse = false,
  label,
  className,
}: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status]
  const displayLabel = label ?? config.defaultLabel

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {pulse && status === "active" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              config.color
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            config.color,
            config.glow
          )}
        />
      </span>
      <span className="text-xs font-medium text-muted-foreground">
        {displayLabel}
      </span>
    </div>
  )
}