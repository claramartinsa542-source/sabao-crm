"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings as SettingsIcon,
  Camera,
  Bot,
  Bell,
  Shield,
  Save,
  Key,
  Globe,
  MessageSquare,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie integrações, limites e preferências do sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="agents">Agentes</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>Preferências globais do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="org-name">Nome da Organização</Label>
                <Input id="org-name" defaultValue="Sabão Digital" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Input id="timezone" defaultValue="America/Sao_Paulo" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Modo Escuro</p>
                  <p className="text-xs text-muted-foreground">Alternar tema claro/escuro</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Integração Instagram
              </CardTitle>
              <CardDescription>Configurações de conexão e rate limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="ws-base-url">URL Base WebSocket</Label>
                <Input id="ws-base-url" defaultValue="ws://localhost" />
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Rate Limits por Ação</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <Label className="text-xs">Likes/hora</Label>
                    <Input type="number" defaultValue={60} />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">Follows/hora</Label>
                    <Input type="number" defaultValue={30} />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">DMs/hora</Label>
                    <Input type="number" defaultValue={10} />
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs">Buscas/hora</Label>
                    <Input type="number" defaultValue={120} />
                  </div>
                </div>
              </div>
              <Separator />
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Configurações de Agentes
              </CardTitle>
              <CardDescription>Templates de mensagem e comportamento padrão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Templates de Copy
                </h4>
                <div className="grid gap-2">
                  <Label className="text-xs">Mensagem Inicial (Variação A)</Label>
                  <Input defaultValue="Olá! Vi seu perfil e achei incrível seu trabalho..." />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Follow-up (Variação B)</Label>
                  <Input defaultValue="Oi! Tudo bem? Queria saber se você teve chance de ver..." />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Fechamento</Label>
                  <Input defaultValue="Perfeito! Vamos agendar uma conversa para..." />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Auto-preenchimento de Leads</p>
                  <p className="text-xs text-muted-foreground">Agentes preenchem dados automaticamente após interação</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Movimentação Automática de Pipeline</p>
                  <p className="text-xs text-muted-foreground">Agentes movem leads entre estágios baseado em critérios</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Escolha quais alertas deseja receber</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Novo lead detectado", desc: "Quando agentes encontram novos perfis", checked: true },
                { label: "Lead movido no pipeline", desc: "Quando um lead avança de estágio", checked: true },
                { label: "Conversão fechada", desc: "Quando um lead é marcado como ganho", checked: true },
                { label: "Rate limit atingido", desc: "Quando um perfil atinge limites do Instagram", checked: true },
                { label: "Erro crítico de agente", desc: "Falhas que requerem intervenção manual", checked: true },
                { label: "Desafio/CAPTCHA detectado", desc: "Quando o Instagram solicita verificação", checked: false },
                { label: "Resumo diário", desc: "Relatório consolidado às 8h", checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
              <Separator />
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança e Acesso
              </CardTitle>
              <CardDescription>Tokens de API e controle de acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Tokens de Agente
                </h4>
                <div className="p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono">agent_token_prod_***...a8f2</span>
                    <span className="text-xs text-emerald-600">Ativo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Criado em 15/11/2026 • Último uso: hoje</p>
                </div>
                <Button variant="outline" size="sm">Gerar Novo Token</Button>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Membros da Equipe</h4>
                <div className="text-sm text-muted-foreground">
                  Gerenciamento de equipe disponível no plano Pro
                </div>
                <Button variant="outline" size="sm" disabled>Upgrade para Pro</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}