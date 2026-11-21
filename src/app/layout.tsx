import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toast"
import { TopBar } from "@/components/layout/topbar"
import { SearchCommandProvider } from "@/components/layout/search-command-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sabão CRM - Gestão de Leads Instagram",
  description:
    "CRM para gestão de leads do Instagram com preenchimento automático por agentes IA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <TooltipProvider>
          <SearchCommandProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto bg-background p-6">
                  {children}
                </main>
              </div>
            </div>
          </SearchCommandProvider>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}