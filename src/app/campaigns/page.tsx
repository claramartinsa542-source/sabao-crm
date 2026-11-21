"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  TrendingUp,
  Filter,
} from "lucide-react"
import { mockCampaigns, mockProfiles, mockAgents } from "@/lib/mock-data"
import { useState } from "react"
import Link from "next/link"

const statusConfig: Record<string, { label: string; color: string; icon: typeof Play }> = {
  active: { label: "Ativa", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Play },
  paused: { label: "Pausada", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Pause },
  completed: { label: "Concluída", color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle2 },
}

export default function CampaignsPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCampaigns = mockCampaigns.filter(
    (c) => statusFilter === "all" || c.status === statusFilter
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campanhas</h1>
          <p className="text-muted-foreground">Gerencie campanhas de prospecção e acompanhe resultados</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="active">Ativas</SelectItem>
              <SelectItem value="paused">Pausadas</SelectItem>
              <SelectItem value="completed">Concluídas</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Megaphone className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockCampaigns.filter(c => c.status === "active").length}</p>
              <p className="text-xs text-muted-foreground">Campanhas Ativas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mockCampaigns.reduce((acc, c) => acc + c.successCount, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Ações Bem-Sucedidas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {(mockCampaigns.reduce((acc, c) => acc + c.successRate, 0) / mockCampaigns.length).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">Taxa de Sucesso Média</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-5 w-5 text-orange-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockCampaigns.filter(c => c.status === "completed").length}</p>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todas as Campanhas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campanha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead className="text-right">Ações</TableHead>
                <TableHead className="text-right">Sucessos</TableHead>
                <TableHead className="text-right">Taxa</TableHead>
                <TableHead className="text-right">Início</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => {
                const config = statusConfig[campaign.status]
                const StatusIcon = config.icon
                const profile = mockProfiles.find(p => p.id === campaign.instagramProfileId)
                const agent = mockAgents.find(a => a.id === campaign.agentId)
                const successRate = campaign.totalActions > 0
                  ? ((campaign.successCount / campaign.totalActions) * 100).toFixed(1)
                  : "0"
                return (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">{campaign.description}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={config.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {profile ? `@${profile.username}` : "-"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {agent?.name.split(" - ")[0] || "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono">{campaign.totalActions}</TableCell>
                    <TableCell className="text-right font-mono text-emerald-600">{campaign.successCount}</TableCell>
                    <TableCell className="text-right">
                      <span className={Number(successRate) >= 90 ? "text-emerald-600" : Number(successRate) >= 80 ? "text-amber-600" : "text-red-600"}>
                        {successRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(campaign.startedAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/campaigns/${campaign.id}`}>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhuma campanha encontrada</p>
          <p className="text-sm">Tente ajustar os filtros ou crie uma nova campanha</p>
        </div>
      )}
    </div>
  )
}