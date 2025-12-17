"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Award, CheckCircle, XCircle, Clock, TrendingUp, Gift, Calendar, AlertCircle, Plus, Camera, Upload, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Transacao {
  id: string
  tipo: "ganho" | "resgate" | "pendente"
  pontos: number
  descricao: string
  data: string
  status: "confirmado" | "pendente" | "cancelado" | "expirado"
  dataExpiracao?: string
  comprovanteUrl?: string
  validado?: boolean
}

interface Cliente {
  id: string
  nome: string
  telefone: string
  status: "ativo" | "inativo"
}

export default function PontosPage() {
  const [pontos, setPontos] = useState(150)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [valorCompra, setValorCompra] = useState("")
  const [imagemComprovante, setImagemComprovante] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const [transacoes, setTransacoes] = useState<Transacao[]>([
    {
      id: "1",
      tipo: "pendente",
      pontos: 25,
      descricao: "Compra de R$ 25,00",
      data: "2024-12-16",
      status: "pendente",
      dataExpiracao: "2024-12-23"
    },
    {
      id: "2",
      tipo: "ganho",
      pontos: 50,
      descricao: "Compra de R$ 50,00",
      data: "2024-12-15",
      status: "confirmado",
      validado: true
    }
  ])

  // Simulação de banco de dados de clientes
  const [clientes] = useState<Cliente[]>([
    { id: "1", nome: "João Silva", telefone: "(11) 98765-4321", status: "ativo" },
    { id: "2", nome: "Maria Santos", telefone: "(11) 91234-5678", status: "ativo" },
    { id: "3", nome: "Pedro Oliveira", telefone: "(11) 99876-5432", status: "ativo" },
    { id: "4", nome: "Ana Costa", telefone: "(11) 97654-3210", status: "ativo" }
  ])

  useEffect(() => {
    setMounted(true)
    const clienteData = localStorage.getItem("clienteManelo")
    if (clienteData) {
      const data = JSON.parse(clienteData)
      setPontos(data.pontos || 150)
    }
    verificarPontosExpirados()
  }, [])

  const verificarPontosExpirados = () => {
    const hoje = new Date()
    setTransacoes(prev => 
      prev.map(t => {
        if (t.status === "pendente" && t.dataExpiracao) {
          const dataExp = new Date(t.dataExpiracao)
          if (hoje > dataExp) {
            return { ...t, status: "expirado" }
          }
        }
        return t
      })
    )
  }

  const handleImagemSelecionada = (file: File) => {
    setImagemComprovante(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const adicionarCompra = async () => {
    if (!valorCompra || parseFloat(valorCompra) <= 0) {
      alert("Por favor, insira um valor válido")
      return
    }

    if (!imagemComprovante) {
      alert("Por favor, adicione uma foto do comprovante")
      return
    }

    const valor = parseFloat(valorCompra)
    const pontosGanhos = Math.floor(valor)

    const hoje = new Date()
    const dataExpiracao = new Date(hoje)
    dataExpiracao.setDate(dataExpiracao.getDate() + 7)

    const novaTransacao: Transacao = {
      id: Date.now().toString(),
      tipo: "pendente",
      pontos: pontosGanhos,
      descricao: `Compra de R$ ${valor.toFixed(2)}`,
      data: hoje.toISOString().split('T')[0],
      status: "pendente",
      dataExpiracao: dataExpiracao.toISOString().split('T')[0],
      comprovanteUrl: previewUrl || undefined,
      validado: false
    }

    setTransacoes(prev => [novaTransacao, ...prev])
    setValorCompra("")
    setImagemComprovante(null)
    setPreviewUrl(null)
    setMostrarFormulario(false)
  }

  const confirmarPontos = (id: string) => {
    setTransacoes(prev => 
      prev.map(t => 
        t.id === id ? { ...t, status: "confirmado" } : t
      )
    )
    
    const transacao = transacoes.find(t => t.id === id)
    if (transacao && transacao.status === "pendente") {
      const novosPontos = pontos + transacao.pontos
      setPontos(novosPontos)
      
      const clienteData = localStorage.getItem("clienteManelo")
      if (clienteData) {
        const data = JSON.parse(clienteData)
        data.pontos = novosPontos
        localStorage.setItem("clienteManelo", JSON.stringify(data))
      }
    }
  }

  const cancelarPontos = (id: string) => {
    setTransacoes(prev => 
      prev.map(t => 
        t.id === id ? { ...t, status: "cancelado" } : t
      )
    )
  }

  const calcularDiasRestantes = (dataExpiracao: string) => {
    if (!mounted) return 0
    const hoje = new Date()
    const dataExp = new Date(dataExpiracao)
    const diff = Math.ceil((dataExp.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const formatarData = (dataString: string) => {
    if (!mounted) return ""
    return new Date(dataString).toLocaleDateString('pt-BR')
  }

  const pontosPendentes = transacoes
    .filter(t => t.status === "pendente")
    .reduce((acc, t) => acc + t.pontos, 0)

  const pontosConfirmados = transacoes
    .filter(t => t.status === "confirmado" && t.tipo === "ganho")
    .reduce((acc, t) => acc + t.pontos, 0)

  // Previne hydration mismatch renderizando apenas após montagem
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FFF8DC]">
        <header className="sticky top-0 z-20 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Meus Pontos</h1>
                <p className="text-xs opacity-90">Confirme com comprovante</p>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 py-6">
          <div className="text-center text-gray-600">Carregando...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Meus Pontos</h1>
              <p className="text-xs opacity-90">Confirme com comprovante</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Card de Saldo */}
        <Card className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-none">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-[#8B4513]/80 mb-2">Saldo Atual</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-10 h-10 text-[#8B4513]" />
                <p className="text-5xl font-bold text-[#8B4513]">{pontos}</p>
              </div>
              <p className="text-sm text-[#8B4513]/80">pontos confirmados</p>
            </div>

            {pontosPendentes > 0 && (
              <div className="mt-4 bg-white/50 rounded-lg p-3 text-center">
                <p className="text-xs text-[#8B4513]/80 mb-1">Aguardando confirmação</p>
                <p className="text-2xl font-bold text-[#8B4513]">+{pontosPendentes} pts</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botão Adicionar Compra */}
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Registrar Nova Compra
        </Button>

        {/* Formulário de Compra Simplificado */}
        {mostrarFormulario && (
          <Card className="border-2 border-green-500 bg-green-50">
            <CardHeader>
              <CardTitle className="text-[#8B4513]">Nova Compra</CardTitle>
              <CardDescription>Adicione o comprovante e o valor da compra</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload de Comprovante */}
              <div>
                <Label className="text-[#8B4513] font-semibold mb-2 block">
                  📸 Comprovante (Foto do Cupom)
                </Label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Tirar Foto
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Galeria
                  </Button>
                </div>

                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImagemSelecionada(file)
                  }}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleImagemSelecionada(file)
                  }}
                />

                {/* Preview da Imagem */}
                {previewUrl && (
                  <div className="mt-3 relative">
                    <img 
                      src={previewUrl} 
                      alt="Comprovante" 
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagemComprovante(null)
                        setPreviewUrl(null)
                      }}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Valor da Compra */}
              <div>
                <Label htmlFor="valor" className="text-[#8B4513] font-semibold">
                  Valor da Compra (R$)
                </Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={valorCompra}
                  onChange={(e) => setValorCompra(e.target.value)}
                  className="mt-2 text-lg"
                />
                {valorCompra && (
                  <p className="text-sm text-green-700 mt-2">
                    Você ganhará <strong>{Math.floor(parseFloat(valorCompra))} pontos</strong>
                  </p>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={adicionarCompra}
                  disabled={!valorCompra || !imagemComprovante}
                >
                  Adicionar
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setMostrarFormulario(false)
                    setValorCompra("")
                    setImagemComprovante(null)
                    setPreviewUrl(null)
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-[#8B4513]">{pontosConfirmados}</p>
              <p className="text-xs text-gray-600">Total Ganho</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-[#8B4513]">{200 - pontos}</p>
              <p className="text-xs text-gray-600">Próximo Brinde</p>
            </CardContent>
          </Card>
        </div>

        {/* Transações Pendentes */}
        {transacoes.some(t => t.status === "pendente") && (
          <div>
            <h3 className="text-lg font-bold text-[#8B4513] mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Aguardando Confirmação
            </h3>
            <div className="space-y-3">
              {transacoes
                .filter(t => t.status === "pendente")
                .map(transacao => {
                  const diasRestantes = transacao.dataExpiracao ? calcularDiasRestantes(transacao.dataExpiracao) : 0
                  return (
                    <Card key={transacao.id} className="border-2 border-orange-400 bg-orange-50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-[#8B4513]">{transacao.descricao}</p>
                            </div>
                            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              {formatarData(transacao.data)}
                            </p>
                            {diasRestantes > 0 && (
                              <div className="flex items-center gap-1 mt-2">
                                <AlertCircle className="w-3 h-3 text-orange-600" />
                                <p className="text-xs text-orange-600 font-semibold">
                                  Expira em {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'}
                                </p>
                              </div>
                            )}
                          </div>
                          <Badge className="bg-orange-500 text-white">
                            +{transacao.pontos} pts
                          </Badge>
                        </div>

                        {/* Preview do Comprovante */}
                        {transacao.comprovanteUrl && (
                          <img 
                            src={transacao.comprovanteUrl} 
                            alt="Comprovante" 
                            className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-300"
                          />
                        )}

                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => confirmarPontos(transacao.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirmar
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => cancelarPontos(transacao.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        )}

        {/* Histórico de Transações */}
        <div>
          <h3 className="text-lg font-bold text-[#8B4513] mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Histórico
          </h3>
          <div className="space-y-3">
            {transacoes
              .filter(t => t.status !== "pendente")
              .map(transacao => (
                <Card 
                  key={transacao.id} 
                  className={`${
                    transacao.status === "cancelado" || transacao.status === "expirado"
                      ? "opacity-50 bg-gray-100" 
                      : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transacao.tipo === "ganho" 
                            ? "bg-green-100" 
                            : transacao.tipo === "resgate"
                            ? "bg-purple-100"
                            : "bg-gray-100"
                        }`}>
                          {transacao.tipo === "ganho" && (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          )}
                          {transacao.tipo === "resgate" && (
                            <Gift className="w-5 h-5 text-purple-600" />
                          )}
                          {(transacao.status === "cancelado" || transacao.status === "expirado") && (
                            <XCircle className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-[#8B4513] text-sm">
                              {transacao.descricao}
                            </p>
                            {transacao.validado && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatarData(transacao.data)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transacao.pontos > 0 ? "text-green-600" : "text-purple-600"
                        }`}>
                          {transacao.pontos > 0 ? "+" : ""}{transacao.pontos}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            transacao.status === "confirmado" 
                              ? "border-green-500 text-green-600" 
                              : transacao.status === "expirado"
                              ? "border-orange-500 text-orange-600"
                              : "border-gray-400 text-gray-600"
                          }`}
                        >
                          {transacao.status === "confirmado" ? "Confirmado" : 
                           transacao.status === "expirado" ? "Expirado" : "Cancelado"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Fale Conosco */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h4 className="font-semibold text-[#8B4513] mb-2 text-lg">📞 Fale Conosco</h4>
            <p className="text-sm text-gray-700 mb-4">
              Tire suas dúvidas ou faça seu pedido pelo WhatsApp
            </p>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Chamar no WhatsApp
            </Button>
          </CardContent>
        </Card>

        {/* Informações */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-[#8B4513] mb-2">ℹ️ Como funciona?</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• A cada R$ 1,00 gasto = 1 ponto</li>
              <li>• Tire foto do comprovante de compra</li>
              <li>• Aguarde confirmação do estabelecimento</li>
              <li>• <strong>Pontos não confirmados expiram em 7 dias</strong></li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
