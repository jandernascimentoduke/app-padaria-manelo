"use client"

import { useState } from "react"
import { ArrowLeft, Users, Gift, Share2, Copy, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Indicacao = {
  id: number
  nome: string
  status: "Pendente" | "Cadastrado" | "Primeira Compra"
  pontosGanhos: number
  data: string
}

const indicacoesSimuladas: Indicacao[] = [
  { id: 1, nome: "Maria Silva", status: "Primeira Compra", pontosGanhos: 50, data: "2025-01-10" },
  { id: 2, nome: "João Santos", status: "Cadastrado", pontosGanhos: 25, data: "2025-01-12" },
  { id: 3, nome: "Ana Costa", status: "Pendente", pontosGanhos: 0, data: "2025-01-14" },
]

const frasesPersuasivas = [
  "🍞 Compartilhe a Delícia! Convide um amigo e ganhe recompensas!",
  "❤️ Você ama nossas delícias? Espalhe a felicidade e ganhe pontos!",
  "🎁 Traga um amigo e ganhe uma surpresa saborosa como agradecimento!",
  "✨ Indique um amigo, e vocês desfrutarão de ofertas exclusivas!",
  "🤝 Recompense seus amigos e ganhe por isso!"
]

export default function IndicarPage() {
  const [indicacoes] = useState<Indicacao[]>(indicacoesSimuladas)
  const [codigoCopiado, setCodigoCopiado] = useState(false)
  const [fraseAtual, setFraseAtual] = useState(0)

  const codigoIndicacao = "MANELO2025"
  const linkIndicacao = `https://manelo.app/cadastro?ref=${codigoIndicacao}`

  const totalIndicacoes = indicacoes.length
  const indicacoesAtivas = indicacoes.filter(i => i.status === "Primeira Compra").length
  const pontosGanhos = indicacoes.reduce((sum, i) => sum + i.pontosGanhos, 0)

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoIndicacao)
    setCodigoCopiado(true)
    setTimeout(() => setCodigoCopiado(false), 2000)
  }

  const compartilharWhatsApp = () => {
    const frase = frasesPersuasivas[fraseAtual]
    const message = `${frase}\n\n🍞 *MANELO FORNERIA*\n\nUse meu código: *${codigoIndicacao}*\n\n🎁 Ganhe um pão francês grátis no primeiro pedido!\n\n${linkIndicacao}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    // Rotacionar frase para próxima vez
    setFraseAtual((fraseAtual + 1) % frasesPersuasivas.length)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Primeira Compra": return "bg-green-500"
      case "Cadastrado": return "bg-orange-500"
      case "Pendente": return "bg-gray-500"
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
              <h1 className="text-xl font-bold">Indique e Ganhe</h1>
              <p className="text-xs opacity-90">Compartilhe e acumule pontos extras</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Banner Principal */}
        <Card className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-none">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-[#8B4513]" />
            </div>
            <h2 className="text-2xl font-bold text-[#8B4513] mb-2">
              Ganhe 50 Pontos por Amigo!
            </h2>
            <p className="text-[#8B4513] mb-4">
              Seu amigo ganha um pão francês grátis e você ganha pontos quando ele fizer a primeira compra
            </p>
            <div className="flex gap-2 justify-center">
              <Badge className="bg-white text-[#8B4513]">+25 pts no cadastro</Badge>
              <Badge className="bg-white text-[#8B4513]">+25 pts na 1ª compra</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-[#8B4513]" />
              <p className="text-2xl font-bold text-[#8B4513]">{totalIndicacoes}</p>
              <p className="text-xs text-gray-600">Indicações</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{indicacoesAtivas}</p>
              <p className="text-xs text-gray-600">Ativas</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-[#FFD700]" />
              <p className="text-2xl font-bold text-[#FFD700]">{pontosGanhos}</p>
              <p className="text-xs text-gray-600">Pontos</p>
            </CardContent>
          </Card>
        </div>

        {/* Seu Código de Indicação */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#8B4513]">Seu Código de Indicação</CardTitle>
            <CardDescription>Compartilhe com seus amigos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={codigoIndicacao} 
                readOnly 
                className="text-center text-xl font-bold tracking-wider"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={copiarCodigo}
                className={codigoCopiado ? "bg-green-50 border-green-500" : ""}
              >
                {codigoCopiado ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
              onClick={compartilharWhatsApp}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar no WhatsApp
            </Button>

            <div className="bg-[#FFF8DC] rounded-lg p-3 text-sm text-gray-600">
              <p className="font-semibold mb-1">💡 Dica:</p>
              <p className="text-xs">
                Quanto mais amigos indicar, mais pontos você acumula! Não há limite de indicações.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Frases Persuasivas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#8B4513]">Mensagens Prontas</CardTitle>
            <CardDescription>Escolha uma frase para compartilhar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {frasesPersuasivas.map((frase, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:border-[#8B4513] transition-colors"
                onClick={() => {
                  setFraseAtual(index)
                  compartilharWhatsApp()
                }}
              >
                <CardContent className="p-3 flex items-center justify-between">
                  <p className="text-sm flex-1">{frase}</p>
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Suas Indicações */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#8B4513]">Suas Indicações</CardTitle>
            <CardDescription>Acompanhe o status dos seus amigos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {indicacoes.map((indicacao) => (
              <div 
                key={indicacao.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-semibold text-[#8B4513]">{indicacao.nome}</p>
                  <p className="text-xs text-gray-600" suppressHydrationWarning>
                    {new Date(indicacao.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(indicacao.status)}>
                    {indicacao.status}
                  </Badge>
                  {indicacao.pontosGanhos > 0 && (
                    <p className="text-sm font-bold text-[#FFD700] mt-1">
                      +{indicacao.pontosGanhos} pts
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Como Funciona */}
        <Card className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white">
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B4513] font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold">Compartilhe seu código</p>
                <p className="text-white/80 text-xs">Envie para amigos e familiares</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B4513] font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold">Seu amigo se cadastra</p>
                <p className="text-white/80 text-xs">Ele ganha um pão francês grátis e você ganha 25 pontos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B4513] font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold">Primeira compra</p>
                <p className="text-white/80 text-xs">Quando ele fizer o primeiro pedido, você ganha mais 25 pontos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
