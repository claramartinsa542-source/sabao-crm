"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
  Filter,
  Calendar,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { mockFinancialRecords, mockLeads, mockCampaigns } from "@/lib/mock-data"
import { useState } from "react"
import Link from "next/link"

const revenueData = [
  { month: "Jun", revenue: 18500, cost: 4200 },
  { month: "Jul", revenue: 22300, cost: 5100 },
  { month: "Ago", revenue: 28700, cost: 6300 },
  { month: "Set", revenue: 31200, cost: 7100 },
  { month: "Out", revenue: 38900, cost: 8500 },
  { month: "Nov", revenue: 45800, cost: 9200 },
]

export default function FinancialPage() {
  const [period, setPeriod] = useState("monthly")

  const totalRevenue = mockFinancialRecords
    .filter(r => r.transactionType === "revenue")
    .reduce((acc, r) => acc + r.amount, 0)

  const totalCost = mockFinancialRecords
    .filter(r => r.transactionType === "cost")
    .reduce((acc, r) => acc + r.amount, 0)

  const profit = totalRevenue - totalCost
  const roi = totalCost > 0 ? ((profit / totalCost) * 100).toFixed(1) : "0"

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão Financeira</h1>
          <p className="text-muted-foreground">Acompanhe receita, custos e ROI da operação</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Este mês</SelectItem>
              <SelectItem value="quarterly">Trimestre</SelectItem>
              <SelectItem value="yearly">Este ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">R$ {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +18% vs mês anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Operacionais</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">R$ {totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +8% vs mês anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">R$ {profit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Margem: {((profit / totalRevenue) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{roi}%</div>
            <p className="text-xs text-muted-foreground">Retorno sobre investimento</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução Receita vs Custos</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `R$${v/1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }}
                    formatter={(value) => `R$ ${Number(value).toLocaleString()}`}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" name="Receita" />
                  <Area type="monotone" dataKey="cost" stroke="#ef4444" fillOpacity={1} fill="url(#colorCost)" name="Custos" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita por Campanha</CardTitle>
            <CardDescription>Distribuição das conversões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCampaigns.map(c => ({
                  name: c.name.substring(0, 20) + "...",
                  actions: c.totalActions,
                  success: c.successCount,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Bar dataKey="success" fill="#10b981" name="Sucessos" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actions" fill="#3b82f6" name="Total Ações" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>Histórico de receitas e custos</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Campanha</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFinancialRecords.map((record) => {
                const lead = mockLeads.find(l => l.id === record.leadId)
                const campaign = record.campaignId ? mockCampaigns.find(c => c.id === record.campaignId) : null
                return (
                  <TableRow key={record.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(record.transactionDate).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant={record.transactionType === "revenue" ? "default" : "destructive"}
                        className={record.transactionType === "revenue" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""}>
                        {record.transactionType === "revenue" ? "Receita" : "Custo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{record.description}</TableCell>
                    <TableCell className="text-sm">
                      {lead ? (
                        <Link href={`/leads/${lead.id}`} className="hover:underline text-blue-600">
                          {lead.handle}
                        </Link>
                      ) : "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {campaign?.name || "-"}
                    </TableCell>
                    <TableCell className={`text-right font-mono font-medium ${record.transactionType === "revenue" ? "text-emerald-600" : "text-red-600"}`}>
                      {record.transactionType === "revenue" ? "+" : "-"} R$ {record.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}