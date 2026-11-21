"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Camera, Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-2">
            <Camera className="h-6 w-6 text-emerald-700" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-emerald-900">Sabão CRM</CardTitle>
          <CardDescription>Gestão inteligente de leads do Instagram</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="seu@email.com" className="pl-9" />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link href="/auth/forgot-password" className="text-xs text-emerald-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" className="pl-9" />
            </div>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Entrar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full" disabled>
              Continuar com Google
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Continuar com GitHub
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/auth/register" className="text-emerald-600 hover:underline font-medium">
              Cadastre-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}