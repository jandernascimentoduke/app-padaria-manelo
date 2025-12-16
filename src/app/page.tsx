"use client"

import { useState, useEffect } from "react"
import { Gift, Phone, User, Home, X, Award, Users, MessageSquare, Camera, Star, Plus, Trash2, Edit, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Tipos para modelos de fidelidade
interface ModeloFidelidade {
  id: string
  nome: string
  pontosNecessarios: number
  premio: string
  descricao: string
  ativo: boolean
}

export default function ManeloApp() {
  const [currentView, setCurrentView] = useState<"home" | "profile" | "modelos">("home")
  const [showWelcomeGift, setShowWelcomeGift] = useState(true)
  const [clientePontos, setClientePontos] = useState(0)
  const [modelos, setModelos] = useState<ModeloFidelidade[]>([])
  const [editandoModelo, setEditandoModelo] = useState<ModeloFidelidade | null>(null)
  const [novoModelo, setNovoModelo] = useState({
    nome: "",
    pontosNecessarios: 0,
    premio: "",
    descricao: ""
  })

  useEffect(() => {
    // Carregar pontos do cliente
    const clienteData = localStorage.getItem("clienteManelo")
    if (clienteData) {
      const data = JSON.parse(clienteData)
      setClientePontos(data.pontos || 150)
    }

    // Carregar modelos de fidelidade
    const modelosData = localStorage.getItem("modelosFidelidade")
    if (modelosData) {
      setModelos(JSON.parse(modelosData))
    } else {
      // Modelos de exemplo
      const modelosExemplo: ModeloFidelidade[] = [
        {
          id: "1",
          nome: "Bronze",
          pontosNecessarios: 100,
          premio: "1 Pão Francês Grátis",
          descricao: "Acumule 100 pontos e ganhe 1 pão francês",
          ativo: true
        },
        {
          id: "2",
          nome: "Prata",
          pontosNecessarios: 200,
          premio: "1 Sonho Grátis",
          descricao: "Acumule 200 pontos e ganhe 1 sonho",
          ativo: true
        },
        {
          id: "3",
          nome: "Ouro",
          pontosNecessarios: 500,
          premio: "1 Bolo Pequeno Grátis",
          descricao: "Acumule 500 pontos e ganhe 1 bolo pequeno",
          ativo: true
        },
        {
          id: "4",
          nome: "Platina",
          pontosNecessarios: 1000,
          premio: "1 Torta Média Grátis",
          descricao: "Acumule 1000 pontos e ganhe 1 torta média",
          ativo: true
        }
      ]
      setModelos(modelosExemplo)
      localStorage.setItem("modelosFidelidade", JSON.stringify(modelosExemplo))
    }
  }, [])

  // Função para abrir WhatsApp diretamente no app
  const abrirWhatsApp = () => {
    const numero = "5521979286541"
    const mensagem = "Olá! Gostaria de mais informações sobre o programa de fidelidade."
    const mensagemCodificada = encodeURIComponent(mensagem)
    
    // Tenta abrir no app do WhatsApp primeiro
    window.location.href = `whatsapp://send?phone=${numero}&text=${mensagemCodificada}`
    
    // Fallback para web.whatsapp.com caso o app não esteja instalado
    setTimeout(() => {
      window.open(`https://wa.me/${numero}?text=${mensagemCodificada}`, '_blank')
    }, 500)
  }

  // Funções para gerenciar modelos
  const adicionarModelo = () => {
    if (!novoModelo.nome || !novoModelo.premio) {
      alert("Preencha nome e prêmio!")
      return
    }

    const modelo: ModeloFidelidade = {
      id: Date.now().toString(),
      nome: novoModelo.nome,
      pontosNecessarios: novoModelo.pontosNecessarios,
      premio: novoModelo.premio,
      descricao: novoModelo.descricao,
      ativo: true
    }

    const novosModelos = [...modelos, modelo]
    setModelos(novosModelos)
    localStorage.setItem("modelosFidelidade", JSON.stringify(novosModelos))
    
    // Limpar formulário
    setNovoModelo({ nome: "", pontosNecessarios: 0, premio: "", descricao: "" })
  }

  const removerModelo = (id: string) => {
    const novosModelos = modelos.filter(m => m.id !== id)
    setModelos(novosModelos)
    localStorage.setItem("modelosFidelidade", JSON.stringify(novosModelos))
  }

  const duplicarModelo = (modelo: ModeloFidelidade) => {
    const novoCopia: ModeloFidelidade = {
      ...modelo,
      id: Date.now().toString(),
      nome: `${modelo.nome} (Cópia)`
    }
    const novosModelos = [...modelos, novoCopia]
    setModelos(novosModelos)
    localStorage.setItem("modelosFidelidade", JSON.stringify(novosModelos))
  }

  const toggleAtivo = (id: string) => {
    const novosModelos = modelos.map(m => 
      m.id === id ? { ...m, ativo: !m.ativo } : m
    )
    setModelos(novosModelos)
    localStorage.setItem("modelosFidelidade", JSON.stringify(novosModelos))
  }

  // Renderização da view de modelos
  const renderModelos = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#8B4513]">Modelos de Fidelidade</h2>
        <Badge className="bg-[#FFD700] text-[#8B4513]">
          {modelos.length} modelos
        </Badge>
      </div>

      {/* Formulário para criar novo modelo */}
      <Card className="border-2 border-[#8B4513]">
        <CardHeader>
          <CardTitle className="text-[#8B4513] flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Criar Novo Modelo
          </CardTitle>
          <CardDescription>Defina as regras do programa de fidelidade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Modelo</Label>
            <Input
              id="nome"
              placeholder="Ex: Bronze, Prata, Ouro..."
              value={novoModelo.nome}
              onChange={(e) => setNovoModelo({ ...novoModelo, nome: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pontos">Pontos Necessários</Label>
            <Input
              id="pontos"
              type="number"
              placeholder="Ex: 100"
              value={novoModelo.pontosNecessarios || ""}
              onChange={(e) => setNovoModelo({ ...novoModelo, pontosNecessarios: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="premio">Prêmio</Label>
            <Input
              id="premio"
              placeholder="Ex: 1 Pão Francês Grátis"
              value={novoModelo.premio}
              onChange={(e) => setNovoModelo({ ...novoModelo, premio: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              id="descricao"
              placeholder="Descrição do prêmio..."
              value={novoModelo.descricao}
              onChange={(e) => setNovoModelo({ ...novoModelo, descricao: e.target.value })}
            />
          </div>

          <Button 
            className="w-full bg-[#8B4513] hover:bg-[#A0522D]"
            onClick={adicionarModelo}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Modelo
          </Button>
        </CardContent>
      </Card>

      {/* Tabela de modelos existentes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#8B4513]">Modelos Cadastrados</CardTitle>
          <CardDescription>Gerencie seus programas de fidelidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-center">Pontos</TableHead>
                  <TableHead>Prêmio</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modelos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      Nenhum modelo cadastrado ainda
                    </TableCell>
                  </TableRow>
                ) : (
                  modelos.map((modelo) => (
                    <TableRow key={modelo.id}>
                      <TableCell className="font-medium">{modelo.nome}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{modelo.pontosNecessarios} pts</Badge>
                      </TableCell>
                      <TableCell>{modelo.premio}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAtivo(modelo.id)}
                        >
                          <Badge className={modelo.ativo ? "bg-green-500" : "bg-gray-400"}>
                            {modelo.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => duplicarModelo(modelo)}
                            title="Duplicar"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removerModelo(modelo.id)}
                            title="Remover"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Exemplos de uso */}
      <Card className="bg-gradient-to-br from-[#FFF8DC] to-white border-2 border-[#FFD700]">
        <CardHeader>
          <CardTitle className="text-[#8B4513] flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Exemplos de Programas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-white rounded-lg border">
            <p className="font-semibold text-[#8B4513] mb-1">🥉 Programa Básico</p>
            <p className="text-sm text-gray-600">A cada R$ 1,00 = 1 ponto | 100 pontos = 1 brinde</p>
          </div>
          <div className="p-3 bg-white rounded-lg border">
            <p className="font-semibold text-[#8B4513] mb-1">🥈 Programa Intermediário</p>
            <p className="text-sm text-gray-600">A cada R$ 1,00 = 2 pontos | 200 pontos = 1 brinde especial</p>
          </div>
          <div className="p-3 bg-white rounded-lg border">
            <p className="font-semibold text-[#8B4513] mb-1">🥇 Programa Premium</p>
            <p className="text-sm text-gray-600">A cada R$ 1,00 = 5 pontos | 500 pontos = 1 brinde exclusivo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Renderização das views
  const renderHome = () => (
    <div className="space-y-6 pb-24">
      {/* Banner de boas-vindas com mascote */}
      <div className="relative bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#D2691E] rounded-3xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo à</h1>
          <h2 className="text-4xl font-bold mb-4">Manelo Forneria</h2>
          <p className="text-lg opacity-90 mb-4">Programa de Fidelidade! 🎁</p>
          <Badge className="bg-[#FFD700] text-[#8B4513] hover:bg-[#FFA500] text-base px-4 py-2">
            <Gift className="w-4 h-4 mr-2" />
            Acumule pontos e ganhe prêmios!
          </Badge>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#FFD700] rounded-full opacity-20"></div>
        <div className="absolute -left-8 top-8 w-32 h-32 bg-[#FFA500] rounded-full opacity-20"></div>
      </div>

      {/* Gift de boas-vindas */}
      {showWelcomeGift && (
        <Card className="border-2 border-[#FFD700] bg-gradient-to-br from-[#FFF8DC] to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#8B4513]" />
                </div>
                <div>
                  <CardTitle className="text-[#8B4513]">Bem-vindo ao Programa!</CardTitle>
                  <CardDescription>Comece a acumular pontos</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowWelcomeGift(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-[#8B4513] mb-4">
              🎉 A cada <strong>R$ 1,00 gasto</strong>, você ganha <strong>1 ponto</strong>! 
              Acumule pontos e troque por prêmios incríveis.
            </p>
            <Button 
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
              onClick={() => window.location.href = '/fidelidade'}
            >
              Ver Meu Cartão
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Programa de fidelidade */}
      <Card 
        className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => window.location.href = '/fidelidade'}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8" />
            <div>
              <CardTitle>Programa de Fidelidade</CardTitle>
              <CardDescription className="text-white/80">Acumule pontos e ganhe prêmios</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm mb-2">Seus pontos</p>
            <p className="text-3xl font-bold">{clientePontos} pts</p>
            <p className="text-xs mt-2 opacity-80">Faltam {200 - clientePontos} pontos para o próximo brinde!</p>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas do Programa de Fidelidade */}
      <div>
        <h3 className="text-xl font-bold text-[#8B4513] mb-4">Funcionalidades</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => window.location.href = '/cadastro'}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-[#8B4513]">Cadastro</p>
              <p className="text-xs text-gray-600">Complete seus dados</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => window.location.href = '/fidelidade'}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-[#8B4513]" />
              </div>
              <p className="text-sm font-semibold text-[#8B4513]">Cartão</p>
              <p className="text-xs text-gray-600">Seu cartão virtual</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => setCurrentView("modelos")}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-[#8B4513]">Modelos</p>
              <p className="text-xs text-gray-600">Criar programas</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => window.location.href = '/indicar'}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-[#8B4513]">Indicar</p>
              <p className="text-xs text-gray-600">Ganhe pontos</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => window.location.href = '/feedback'}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-[#8B4513]">Feedback</p>
              <p className="text-xs text-gray-600">Sua opinião</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => window.location.href = '/galeria'}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-[#8B4513]">Galeria</p>
              <p className="text-xs text-gray-600">Compartilhe</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => window.location.href = '/admin/alertas'}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-[#8B4513]">Alertas</p>
              <p className="text-xs text-gray-600">Fornadas</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contato WhatsApp */}
      <Card 
        className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
        onClick={abrirWhatsApp}
      >
        <CardContent className="p-6 text-center">
          <Phone className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Fale Conosco</h3>
          <p className="text-sm mb-4 opacity-90">
            Tire suas dúvidas ou faça seu pedido pelo WhatsApp
          </p>
          <Button 
            className="w-full bg-white hover:bg-gray-100 text-green-600 font-bold"
            onClick={(e) => {
              e.stopPropagation()
              abrirWhatsApp()
            }}
          >
            <Phone className="w-5 h-5 mr-2" />
            Abrir WhatsApp
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-4 pb-24">
      <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Meu Perfil</h2>
      
      {/* Informações do usuário */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-[#8B4513]">Cliente Manelo</CardTitle>
              <CardDescription>cliente@email.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/cadastro'}
          >
            Completar Cadastro
          </Button>
        </CardContent>
      </Card>

      {/* Programa de fidelidade */}
      <Card 
        className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => window.location.href = '/fidelidade'}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-[#8B4513]" />
              <div>
                <CardTitle className="text-[#8B4513]">Fidelidade</CardTitle>
                <CardDescription className="text-[#8B4513]/80">Seus pontos</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#8B4513]">{clientePontos}</p>
              <p className="text-xs text-[#8B4513]/80">pontos</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-sm text-[#8B4513] mb-2">Próximo prêmio em {200 - clientePontos} pontos</p>
            <div className="w-full bg-white rounded-full h-2">
              <div className="bg-[#8B4513] h-2 rounded-full" style={{ width: `${(clientePontos / 200) * 100}%` }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu de Opções */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#8B4513]">Menu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = '/historico'}
          >
            <Award className="w-4 h-4 mr-2" />
            Histórico de Pontos
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => setCurrentView("modelos")}
          >
            <Gift className="w-4 h-4 mr-2" />
            Modelos de Fidelidade
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = '/indicar'}
          >
            <Users className="w-4 h-4 mr-2" />
            Indique e Ganhe
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = '/feedback'}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Enviar Feedback
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = '/galeria'}
          >
            <Camera className="w-4 h-4 mr-2" />
            Galeria de Fotos
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.location.href = '/admin/alertas'}
          >
            <Star className="w-4 h-4 mr-2" />
            Alertas do Padeiro
          </Button>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#8B4513]">Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Phone className="w-4 h-4 mr-2" />
            Receber promoções no WhatsApp
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Gift className="w-4 h-4 mr-2" />
            Meus cupons
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            Sair da conta
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">MANELO</h1>
                <p className="text-xs opacity-90">fidelidade</p>
              </div>
            </div>
            <Badge className="bg-[#FFD700] text-[#8B4513] px-3 py-1">
              {clientePontos} pts
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {currentView === "home" && renderHome()}
        {currentView === "profile" && renderProfile()}
        {currentView === "modelos" && renderModelos()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#8B4513]/20 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              className={`flex flex-col gap-1 h-auto py-2 ${
                currentView === "home" 
                  ? "bg-[#8B4513] text-white hover:bg-[#A0522D]" 
                  : "text-[#8B4513]"
              }`}
              onClick={() => setCurrentView("home")}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </Button>
            <Button
              variant={currentView === "modelos" ? "default" : "ghost"}
              className={`flex flex-col gap-1 h-auto py-2 ${
                currentView === "modelos" 
                  ? "bg-[#8B4513] text-white hover:bg-[#A0522D]" 
                  : "text-[#8B4513]"
              }`}
              onClick={() => setCurrentView("modelos")}
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs">Modelos</span>
            </Button>
            <Button
              variant={currentView === "profile" ? "default" : "ghost"}
              className={`flex flex-col gap-1 h-auto py-2 ${
                currentView === "profile" 
                  ? "bg-[#8B4513] text-white hover:bg-[#A0522D]" 
                  : "text-[#8B4513]"
              }`}
              onClick={() => setCurrentView("profile")}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Perfil</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
