"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Bot,
} from "lucide-react"
import { mockLeads, mockProfiles, type LeadStage } from "@/lib/mock-data"
import { useState } from "react"
import Link from "next/link"

const stageLabels: Record<LeadStage, string> = {
  new: "Novo",
  qualified: "Qualificado",
  contacted: "Contactado",
  negotiation: "Negociação",
  closed_won: "Fechado (Ganho)",
  closed_lost: "Fechado (Perda)",
}

const stageColors: Record<LeadStage, string> = {
  new: "bg-blue-100 text-blue-800",
  qualified: "bg-purple-100 text-purple-800",
  contacted: "bg-amber-100 text-amber-800",
  negotiation: "bg-orange-100 text-orange-800",
  closed_won: "bg-emerald-100 text-emerald-800",
  closed_lost: "bg-red-100 text-red-800",
}

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [profileFilter, setProfileFilter] = useState("all")

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
      lead.handle.toLowerCase().includes(search.toLowerCase())
    const matchesStage = stageFilter === "all" || lead.currentStage === stageFilter
    const matchesProfile = profileFilter === "all" || lead.sourceProfile === profileFilter
    return matchesSearch && matchesStage && matchesProfile
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Gerencie todos os leads da operação</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou handle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={stageFilter} onValueChange={(v) => v && setStageFilter(v)}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Estágio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os estágios</SelectItem>
                {Object.entries(stageLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={profileFilter} onValueChange={(v) => v && setProfileFilter(v)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os perfis</SelectItem>
                {mockProfiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    @{profile.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                    Lead <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Estágio</TableHead>
                <TableHead>Seguidores</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="group">
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.png" />
                        <AvatarFallback>{lead.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Link href={`/leads/${lead.id}`} className="hover:underline">
                        <div className="font-medium">{lead.fullName}</div>
                        <div className="text-xs text-muted-foreground">{lead.handle}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={stageColors[lead.currentStage]}>
                        {stageLabels[lead.currentStage]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {(lead.followersCount / 1000).toFixed(1)}k
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lead.sourceProfile ? mockProfiles.find(p => p.id === lead.sourceProfile)?.username : "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {new Date(lead.lastUpdatedAt).toLocaleDateString("pt-BR")}
                        {lead.agentFilled && (
                          <Bot className="h-3 w-3 text-emerald-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Search className="h-8 w-8" />
                      <p>Nenhum lead encontrado</p>
                      <p className="text-sm">Tente ajustar os filtros de busca</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Mostrando {filteredLeads.length} de {mockLeads.length} leads</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Anterior</Button>
          <Button variant="outline" size="sm">Próximo</Button>
        </div>
      </div>
    </div>
  )
}