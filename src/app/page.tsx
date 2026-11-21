"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Users,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Bot,
  Camera,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { mockDashboardMetrics, mockChartData, mockActivityFeed } from "@/lib/mock-data"
import { useState } from "react"

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]

export default function DashboardPage() {
  const [period, setPeriod] = useState("7days")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da operação de prospecção</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Hoje</SelectItem>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="monthly">Este mês</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.totalLeads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +{mockDashboardMetrics.newLeadsToday} hoje
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversões (Semana)</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.conversionsThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +12% vs semana anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita (Mês)</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {mockDashboardMetrics.revenueThisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +8% vs mês anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.responseRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center gap-1">
                <ArrowDownRight className="h-3 w-3" />
                -2.3% vs média
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agentes Ativos</CardTitle>
            <Bot className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.activeAgents}</div>
            <p className="text-xs text-muted-foreground">de 3 configurados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perfis Ativos</CardTitle>
            <Camera className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.activeProfiles}</div>
            <p className="text-xs text-muted-foreground">1 em rate limit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardMetrics.pendingActions}</div>
            <p className="text-xs text-muted-foreground">na fila de execução</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Evolução de Leads e Conversões</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData.leadsOverTime}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }}
                    labelStyle={{ color: "hsl(var(--popover-foreground))" }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="#10b981" fillOpacity={1} fill="url(#colorLeads)" name="Leads" />
                  <Area type="monotone" dataKey="conversions" stroke="#3b82f6" fillOpacity={1} fill="url(#colorConversions)" name="Conversões" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita por Fonte</CardTitle>
            <CardDescription>Distribuição mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockChartData.revenueBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={false}
                  >
                    {mockChartData.revenueBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance & Activity Feed */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance dos Agentes</CardTitle>
            <CardDescription>Ações e taxa de sucesso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData.agentPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="agent" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Bar dataKey="actions" fill="#10b981" name="Ações" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="success" fill="#3b82f6" name="Sucessos" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações dos agentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivityFeed.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    {activity.type === "lead_moved" && <TrendingUp className="h-4 w-4 text-emerald-600" />}
                    {activity.type === "dm_sent" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                    {activity.type === "new_lead" && <Users className="h-4 w-4 text-purple-600" />}
                    {activity.type === "rate_limit" && <Clock className="h-4 w-4 text-orange-600" />}
                    {activity.type === "follow" && <Camera className="h-4 w-4 text-pink-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      {activity.agent && ` • ${activity.agent}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Ver todas as atividades
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}