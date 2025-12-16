"use client"

import { useState } from "react"
import { ArrowLeft, Camera, Heart, MessageCircle, Upload, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FotoGaleria = {
  id: number
  autor: string
  imagem: string
  legenda: string
  curtidas: number
  comentarios: number
  data: string
  produto: string
}

const fotosSimuladas: FotoGaleria[] = [
  {
    id: 1,
    autor: "Maria Silva",
    imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    legenda: "Pão francês quentinho da manhã! ❤️",
    curtidas: 24,
    comentarios: 5,
    data: "2025-01-15",
    produto: "Pão Francês"
  },
  {
    id: 2,
    autor: "João Santos",
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    legenda: "Melhor bolo de chocolate da cidade! 🍰",
    curtidas: 32,
    comentarios: 8,
    data: "2025-01-14",
    produto: "Bolo de Chocolate"
  },
  {
    id: 3,
    autor: "Ana Costa",
    imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    legenda: "Pizza perfeita para o fim de semana! 🍕",
    curtidas: 45,
    comentarios: 12,
    data: "2025-01-13",
    produto: "Pizza"
  },
  {
    id: 4,
    autor: "Pedro Lima",
    imagem: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    legenda: "Café da manhã completo! ☕",
    curtidas: 28,
    comentarios: 6,
    data: "2025-01-12",
    produto: "Combo Café"
  },
  {
    id: 5,
    autor: "Carla Mendes",
    imagem: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&h=400&fit=crop",
    legenda: "Pão de queijo irresistível! 🧀",
    curtidas: 38,
    comentarios: 9,
    data: "2025-01-11",
    produto: "Pão de Queijo"
  },
  {
    id: 6,
    autor: "Lucas Oliveira",
    imagem: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=400&h=400&fit=crop",
    legenda: "Coxinha crocante e deliciosa! 😋",
    curtidas: 21,
    comentarios: 4,
    data: "2025-01-10",
    produto: "Coxinha"
  }
]

export default function GaleriaPage() {
  const [fotos] = useState<FotoGaleria[]>(fotosSimuladas)
  const [fotoSelecionada, setFotoSelecionada] = useState<FotoGaleria | null>(null)
  const [curtidas, setCurtidas] = useState<{ [key: number]: boolean }>({})

  const handleCurtir = (id: number) => {
    setCurtidas({ ...curtidas, [id]: !curtidas[id] })
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-xl font-bold">Galeria de Clientes</h1>
                <p className="text-xs opacity-90">Compartilhe seus momentos</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#FFD700] hover:bg-[#FFA500] text-[#8B4513]">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Foto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-[#8B4513]">Compartilhe sua Foto</DialogTitle>
                  <DialogDescription>
                    Mostre seu produto favorito e ganhe 20 pontos!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#8B4513]/30 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-[#8B4513]" />
                    <p className="text-sm text-gray-600 mb-3">
                      Clique para selecionar uma foto
                    </p>
                    <Button variant="outline">
                      Escolher Foto
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="produto">Produto</Label>
                    <Input id="produto" placeholder="Ex: Pão Francês" />
                  </div>
                  
                  <div>
                    <Label htmlFor="legenda">Legenda</Label>
                    <Textarea 
                      id="legenda" 
                      placeholder="Conte sobre sua experiência..."
                      rows={3}
                    />
                  </div>

                  <div className="bg-[#FFD700]/20 rounded-lg p-3 text-sm">
                    <p className="flex items-center gap-2 text-[#8B4513]">
                      <Star className="w-4 h-4" />
                      <strong>Ganhe 20 pontos</strong> ao compartilhar sua foto!
                    </p>
                  </div>

                  <Button className="w-full bg-[#8B4513] hover:bg-[#A0522D]">
                    Publicar Foto
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Banner de Incentivo */}
        <Card className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-none">
          <CardContent className="p-6 text-center">
            <Camera className="w-12 h-12 mx-auto mb-3 text-[#8B4513]" />
            <h2 className="text-xl font-bold text-[#8B4513] mb-2">
              Compartilhe e Ganhe!
            </h2>
            <p className="text-sm text-[#8B4513]">
              Envie fotos dos nossos produtos e ganhe <strong>20 pontos</strong> por cada publicação aprovada
            </p>
          </CardContent>
        </Card>

        {/* Grid de Fotos */}
        <div className="grid grid-cols-2 gap-3">
          {fotos.map((foto) => (
            <Card 
              key={foto.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setFotoSelecionada(foto)}
            >
              <div className="relative aspect-square">
                <img 
                  src={foto.imagem} 
                  alt={foto.legenda}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-[#8B4513]">
                    {foto.produto}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-semibold text-[#8B4513] mb-1">
                  {foto.autor}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {foto.legenda}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {foto.curtidas}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {foto.comentarios}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal de Foto Detalhada */}
        {fotoSelecionada && (
          <Dialog open={!!fotoSelecionada} onOpenChange={() => setFotoSelecionada(null)}>
            <DialogContent className="max-w-md p-0">
              <div className="relative">
                <img 
                  src={fotoSelecionada.imagem} 
                  alt={fotoSelecionada.legenda}
                  className="w-full aspect-square object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#8B4513]">{fotoSelecionada.autor}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(fotoSelecionada.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge className="bg-[#8B4513]">{fotoSelecionada.produto}</Badge>
                </div>
                
                <p className="text-sm text-gray-700">{fotoSelecionada.legenda}</p>
                
                <div className="flex items-center gap-4 pt-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={curtidas[fotoSelecionada.id] ? "text-red-500" : ""}
                    onClick={() => handleCurtir(fotoSelecionada.id)}
                  >
                    <Heart 
                      className={`w-5 h-5 mr-1 ${curtidas[fotoSelecionada.id] ? "fill-current" : ""}`}
                    />
                    {fotoSelecionada.curtidas + (curtidas[fotoSelecionada.id] ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    {fotoSelecionada.comentarios}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Regras da Galeria */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#8B4513]">Como Participar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-[#FFD700]">✓</span>
              <span>Tire uma foto dos nossos produtos</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#FFD700]">✓</span>
              <span>Adicione uma legenda criativa</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#FFD700]">✓</span>
              <span>Ganhe 20 pontos por foto aprovada</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#FFD700]">✓</span>
              <span>As melhores fotos aparecem na galeria</span>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
