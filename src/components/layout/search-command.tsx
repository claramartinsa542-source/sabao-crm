"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Bot,
  Calendar,
  Camera,
  Command,
  DollarSign,
  Kanban,
  LayoutDashboard,
  Megaphone,
  Search,
  Users,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SearchResult {
  id: string
  type: "page" | "lead" | "profile" | "campaign" | "agent"
  title: string
  subtitle: string
  icon: React.ReactNode
  href: string
}

const STATIC_RESULTS: SearchResult[] = [
  {
    id: "page-dashboard",
    type: "page",
    title: "Dashboard",
    subtitle: "Visão geral da operação",
    icon: <LayoutDashboard className="h-4 w-4 text-primary" />,
    href: "/",
  },
  {
    id: "page-pipeline",
    type: "page",
    title: "Pipeline Comercial",
    subtitle: "Funil de vendas Kanban",
    icon: <Kanban className="h-4 w-4 text-accent-blue" />,
    href: "/pipeline",
  },
  {
    id: "page-leads",
    type: "page",
    title: "Leads",
    subtitle: "Base completa de contatos",
    icon: <Users className="h-4 w-4 text-accent-green" />,
    href: "/leads",
  },
  {
    id: "page-profiles",
    type: "page",
    title: "Perfis Instagram",
    subtitle: "Gestão de ativos de prospecção",
    icon: <Camera className="h-4 w-4 text-accent-amber" />,
    href: "/instagram-profiles",
  },
  {
    id: "page-agents",
    type: "page",
    title: "Agentes",
    subtitle: "Monitoramento de trabalhadores IA",
    icon: <Bot className="h-4 w-4 text-primary" />,
    href: "/agents",
  },
  {
    id: "page-campaigns",
    type: "page",
    title: "Campanhas",
    subtitle: "Orquestração de prospecção",
    icon: <Megaphone className="h-4 w-4 text-accent-blue" />,
    href: "/campaigns",
  },
  {
    id: "page-financial",
    type: "page",
    title: "Financeiro",
    subtitle: "Receitas, custos e ROI",
    icon: <DollarSign className="h-4 w-4 text-accent-green" />,
    href: "/financial",
  },
]

interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = query.trim()
    ? STATIC_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : STATIC_RESULTS

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Listen for custom event from TopBar fallback
  useEffect(() => {
    const handler = () => onOpenChange(true)
    window.addEventListener("sabao:open-search", handler)
    return () => window.removeEventListener("sabao:open-search", handler)
  }, [onOpenChange])

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onOpenChange])

  // Arrow navigation + Enter to select
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault()
        router.push(filtered[selectedIndex].href)
        onOpenChange(false)
        setQuery("")
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, filtered, selectedIndex, router, onOpenChange])

  const handleSelect = (href: string) => {
    router.push(href)
    onOpenChange(false)
    setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass sm:max-w-lg border-border p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Buscar no Sabão CRM</DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Buscar páginas, leads, perfis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="mb-2 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Nenhum resultado para &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <ul role="listbox" className="space-y-0.5">
              {filtered.map((result, index) => (
                <li key={result.id} role="option" aria-selected={index === selectedIndex}>
                  <button
                    type="button"
                    onClick={() => handleSelect(result.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      index === selectedIndex
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-surface-elevated border border-border/50">
                      {result.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {result.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {result.subtitle}
                      </p>
                    </div>
                    {index === selectedIndex && (
                      <span className="text-xs text-muted-foreground">↵</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-border px-4 py-2">
          <p className="text-[11px] text-muted-foreground">
            Navegue com ↑↓ · Selecione com Enter · Feche com Esc
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}