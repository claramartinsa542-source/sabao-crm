"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  MessageSquare,
  TrendingUp,
  Clock,
  Zap,
  Filter,
  Download,
  Activity,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend,
} from "recharts"
import { mockChartData } from "@/lib/mock-data"
import { useState } from "react"

const heatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][day],
    hour: `${hour}h`,
    value: Math.floor(Math.random() * 100),
  }))
).flat()

const funnelData = [
  { stage: "Novos", count: 1247, rate: 100 },
  { stage: "Qualificados", count: 892, rate: 71.5 },
  { stage: "Contactados", count: 634, rate: 50.8 },
  { stage: "Negociação", count: 312, rate: 25.0 },
  { stage: "Fechados", count: 156, rate: 12.5 },
]

const agentComparison = [
  { metric: "Velocidade", "Luan 03": 85, "Ana Dasul": 78, "Bot 3": 65 },
  { metric: "Precisão", "Luan 03": 92, "Ana Dasul": 88, "Bot 3": 82 },
  { metric: "Engajamento", "Luan 03": 78, "Ana Dasul": 85, "Bot 3": 70 },
  { metric: "Conversão", "Luan 03": 88, "Ana Dasul": 82, "Bot 3": 75 },
  { metric: "Resiliência", "Luan 03": 95, "Ana Dasul": 90, "Bot 3": 85 },
]

export default function MetricsPage() {
  const [period, setPeriod] = useState("7days")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Métricas e Analytics</h1>
          <p className="text-muted-foreground">Análise avançada de performance dos agentes e campanhas</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Hoje</SelectItem>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="monthly">Este mês</SelectItem>
              <SelectItem value="all">Todo período</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">34.5%</p>
              <p className="text-xs text-muted-foreground">Taxa de Resposta</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">2.3h</p>
              <p className="text-xs text-muted-foreground">Tempo Médio de Resposta</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">12.5%</p>
              <p className="text-xs text-muted-foreground">Taxa de Conversão</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="h-5 w-5 text-orange-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">91.2%</p>
              <p className="text-xs text-muted-foreground">Eficiência dos Agentes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="copies">Análise de Copies</TabsTrigger>
          <TabsTrigger value="funnel">Funil de Conversão</TabsTrigger>
          <TabsTrigger value="agents">Comparativo Agentes</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Resposta por Tipo de Mensagem</CardTitle>
                <CardDescription>Performance por categoria de mensagem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { type: "Inicial", rate: 38.5, responses: 145 },
                      { type: "Follow-up", rate: 28.2, responses: 89 },
                      { type: "Fechamento", rate: 45.1, responses: 67 },
                      { type: "Personalizada", rate: 52.3, responses: 45 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} unit="%" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                      <Bar dataKey="rate" fill="#10b981" name="Taxa (%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução da Taxa de Resposta</CardTitle>
                <CardDescription>Tendência temporal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { date: "14/11", rate: 32.1 },
                      { date: "15/11", rate: 35.4 },
                      { date: "16/11", rate: 33.8 },
                      { date: "17/11", rate: 36.2 },
                      { date: "18/11", rate: 34.9 },
                      { date: "19/11", rate: 37.1 },
                      { date: "20/11", rate: 34.5 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} unit="%" domain={[25, 45]} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                      <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Taxa" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="copies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>A/B Testing - Variações de Copy</CardTitle>
                <CardDescription>Comparação de performance entre templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData.responseRates} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" tick={{ fontSize: 12 }} unit="%" />
                      <YAxis dataKey="variation" type="category" width={80} tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                      <Bar dataKey="rate" fill="#10b981" name="Taxa de Resposta" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes das Variações</CardTitle>
                <CardDescription>Métricas completas por template</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChartData.responseRates.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono">{item.variation}</Badge>
                        <div>
                          <p className="text-sm font-medium">{item.responses} respostas</p>
                          <p className="text-xs text-muted-foreground">Volume total</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${item.rate >= 40 ? "text-emerald-600" : item.rate >= 35 ? "text-blue-600" : "text-amber-600"}`}>
                          {item.rate}%
                        </p>
                        <p className="text-xs text-muted-foreground">Taxa</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funil de Conversão Completo</CardTitle>
              <CardDescription>Progressão de leads através dos estágios do pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="stage" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }}
                      formatter={(value, name) => [name === "count" ? Number(value).toLocaleString() : `${Number(value)}%`, name === "count" ? "Leads" : "Taxa"]}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#10b981" name="Leads" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="rate" fill="#3b82f6" name="Taxa (%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Radar Comparativo de Agentes</CardTitle>
                <CardDescription>Multi-dimensional performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={agentComparison}>
                      <PolarGrid className="stroke-muted" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="Luan 03" dataKey="Luan 03" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      <Radar name="Ana Dasul" dataKey="Ana Dasul" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      <Radar name="Bot 3" dataKey="Bot 3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                      <Legend />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heatmap - Melhor Horário para Envio</CardTitle>
                <CardDescription>Distribuição de respostas por dia e hora</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] overflow-auto">
                  <div className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 min-w-[600px]">
                    <div className="text-xs font-medium text-muted-foreground self-end">Hora →</div>
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="text-[10px] text-center text-muted-foreground">{i}h</div>
                    ))}
                    {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, dayIdx) => (
                      <>
                        <div key={`label-${day}`} className="text-xs font-medium text-muted-foreground flex items-center">{day}</div>
                        {Array.from({ length: 24 }, (_, hour) => {
                          const value = heatmapData.find(h => h.day === day && h.hour === `${hour}h`)?.value || 0
                          const opacity = Math.max(0.1, value / 100)
                          return (
                            <div
                              key={`${day}-${hour}`}
                              className="rounded-sm aspect-square"
                              style={{ backgroundColor: `rgba(16, 185, 129, ${opacity})` }}
                              title={`${day} ${hour}h: ${value} respostas`}
                            />
                          )
                        })}
                      </>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <span>Menos</span>
                    <div className="flex gap-0.5">
                      {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => (
                        <div key={o} className="w-4 h-4 rounded-sm" style={{ backgroundColor: `rgba(16, 185, 129, ${o})` }} />
                      ))}
                    </div>
                    <span>Mais</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}