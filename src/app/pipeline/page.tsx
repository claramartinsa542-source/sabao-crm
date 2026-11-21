"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MoreHorizontal,
  Plus,
  Filter,
  User,
  Camera,
  MessageSquare,
  Clock,
} from "lucide-react"
import { mockPipelineData, mockProfiles, type LeadStage } from "@/lib/mock-data"
import { useState } from "react"

const stageColors: Record<LeadStage, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  qualified: "bg-purple-100 text-purple-800 border-purple-200",
  contacted: "bg-amber-100 text-amber-800 border-amber-200",
  negotiation: "bg-orange-100 text-orange-800 border-orange-200",
  closed_won: "bg-emerald-100 text-emerald-800 border-emerald-200",
  closed_lost: "bg-red-100 text-red-800 border-red-200",
}

export default function PipelinePage() {
  const [filterProfile, setFilterProfile] = useState("all")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline de Leads</h1>
          <p className="text-muted-foreground">Gerencie o funil de vendas e acompanhe a progressão dos leads</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterProfile} onValueChange={(v) => v && setFilterProfile(v)}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por perfil" />
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[calc(100vh-200px)]">
        {mockPipelineData.map((column) => (
          <div key={column.stage} className="flex-shrink-0 w-72">
            <div className={`rounded-lg border p-3 ${stageColors[column.stage].split(" ")[0]} bg-opacity-50`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{column.label}</h3>
                <Badge variant="secondary" className="text-xs">
                  {column.count}
                </Badge>
              </div>

              <div className="space-y-2">
                {column.leads.length > 0 ? (
                  column.leads.map((lead) => (
                    <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-avatar.png" />
                              <AvatarFallback>{lead.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">{lead.fullName}</p>
                              <p className="text-xs text-muted-foreground">{lead.handle}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        {lead.agentFilled && (
                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                            Auto-preenchido
                          </Badge>
                        )}

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {(lead.followersCount / 1000).toFixed(1)}k
                          </span>
                          <span className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {lead.postsCount} posts
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(lead.lastUpdatedAt).toLocaleDateString("pt-BR")}
                          </span>
                          {lead.assignedAgent && (
                            <Badge variant="secondary" className="text-[10px]">
                              Agente
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    Nenhum lead neste estágio
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}