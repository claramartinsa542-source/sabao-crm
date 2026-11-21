"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronRight, Command, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const ROUTE_LABELS: Record<string, string> = {
  "/": "Dashboard",
  "/pipeline": "Pipeline Comercial",
  "/leads": "Leads",
  "/instagram-profiles": "Perfis Instagram",
  "/agents": "Agentes",
  "/campaigns": "Campanhas",
  "/financial": "Financeiro",
  "/metrics": "Métricas",
  "/system-health": "Saúde do Sistema",
  "/notifications": "Notificações",
  "/settings": "Configurações",
}

const SECTION_MAP: Record<string, string> = {
  "/pipeline": "Principal",
  "/leads": "Principal",
  "/instagram-profiles": "Operação",
  "/agents": "Operação",
  "/campaigns": "Operação",
  "/financial": "Analytics",
  "/metrics": "Analytics",
  "/system-health": "Sistema",
  "/notifications": "Sistema",
  "/settings": "Sistema",
}

interface TopBarProps {
  notificationCount?: number
  userName?: string
  onSearchOpen?: () => void
}

export function TopBar({
  notificationCount = 0,
  userName = "Operador",
  onSearchOpen,
}: TopBarProps) {
  const pathname = usePathname()

  const currentLabel = ROUTE_LABELS[pathname] ?? "Página"
  const currentSection = SECTION_MAP[pathname]

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
  ]

  if (currentSection && pathname !== "/") {
    breadcrumbs.push({ label: currentSection })
  }

  if (pathname !== "/") {
    breadcrumbs.push({ label: currentLabel })
  }

  const handleSearchClick = () => {
    if (onSearchOpen) {
      onSearchOpen()
      return
    }
    window.dispatchEvent(new CustomEvent("sabao:open-search"))
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border bg-surface-elevated px-4 glass-elevated">
      {/* Left: Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <span key={crumb.label + index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {crumb.label === "Home" && <Home className="h-3.5 w-3.5" />}
                  {crumb.label === "Home" ? null : crumb.label}
                </Link>
              ) : (
                <span
                  className={`flex items-center gap-1 ${
                    isLast ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {crumb.label === "Home" && <Home className="h-3.5 w-3.5" />}
                  {crumb.label === "Home" ? null : crumb.label}
                </span>
              )}
            </span>
          )
        })}
      </nav>

      {/* Center: Search trigger */}
      <button
        type="button"
        onClick={handleSearchClick}
        className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-input/50 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-input hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        style={{ minWidth: 280 }}
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Buscar no Sabão...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Right: Notifications + Avatar */}
      <div className="flex items-center gap-2">
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            )}
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            }
          >
            <Avatar className="h-8 w-8 border border-border">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 glass">
            <DropdownMenuItem>
              <Link href="/settings" className="flex w-full items-center">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="flex w-full items-center">
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}