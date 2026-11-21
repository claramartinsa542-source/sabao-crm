"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Bot,
  Activity,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RefreshCw,
  MoreHorizontal,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { mockAgents, mockProfiles, type AgentStatus } from "@/lib/mock-data"
import { useState } from "react"
import Link from "next/link"

const statusConfig: Record<AgentStatus, { label: string; color: string; icon: typeof Activity }> = {
  active: { label: "Ativo", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Activity },
  paused: { label: "Pausado", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Pause },
  error: { label: "Erro", color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle },
}

export default function AgentsPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAgents = mockAgents.filter(
    (a) => statusFilter === "all" || a.status === statusFilter
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Agentes</h1>
          <p className="text-muted-foreground">Monitore e gerencie todos os agentes de prospecção</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="paused">Pausados</SelectItem>
              <SelectItem value="error">Com Erro</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Bot className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockAgents.filter(a => a.status === "active").length}</p>
              <p className="text-xs text-muted-foreground">Agentes Ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mockAgents.reduce((acc, a) => acc + a.actionsPerHour, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Ações/Hora Total</p>
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
                {(mockAgents.reduce((acc, a) => acc + a.successRate, 0) / mockAgents.length).toFixed(1)}%
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
              <p className="text-2xl font-bold">
                {(mockAgents.reduce((acc, a) => acc + a.uptime, 0) / mockAgents.length).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">Uptime Médio</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agentes Configurados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Perfil Vinculado</TableHead>
                <TableHead className="text-right">Ações/Hora</TableHead>
                <TableHead className="text-right">Taxa Sucesso</TableHead>
                <TableHead className="text-right">Total Ações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => {
                const config = statusConfig[agent.status]
                const StatusIcon = config.icon
                const profile = mockProfiles.find(p => p.id === agent.profileId)
                return (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Link href={`/agents/${agent.id}`} className="hover:underline">
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.id}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={config.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {profile ? (
                        <span className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                          @{profile.username}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {agent.actionsPerHour > 0 ? agent.actionsPerHour : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={agent.successRate >= 90 ? "text-emerald-600" : agent.successRate >= 80 ? "text-amber-600" : "text-red-600"}>
                        {agent.successRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {agent.totalActions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/agents/${agent.id}`}>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {agent.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
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

      {filteredAgents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhum agente encontrado</p>
          <p className="text-sm">Tente ajustar os filtros ou configure um novo agente</p>
        </div>
      )}
    </div>
  )
}