"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Award, Gift, TrendingUp, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type ClienteData = {
  nomeCompleto: string
  pontos: number
  dataCadastro: string
  nivel: "Bronze" | "Prata" | "Ouro" | "Diamante"
}

type Premio = {
  id: number
  nome: string
  pontosNecessarios: number
  descricao: string
  icon: string
}

const premios: Premio[] = [
  { id: 1, nome: "Pão Francês Grátis", pontosNecessarios: 50, descricao: "5 unidades", icon: "🥖" },
  { id: 2, nome: "Café Expresso", pontosNecessarios: 100, descricao: "1 xícara", icon: "☕" },
  { id: 3, nome: "Bolo Fatia", pontosNecessarios: 150, descricao: "Sabor à escolha", icon: "🍰" },
  { id: 4, nome: "Combo Café da Manhã", pontosNecessarios: 200, descricao: "Café + Pão + Bolo", icon: "🍞" },
  { id: 5, nome: "Pizza Média", pontosNecessarios: 400, descricao: "Sabor à escolha", icon: "🍕" },
  { id: 6, nome: "Desconto 20%", pontosNecessarios: 500, descricao: "Em qualquer compra", icon: "💰" },
]

export default function FidelidadePage() {
  const [cliente, setCliente] = useState<ClienteData | null>(null)
  const [cartaoVirado, setCartaoVirado] = useState(false)

  useEffect(() => {
    // Carregar dados do cliente
    const clienteData = localStorage.getItem("clienteManelo")
    if (clienteData) {
      const data = JSON.parse(clienteData)
      setCliente({
        nomeCompleto: data.nomeCompleto,
        pontos: data.pontos || 150, // Simulando pontos
        dataCadastro: data.dataCadastro,
        nivel: calcularNivel(data.pontos || 150)
      })
    }
  }, [])

  const calcularNivel = (pontos: number): "Bronze" | "Prata" | "Ouro" | "Diamante" => {
    if (pontos >= 1000) return "Diamante"
    if (pontos >= 500) return "Ouro"
    if (pontos >= 200) return "Prata"
    return "Bronze"
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Diamante": return "from-blue-400 to-purple-600"
      case "Ouro": return "from-yellow-400 to-orange-500"
      case "Prata": return "from-gray-300 to-gray-500"
      default: return "from-orange-400 to-red-600"
    }
  }

  const proximoNivel = () => {
    if (!cliente) return { nome: "Prata", pontos: 200 }
    if (cliente.nivel === "Bronze") return { nome: "Prata", pontos: 200 }
    if (cliente.nivel === "Prata") return { nome: "Ouro", pontos: 500 }
    if (cliente.nivel === "Ouro") return { nome: "Diamante", pontos: 1000 }
    return { nome: "Máximo", pontos: 1000 }
  }

  const progressoProximoNivel = () => {
    if (!cliente) return 0
    const proximo = proximoNivel()
    if (cliente.nivel === "Diamante") return 100
    
    let nivelAnterior = 0
    if (cliente.nivel === "Prata") nivelAnterior = 200
    if (cliente.nivel === "Ouro") nivelAnterior = 500
    
    return ((cliente.pontos - nivelAnterior) / (proximo.pontos - nivelAnterior)) * 100
  }

  if (!cliente) {
    return (
      <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Faça seu cadastro
            </h3>
            <p className="text-gray-500 mb-4">
              Complete seu cadastro para acessar o programa de fidelidade
            </p>
            <Button 
              className="bg-[#8B4513] hover:bg-[#A0522D]"
              onClick={() => window.location.href = '/cadastro'}
            >
              Fazer Cadastro
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
              <h1 className="text-xl font-bold">Programa de Fidelidade</h1>
              <p className="text-xs opacity-90">Acumule pontos e ganhe prêmios</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Cartão Virtual */}
        <div 
          className="relative h-52 cursor-pointer perspective-1000"
          onClick={() => setCartaoVirado(!cartaoVirado)}
        >
          <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${cartaoVirado ? 'rotate-y-180' : ''}`}>
            {/* Frente do cartão */}
            <Card className={`absolute w-full h-full backface-hidden bg-gradient-to-br ${getNivelColor(cliente.nivel)} border-none shadow-2xl`}>
              <CardContent className="p-6 h-full flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-90">Cartão Fidelidade</p>
                    <p className="text-2xl font-bold">MANELO</p>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/40">
                    {cliente.nivel}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm opacity-90 mb-1">Seus Pontos</p>
                  <p className="text-5xl font-bold">{cliente.pontos}</p>
                </div>
                
                <div>
                  <p className="text-sm opacity-90">{cliente.nomeCompleto}</p>
                  <p className="text-xs opacity-75" suppressHydrationWarning>
                    Membro desde {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Verso do cartão */}
            <Card className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-2xl">
              <CardContent className="p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <p className="text-sm opacity-90 mb-4">Como usar</p>
                  <div className="space-y-2 text-xs">
                    <p>✓ Acumule 1 ponto a cada R$ 1,00</p>
                    <p>✓ Troque pontos por prêmios</p>
                    <p>✓ Válido em todas as compras</p>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded p-3">
                  <p className="text-xs opacity-75 mb-1">Código do Cliente</p>
                  <p className="text-lg font-mono tracking-wider">
                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
                
                <p className="text-xs opacity-75 text-center">
                  Toque para virar o cartão
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progresso para próximo nível */}
        {cliente.nivel !== "Diamante" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#8B4513]">Próximo Nível</CardTitle>
                  <CardDescription>{proximoNivel().nome}</CardDescription>
                </div>
                <TrendingUp className="w-6 h-6 text-[#8B4513]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={progressoProximoNivel()} className="h-3" />
              <p className="text-sm text-gray-600">
                Faltam <strong>{proximoNivel().pontos - cliente.pontos} pontos</strong> para o nível {proximoNivel().nome}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Prêmios Disponíveis */}
        <div>
          <h2 className="text-xl font-bold text-[#8B4513] mb-4 flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Troque seus Pontos
          </h2>
          <div className="space-y-3">
            {premios.map((premio) => {
              const podeResgatar = cliente.pontos >= premio.pontosNecessarios
              return (
                <Card 
                  key={premio.id} 
                  className={`${podeResgatar ? 'border-2 border-[#FFD700]' : 'opacity-60'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{premio.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[#8B4513]">{premio.nome}</h3>
                        <p className="text-sm text-gray-600">{premio.descricao}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-4 h-4 text-[#FFD700]" />
                          <span className="text-sm font-semibold">{premio.pontosNecessarios} pontos</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        disabled={!podeResgatar}
                        className={podeResgatar 
                          ? "bg-[#FFD700] hover:bg-[#FFA500] text-[#8B4513]" 
                          : ""}
                      >
                        {podeResgatar ? "Resgatar" : "Bloqueado"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Benefícios por Nível */}
        <Card className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Benefícios por Nível
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-600">Bronze</Badge>
              <span>Acúmulo padrão de pontos</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gray-400">Prata</Badge>
              <span>+10% de pontos em compras</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-500 text-black">Ouro</Badge>
              <span>+20% de pontos + brindes mensais</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500">Diamante</Badge>
              <span>+30% de pontos + acesso VIP</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
