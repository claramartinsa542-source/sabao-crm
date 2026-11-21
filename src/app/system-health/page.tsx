"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Shield,
  Zap,
  Wifi,
  WifiOff,
  Filter,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useState } from "react"

const incidentsData = [
  { id: "inc-001", type: "rate_limit", severity: "warning", message: "Perfil prospect_bot_3 atingiu rate limit de DMs", timestamp: "2026-11-20T17:45:00Z", status: "resolved", resolutionTime: "12min" },
  { id: "inc-002", type: "challenge", severity: "critical", message: "Desafio CAPTCHA detectado em luan_03", timestamp: "2026-11-20T15:30:00Z", status: "resolved", resolutionTime: "8min" },
  { id: "inc-003", type: "session_lost", severity: "critical", message: "Sessão perdida em growth_agent_4", timestamp: "2026-11-19T22:00:00Z", status: "pending", resolutionTime: "-" },
  { id: "inc-004", type: "mcp_error", severity: "warning", message: "Erro de transporte MCP ao enviar DM com caractere /", timestamp: "2026-11-20T14:20:00Z", status: "resolved", resolutionTime: "3min" },
  { id: "inc-005", type: "modal_blocked", severity: "info", message: "Modal de confirmação bloqueou ação em anadasul35", timestamp: "2026-11-20T12:10:00Z", status: "resolved", resolutionTime: "1min" },
]

const healthTimeline = [
  { time: "00h", incidents: 0 },
  { time: "04h", incidents: 1 },
  { time: "08h", incidents: 2 },
  { time: "12h", incidents: 3 },
  { time: "16h", incidents: 2 },
  { time: "20h", incidents: 1 },
]

const blockedActions = [
  { action: "comment_on_post", reason: "Lexical editor incompatível com automação", workaround: "none", affectedProfiles: 4 },
  { action: "type_dm_message", reason: "Bug no transporte MCP com caracteres /", workaround: "partial", affectedProfiles: 2 },
]

const severityConfig: Record<string, { color: string; icon: typeof AlertTriangle }> = {
  critical: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
  warning: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: AlertTriangle },
  info: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Activity },
}

export default function SystemHealthPage() {
  const [severityFilter, setSeverityFilter] = useState("all")

  const filteredIncidents = incidentsData.filter(
    (i) => severityFilter === "all" || i.severity === severityFilter
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Saúde do Sistema</h1>
          <p className="text-muted-foreground">Monitoramento de incidentes, rate limits e saúde dos agentes</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={severityFilter} onValueChange={(v) => v && setSeverityFilter(v)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="critical">Críticos</SelectItem>
              <SelectItem value="warning">Alertas</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">98.5%</p>
              <p className="text-xs text-muted-foreground">Uptime Geral</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{incidentsData.filter(i => i.status === "pending").length}</p>
              <p className="text-xs text-muted-foreground">Incidentes Pendentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">6.2min</p>
              <p className="text-xs text-muted-foreground">MTTR Médio</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Shield className="h-5 w-5 text-orange-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{blockedActions.length}</p>
              <p className="text-xs text-muted-foreground">Ações Bloqueadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents">Incidentes</TabsTrigger>
          <TabsTrigger value="blocked">Ações Bloqueadas</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <div className="grid gap-3">
            {filteredIncidents.map((incident) => {
              const config = severityConfig[incident.severity]
              const SeverityIcon = config.icon
              return (
                <Card key={incident.id}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${config.color.split(" ")[0]}`}>
                      <SeverityIcon className={`h-5 w-5 ${config.color.split(" ")[1]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={config.color}>{incident.severity.toUpperCase()}</Badge>
                        <Badge variant={incident.status === "resolved" ? "secondary" : "destructive"}>
                          {incident.status === "resolved" ? "Resolvido" : "Pendente"}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(incident.timestamp).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{incident.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          Tipo: {incident.type.replace(/_/g, " ")}
                        </span>
                        {incident.resolutionTime !== "-" && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Resolução: {incident.resolutionTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          <div className="grid gap-3">
            {blockedActions.map((action) => (
              <Card key={action.action}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{action.action}</code>
                      <Badge variant={action.workaround === "none" ? "destructive" : "secondary"}>
                        {action.workaround === "none" ? "Sem Workaround" : "Workaround Parcial"}
                      </Badge>
                    </div>
                    <Badge variant="outline">{action.affectedProfiles} perfis afetados</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{action.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Incidentes por Hora</CardTitle>
              <CardDescription>Distribuição temporal nas últimas 24h</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthTimeline}>
                    <defs>
                      <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                    <Area type="monotone" dataKey="incidents" stroke="#ef4444" fillOpacity={1} fill="url(#colorIncidents)" name="Incidentes" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}