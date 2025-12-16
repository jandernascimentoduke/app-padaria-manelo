"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingBag, Calendar, DollarSign, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Pedido = {
  id: string
  data: string
  valor: number
  pontosGanhos: number
  itens: string[]
  status: "Concluído" | "Em preparo" | "Cancelado"
}

const pedidosSimulados: Pedido[] = [
  {
    id: "#1234",
    data: "2025-01-15",
    valor: 45.00,
    pontosGanhos: 45,
    itens: ["Pizza Margherita", "Refrigerante 2L"],
    status: "Concluído"
  },
  {
    id: "#1233",
    data: "2025-01-12",
    valor: 28.50,
    pontosGanhos: 28,
    itens: ["Combo Café da Manhã", "Pão de Queijo (3un)"],
    status: "Concluído"
  },
  {
    id: "#1232",
    data: "2025-01-08",
    valor: 15.00,
    pontosGanhos: 15,
    itens: ["Café com Leite", "Pão Francês (5un)", "Bolo de Fubá (fatia)"],
    status: "Concluído"
  },
  {
    id: "#1231",
    data: "2025-01-05",
    valor: 52.00,
    pontosGanhos: 52,
    itens: ["Pizza Portuguesa", "Bolo de Chocolate (fatia)"],
    status: "Concluído"
  },
  {
    id: "#1230",
    data: "2025-01-02",
    valor: 18.00,
    pontosGanhos: 18,
    itens: ["Cappuccino", "Coxinha (2un)", "Pão de Queijo (2un)"],
    status: "Concluído"
  }
]

export default function HistoricoPage() {
  const [pedidos] = useState<Pedido[]>(pedidosSimulados)

  const totalGasto = pedidos.reduce((sum, p) => sum + p.valor, 0)
  const totalPontos = pedidos.reduce((sum, p) => sum + p.pontosGanhos, 0)
  const pedidosConcluidos = pedidos.filter(p => p.status === "Concluído").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído": return "bg-green-500"
      case "Em preparo": return "bg-orange-500"
      case "Cancelado": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Histórico de Compras</h1>
              <p className="text-xs opacity-90">Acompanhe seus pedidos e pontos</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-[#8B4513]" />
              <p className="text-2xl font-bold text-[#8B4513]">{pedidosConcluidos}</p>
              <p className="text-xs text-gray-600">Pedidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">R$ {totalGasto.toFixed(0)}</p>
              <p className="text-xs text-gray-600">Total Gasto</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 mx-auto mb-2 text-[#FFD700]" />
              <p className="text-2xl font-bold text-[#FFD700]">{totalPontos}</p>
              <p className="text-xs text-gray-600">Pontos</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Gastos Mensais */}
        <Card className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gastos em Janeiro</CardTitle>
                <CardDescription className="text-white/80">Você economizou 15% com o programa</CardDescription>
              </div>
              <TrendingUp className="w-8 h-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Meta mensal</span>
                <span>R$ 200,00</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-[#FFD700] h-3 rounded-full transition-all"
                  style={{ width: `${(totalGasto / 200) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs opacity-80">
                Faltam R$ {(200 - totalGasto).toFixed(2)} para ganhar um brinde especial!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Histórico */}
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
            <TabsTrigger value="andamento">Em Preparo</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-3 mt-4">
            {pedidos.map((pedido) => (
              <Card key={pedido.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base text-[#8B4513]">
                        Pedido {pedido.id}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span suppressHydrationWarning>
                          {new Date(pedido.data).toLocaleDateString('pt-BR')}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(pedido.status)}>
                      {pedido.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    {pedido.itens.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">• {item}</p>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-xl font-bold text-[#8B4513]">
                        R$ {pedido.valor.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Pontos ganhos</p>
                      <p className="text-xl font-bold text-[#FFD700]">
                        +{pedido.pontosGanhos}
                      </p>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const message = `🔄 *REPETIR PEDIDO ${pedido.id}*\n\n${pedido.itens.join('\n')}\n\n*Total: R$ ${pedido.valor.toFixed(2)}*`
                      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, '_blank')
                    }}
                  >
                    Pedir Novamente
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="concluidos" className="space-y-3 mt-4">
            {pedidos.filter(p => p.status === "Concluído").map((pedido) => (
              <Card key={pedido.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-[#8B4513]">
                      Pedido {pedido.id}
                    </CardTitle>
                    <Badge className="bg-green-500">Concluído</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span suppressHydrationWarning>
                      {new Date(pedido.data).toLocaleDateString('pt-BR')}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#8B4513]">R$ {pedido.valor.toFixed(2)}</span>
                    <span className="text-[#FFD700] font-bold">+{pedido.pontosGanhos} pts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="andamento" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Nenhum pedido em preparo</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sugestões Personalizadas */}
        <Card className="bg-[#FFF8DC] border-2 border-[#FFD700]">
          <CardHeader>
            <CardTitle className="text-[#8B4513]">Sugestões para Você</CardTitle>
            <CardDescription>Baseado no seu histórico de compras</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <span className="text-2xl">🍕</span>
              <div className="flex-1">
                <p className="font-semibold text-[#8B4513]">Pizza Calabresa</p>
                <p className="text-xs text-gray-600">Você adora pizzas!</p>
              </div>
              <Button size="sm" className="bg-[#8B4513] hover:bg-[#A0522D]">
                Ver
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <span className="text-2xl">☕</span>
              <div className="flex-1">
                <p className="font-semibold text-[#8B4513]">Combo Café</p>
                <p className="text-xs text-gray-600">Seu favorito do café da manhã</p>
              </div>
              <Button size="sm" className="bg-[#8B4513] hover:bg-[#A0522D]">
                Ver
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
