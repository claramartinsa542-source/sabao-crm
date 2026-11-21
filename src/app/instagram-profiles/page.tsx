"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Camera,
  Users,
  Image as ImageIcon,
  Activity,
  Wifi,
  WifiOff,
  AlertTriangle,
  Pause,
  Play,
  Settings,
  MoreHorizontal,
  TrendingUp,
  Clock,
} from "lucide-react"
import { mockProfiles, type ProfileStatus } from "@/lib/mock-data"
import { useState } from "react"
import Link from "next/link"

const statusConfig: Record<ProfileStatus, { label: string; color: string; icon: typeof Wifi }> = {
  active: { label: "Ativo", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Wifi },
  paused: { label: "Pausado", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Pause },
  rate_limited: { label: "Rate Limited", color: "bg-orange-100 text-orange-800 border-orange-200", icon: AlertTriangle },
  offline: { label: "Offline", color: "bg-gray-100 text-gray-800 border-gray-200", icon: WifiOff },
  challenge: { label: "Desafio", color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle },
}

export default function InstagramProfilesPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProfiles = mockProfiles.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Perfis Instagram</h1>
          <p className="text-muted-foreground">Gerencie múltiplos perfis e acompanhe a performance de cada um</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="paused">Pausados</SelectItem>
              <SelectItem value="rate_limited">Rate Limited</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Camera className="h-4 w-4 mr-2" />
            Adicionar Perfil
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Wifi className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockProfiles.filter(p => p.status === "active").length}</p>
              <p className="text-xs text-muted-foreground">Perfis Ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockProfiles.filter(p => p.status === "rate_limited").length}</p>
              <p className="text-xs text-muted-foreground">Em Rate Limit</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {(mockProfiles.reduce((acc, p) => acc + p.followersCount, 0) / 1000).toFixed(1)}k
              </p>
              <p className="text-xs text-muted-foreground">Seguidores Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">98.5%</p>
              <p className="text-xs text-muted-foreground">Uptime Médio</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profiles Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfiles.map((profile) => {
          const config = statusConfig[profile.status]
          const StatusIcon = config.icon
          return (
            <Card key={profile.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback>{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{profile.displayName}</CardTitle>
                      <p className="text-sm text-muted-foreground">@{profile.username}</p>
                    </div>
                  </div>
                  <Badge className={config.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold">{(profile.followersCount / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-muted-foreground">Seguidores</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold">{profile.followingCount}</p>
                    <p className="text-[10px] text-muted-foreground">Seguindo</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold">{profile.postsCount}</p>
                    <p className="text-[10px] text-muted-foreground">Posts</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Última atividade
                    </span>
                    <span>{new Date(profile.lastActiveAt).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Porta WS
                    </span>
                    <span className="font-mono">{profile.wsPort}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Link href={`/instagram-profiles/${profile.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Detalhes
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {profile.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhum perfil encontrado</p>
          <p className="text-sm">Tente ajustar os filtros ou adicione um novo perfil</p>
        </div>
      )}
    </div>
  )
}