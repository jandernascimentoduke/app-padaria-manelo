"use client"

import { useState } from "react"
import { ArrowLeft, MessageSquare, Star, Send, ThumbsUp, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FeedbackPage() {
  const [avaliacao, setAvaliacao] = useState(5)
  const [categoria, setCategoria] = useState("produto")
  const [mensagem, setMensagem] = useState("")
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Salvar feedback (em produção seria uma API)
    const feedback = {
      avaliacao,
      categoria,
      mensagem,
      data: new Date().toISOString()
    }
    
    console.log("Feedback enviado:", feedback)
    
    // Enviar via WhatsApp também
    const categoriaTexto = {
      produto: "Produto",
      atendimento: "Atendimento",
      entrega: "Entrega",
      app: "Aplicativo",
      sugestao: "Sugestão"
    }[categoria]
    
    const whatsappMessage = `📝 *FEEDBACK - MANELO FORNERIA*\n\n⭐ Avaliação: ${avaliacao}/5\n📂 Categoria: ${categoriaTexto}\n\n💬 Mensagem:\n${mensagem}\n\n---\nObrigado pelo seu feedback!`
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
    
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-[#FFD700]">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-[#8B4513]">Obrigado!</CardTitle>
            <CardDescription className="text-base">
              Seu feedback é muito importante para nós
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-[#8B4513]" />
              <p className="font-bold text-[#8B4513] mb-1">+10 Pontos de Bônus!</p>
              <p className="text-sm text-[#8B4513]">
                Ganhe pontos extras por compartilhar sua opinião
              </p>
            </div>
            
            <Button 
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
              onClick={() => window.location.href = '/'}
            >
              Voltar ao Início
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
              <h1 className="text-xl font-bold">Feedback</h1>
              <p className="text-xs opacity-90">Sua opinião é muito importante</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Banner de Incentivo */}
        <Card className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-none">
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-[#8B4513]" />
            <h2 className="text-xl font-bold text-[#8B4513] mb-2">
              Ganhe 10 Pontos!
            </h2>
            <p className="text-sm text-[#8B4513]">
              Compartilhe sua experiência e ganhe pontos extras no programa de fidelidade
            </p>
          </CardContent>
        </Card>

        {/* Formulário de Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#8B4513]">Como foi sua experiência?</CardTitle>
            <CardDescription>
              Queremos saber sua opinião para melhorar cada vez mais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avaliação com Estrelas */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Avaliação Geral</Label>
                <div className="flex justify-center gap-2 py-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setAvaliacao(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= avaliacao
                            ? "fill-[#FFD700] text-[#FFD700]"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600">
                  {avaliacao === 5 && "⭐ Excelente!"}
                  {avaliacao === 4 && "😊 Muito bom!"}
                  {avaliacao === 3 && "🙂 Bom"}
                  {avaliacao === 2 && "😐 Regular"}
                  {avaliacao === 1 && "😞 Precisa melhorar"}
                </p>
              </div>

              {/* Categoria do Feedback */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Sobre o que você quer falar?</Label>
                <RadioGroup value={categoria} onValueChange={setCategoria}>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <RadioGroupItem value="produto" id="produto" />
                    <Label htmlFor="produto" className="flex-1 cursor-pointer">
                      🍞 Qualidade dos Produtos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <RadioGroupItem value="atendimento" id="atendimento" />
                    <Label htmlFor="atendimento" className="flex-1 cursor-pointer">
                      👥 Atendimento
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <RadioGroupItem value="entrega" id="entrega" />
                    <Label htmlFor="entrega" className="flex-1 cursor-pointer">
                      🚚 Tempo de Preparo/Entrega
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <RadioGroupItem value="app" id="app" />
                    <Label htmlFor="app" className="flex-1 cursor-pointer">
                      📱 Aplicativo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <RadioGroupItem value="sugestao" id="sugestao" />
                    <Label htmlFor="sugestao" className="flex-1 cursor-pointer">
                      💡 Sugestão de Melhoria
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Mensagem */}
              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-base font-semibold">
                  Conte-nos mais sobre sua experiência
                </Label>
                <Textarea
                  id="mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Escreva aqui seus comentários, sugestões ou elogios..."
                  rows={6}
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  Mínimo de 10 caracteres
                </p>
              </div>

              {/* Botão de Envio */}
              <Button 
                type="submit"
                className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white h-12 text-base"
                disabled={mensagem.length < 10}
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Opção de Adicionar Foto */}
        <Card className="border-2 border-dashed border-[#8B4513]/30">
          <CardContent className="p-6 text-center">
            <Camera className="w-12 h-12 mx-auto mb-3 text-[#8B4513]" />
            <h3 className="font-semibold text-[#8B4513] mb-2">
              Quer compartilhar uma foto?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Mostre seu produto favorito ou compartilhe um momento especial na nossa padaria
            </p>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/galeria'}
            >
              Ir para Galeria
            </Button>
          </CardContent>
        </Card>

        {/* Informação sobre Privacidade */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-sm text-gray-600">
            <p className="mb-2">
              <strong>🔒 Sua privacidade é importante:</strong>
            </p>
            <p className="text-xs">
              Seu feedback será usado apenas para melhorar nossos serviços. 
              Não compartilharemos suas informações com terceiros.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
