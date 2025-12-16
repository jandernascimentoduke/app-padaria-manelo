"use client"

import { useState } from "react"
import { Bell, Plus, Trash2, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Alerta {
  id: string
  horario: string
  mensagem: string
  ativo: boolean
}

export default function AlertasPadeiroPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: "1",
      horario: "07:00",
      mensagem: "🔥 Pão quentinho saindo agora!",
      ativo: true
    },
    {
      id: "2",
      horario: "17:00",
      mensagem: "⏰ Última fornada do dia! Corre!",
      ativo: true
    }
  ])

  const [novoAlerta, setNovoAlerta] = useState({
    horario: "",
    mensagem: ""
  })

  const [mostrarForm, setMostrarForm] = useState(false)

  const adicionarAlerta = () => {
    if (!novoAlerta.horario || !novoAlerta.mensagem) return

    const alerta: Alerta = {
      id: Date.now().toString(),
      horario: novoAlerta.horario,
      mensagem: novoAlerta.mensagem,
      ativo: true
    }

    setAlertas([...alertas, alerta])
    setNovoAlerta({ horario: "", mensagem: "" })
    setMostrarForm(false)
  }

  const removerAlerta = (id: string) => {
    setAlertas(alertas.filter(a => a.id !== id))
  }

  const toggleAlerta = (id: string) => {
    setAlertas(alertas.map(a => 
      a.id === id ? { ...a, ativo: !a.ativo } : a
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] to-[#FFE4B5]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Alertas do Padeiro</h1>
                <p className="text-xs opacity-90">Avisos de fornadas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-8">
        {/* Info Card */}
        <Card className="border-2 border-[#FFD700] bg-gradient-to-br from-white to-[#FFF8DC]">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-[#8B4513]" />
              </div>
              <div>
                <p className="text-sm text-[#8B4513] font-medium mb-1">
                  Configure alertas automáticos
                </p>
                <p className="text-xs text-gray-600">
                  Seus clientes receberão notificações nos horários programados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão Adicionar */}
        {!mostrarForm && (
          <Button
            className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white h-14 text-base"
            onClick={() => setMostrarForm(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Alerta
          </Button>
        )}

        {/* Formulário */}
        {mostrarForm && (
          <Card className="border-2 border-[#8B4513]">
            <CardHeader className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white">
              <CardTitle className="text-lg">Criar Alerta</CardTitle>
              <CardDescription className="text-white/80">
                Configure horário e mensagem
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="horario" className="text-[#8B4513] font-semibold">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Horário
                </Label>
                <Input
                  id="horario"
                  type="time"
                  value={novoAlerta.horario}
                  onChange={(e) => setNovoAlerta({ ...novoAlerta, horario: e.target.value })}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-[#8B4513] font-semibold">
                  <Bell className="w-4 h-4 inline mr-2" />
                  Mensagem
                </Label>
                <Textarea
                  id="mensagem"
                  placeholder="Ex: 🔥 Pão quentinho saindo agora!"
                  value={novoAlerta.mensagem}
                  onChange={(e) => setNovoAlerta({ ...novoAlerta, mensagem: e.target.value })}
                  className="min-h-[100px] text-base"
                />
                <p className="text-xs text-gray-500">
                  💡 Use emojis para chamar atenção: 🔥 ⏰ 🍞 ✨
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setMostrarForm(false)
                    setNovoAlerta({ horario: "", mensagem: "" })
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-[#8B4513] hover:bg-[#A0522D]"
                  onClick={adicionarAlerta}
                  disabled={!novoAlerta.horario || !novoAlerta.mensagem}
                >
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Alertas */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[#8B4513] px-1">
            Alertas Programados ({alertas.length})
          </h2>
          
          {alertas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500">Nenhum alerta configurado</p>
                <p className="text-sm text-gray-400 mt-1">
                  Clique em "Novo Alerta" para começar
                </p>
              </CardContent>
            </Card>
          ) : (
            alertas.map((alerta) => (
              <Card
                key={alerta.id}
                className={`transition-all ${
                  alerta.ativo
                    ? "border-2 border-[#8B4513] bg-white"
                    : "border border-gray-300 bg-gray-50 opacity-60"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-[#8B4513]" />
                        <span className="text-2xl font-bold text-[#8B4513]">
                          {alerta.horario}
                        </span>
                        <Badge
                          variant={alerta.ativo ? "default" : "secondary"}
                          className={alerta.ativo ? "bg-green-500" : ""}
                        >
                          {alerta.ativo ? "Ativo" : "Pausado"}
                        </Badge>
                      </div>
                      <p className="text-base text-gray-700 mb-3">
                        {alerta.mensagem}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAlerta(alerta.id)}
                          className="text-xs"
                        >
                          {alerta.ativo ? "Pausar" : "Ativar"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removerAlerta(alerta.id)}
                          className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Dicas */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 text-base">💡 Dicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-800">
            <p>• Use emojis para chamar atenção (🔥 ⏰ 🍞)</p>
            <p>• Crie urgência: "Última fornada!"</p>
            <p>• Seja direto e objetivo</p>
            <p>• Configure 2-3 horários principais</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
