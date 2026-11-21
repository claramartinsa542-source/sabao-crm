"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Kanban,
  Users,
  Camera,
  Bot,
  DollarSign,
  Megaphone,
  BarChart3,
  Activity,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

interface NavSection {
  title: string
  items: NavItem[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Principal",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/pipeline", label: "Pipeline", icon: Kanban },
      { href: "/leads", label: "Leads", icon: Users },
    ],
  },
  {
    title: "Operação",
    items: [
      { href: "/instagram-profiles", label: "Perfis Instagram", icon: Camera },
      { href: "/agents", label: "Agentes", icon: Bot },
      { href: "/campaigns", label: "Campanhas", icon: Megaphone },
    ],
  },
  {
    title: "Analytics",
    items: [
      { href: "/financial", label: "Financeiro", icon: DollarSign },
      { href: "/metrics", label: "Métricas", icon: BarChart3 },
    ],
  },
  {
    title: "Sistema",
    items: [
      { href: "/system-health", label: "Saúde do Sistema", icon: Activity },
      { href: "/notifications", label: "Notificações", icon: Bell },
      { href: "/settings", label: "Configurações", icon: Settings },
    ],
  },
]

// Mock agent status dots — will be replaced by real data in Phase 2
const AGENT_DOTS = [
  { id: "agent-1", status: "active" as const, name: "Agente Alpha" },
  { id: "agent-2", status: "active" as const, name: "Agente Beta" },
  { id: "agent-3", status: "warning" as const, name: "Agente Gamma" },
]

const STATUS_COLORS = {
  active: "bg-accent-green shadow-[0_0_6px_oklch(0.65_0.20_160/0.6)]",
  warning: "bg-accent-amber shadow-[0_0_6px_oklch(0.75_0.18_80/0.6)]",
  error: "bg-accent-red shadow-[0_0_6px_oklch(0.60_0.22_25/0.6)]",
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo area */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <span className="text-base font-bold tracking-tight text-gradient-primary">
              Sabão CRM
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7 text-muted-foreground hover:text-foreground",
            collapsed && "mx-auto"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Agent status dots footer */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Agentes Ativos
          </p>
        )}
        <Link
          href="/agents"
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-sidebar-accent",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Ver Agentes" : undefined}
        >
          <div className="flex items-center gap-1.5">
            {AGENT_DOTS.map((agent) => (
              <span
                key={agent.id}
                className={cn(
                  "inline-flex h-2.5 w-2.5 rounded-full transition-all hover:scale-125",
                  STATUS_COLORS[agent.status]
                )}
                title={!collapsed ? agent.name : undefined}
              />
            ))}
          </div>
          {!collapsed && (
            <span className="text-xs text-muted-foreground">
              {AGENT_DOTS.filter((a) => a.status === "active").length}/{AGENT_DOTS.length} ativos
            </span>
          )}
        </Link>
      </div>
    </aside>
  )
}