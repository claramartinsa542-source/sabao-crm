"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Users,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react"

const notifications = [
  { id: "n-001", type: "lead_moved", message: "@carla.mendes movido para Fechado (Ganho)", timestamp: "2026-11-20T16:45:00Z", read: false },
  { id: "n-002", type: "dm_sent", message: "DM enviada para @ana.costa pelo agente Luan 03", timestamp: "2026-11-20T16:30:00Z", read: false },
  { id: "n-003", type: "new_lead", message: "Novo lead detectado: @joao.santos", timestamp: "2026-11-20T16:15:00Z", read: true },
  { id: "n-004", type: "rate_limit", message: "Perfil prospect_bot_3 atingiu rate limit de DMs", timestamp: "2026-11-20T15:45:00Z", read: true },
  { id: "n-005", type: "conversion", message: "Conversão registrada: R$ 2.500 de @carla.mendes", timestamp: "2026-11-20T14:00:00Z", read: true },
  { id: "n-006", type: "system", message: "Agente Claude Opus - Luan 03 retomado após pausa", timestamp: "2026-11-20T12:00:00Z", read: true },
]

const typeConfig: Record<string, { icon: typeof Bell; color: string }> = {
  lead_moved: { icon: TrendingUp, color: "text-emerald-600 bg-emerald-100" },
  dm_sent: { icon: MessageSquare, color: "text-blue-600 bg-blue-100" },
  new_lead: { icon: Users, color: "text-purple-600 bg-purple-100" },
  rate_limit: { icon: AlertTriangle, color: "text-orange-600 bg-orange-100" },
  conversion: { icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
  system: { icon: Bell, color: "text-gray-600 bg-gray-100" },
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground">Central de alertas e atividades do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{unreadCount} não lidas</Badge>
          <Button variant="outline" size="sm">Marcar todas como lidas</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Não Lidas ({unreadCount})</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-2">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type] || typeConfig.system
            const Icon = config.icon
            return (
              <Card key={notification.id} className={!notification.read ? "border-l-4 border-l-emerald-500" : ""}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(notification.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="unread" className="space-y-2">
          {notifications.filter(n => !n.read).map((notification) => {
            const config = typeConfig[notification.type] || typeConfig.system
            const Icon = config.icon
            return (
              <Card key={notification.id} className="border-l-4 border-l-emerald-500">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(notification.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="leads" className="space-y-2">
          {notifications.filter(n => ["lead_moved", "new_lead", "conversion"].includes(n.type)).map((notification) => {
            const config = typeConfig[notification.type] || typeConfig.system
            const Icon = config.icon
            return (
              <Card key={notification.id} className={!notification.read ? "border-l-4 border-l-emerald-500" : ""}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(notification.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="system" className="space-y-2">
          {notifications.filter(n => ["rate_limit", "system", "dm_sent"].includes(n.type)).map((notification) => {
            const config = typeConfig[notification.type] || typeConfig.system
            const Icon = config.icon
            return (
              <Card key={notification.id} className={!notification.read ? "border-l-4 border-l-emerald-500" : ""}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(notification.timestamp).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}