"use client"

import { useState } from "react"
import { ArrowLeft, User, Mail, Phone, Calendar, Gift, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    aceitaPromocoes: true
  })
  const [cadastroCompleto, setCadastroCompleto] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Salvar no localStorage (em produção seria uma API)
    localStorage.setItem("clienteManelo", JSON.stringify({
      ...formData,
      pontos: 0,
      dataCadastro: new Date().toISOString(),
      primeiroAcesso: true
    }))
    
    setCadastroCompleto(true)
  }

  if (cadastroCompleto) {
    return (
      <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-[#FFD700]">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-[#8B4513]">Cadastro Completo!</CardTitle>
            <CardDescription className="text-base">
              Bem-vindo ao Programa de Fidelidade Manelo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg p-4 text-center">
              <Gift className="w-8 h-8 mx-auto mb-2 text-[#8B4513]" />
              <p className="font-bold text-[#8B4513] mb-1">🎉 Presente de Boas-Vindas!</p>
              <p className="text-sm text-[#8B4513]">
                Ganhe <strong>1 pão francês grátis</strong> no seu primeiro pedido!
              </p>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Acumule 1 ponto a cada R$ 1,00 gasto</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Ganhe brindes exclusivos</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Receba ofertas especiais no seu aniversário</span>
              </p>
            </div>

            <Button 
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
              onClick={() => window.location.href = '/'}
            >
              Começar a Usar o App
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
              <h1 className="text-xl font-bold">Cadastro</h1>
              <p className="text-xs opacity-90">Programa de Fidelidade</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Banner de benefícios */}
        <Card className="mb-6 bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-none">
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-3 text-[#8B4513]" />
            <h2 className="text-xl font-bold text-[#8B4513] mb-2">
              Ganhe um Pão Francês Grátis!
            </h2>
            <p className="text-sm text-[#8B4513]">
              Complete seu cadastro e receba um presente de boas-vindas no primeiro pedido
            </p>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#8B4513]">Seus Dados</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para começar a acumular pontos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="nome" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.nomeCompleto}
                  onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                  required
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <Label htmlFor="data" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data de Nascimento
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500">
                  🎂 Você receberá ofertas especiais no seu aniversário!
                </p>
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone (WhatsApp)
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  required
                />
              </div>

              {/* E-mail */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Autorização para promoções */}
              <div className="flex items-start space-x-2 p-4 bg-[#FFF8DC] rounded-lg border-2 border-[#8B4513]/20">
                <Checkbox
                  id="promocoes"
                  checked={formData.aceitaPromocoes}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, aceitaPromocoes: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="promocoes"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Quero receber promoções e novidades
                  </Label>
                  <p className="text-xs text-gray-500">
                    Enviaremos ofertas exclusivas via WhatsApp e e-mail
                  </p>
                </div>
              </div>

              {/* Botão de cadastro */}
              <Button 
                type="submit"
                className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white h-12 text-base"
              >
                Completar Cadastro
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Benefícios */}
        <Card className="mt-6 bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white">
          <CardHeader>
            <CardTitle>Benefícios do Programa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B4513] font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold">Acumule Pontos</p>
                <p className="text-white/80 text-xs">1 ponto a cada R$ 1,00 gasto</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B4513] font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold">Troque por Prêmios</p>
                <p className="text-white/80 text-xs">Produtos grátis e descontos exclusivos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B4513] font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold">Aniversário Especial</p>
                <p className="text-white/80 text-xs">Ganhe um brinde no seu dia especial</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#8B4513] font-bold">4</span>
              </div>
              <div>
                <p className="font-semibold">Indique e Ganhe</p>
                <p className="text-white/80 text-xs">Convide amigos e ganhe pontos extras</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
