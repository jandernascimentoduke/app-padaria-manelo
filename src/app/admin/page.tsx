"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Package, TrendingUp, Users, DollarSign, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type Product = {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
  active: boolean
}

type Promotion = {
  id: number
  title: string
  description: string
  discount: number
  active: boolean
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Pão Francês", price: 0.50, category: "paes", image: "", description: "Pão francês tradicional", active: true },
    { id: 2, name: "Bolo de Chocolate", price: 35.00, category: "bolos", image: "", description: "Bolo de chocolate cremoso", active: true },
    { id: 3, name: "Coxinha", price: 5.50, category: "salgados", image: "", description: "Coxinha de frango", active: true },
  ])

  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: 1, title: "Combo Café da Manhã", description: "Café + Pão + Bolo por R$ 15", discount: 20, active: true },
    { id: 2, title: "Pizza em Dobro", description: "Na compra de 2 pizzas, ganhe 10% off", discount: 10, active: false },
  ])

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "paes",
    description: "",
    active: true
  })

  const categories = [
    { value: "paes", label: "Pães" },
    { value: "bolos", label: "Bolos" },
    { value: "salgados", label: "Salgados" },
    { value: "cafes", label: "Cafés" },
    { value: "pizzas", label: "Pizzas" },
  ]

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category || "paes",
        image: newProduct.image || "",
        description: newProduct.description || "",
        active: true
      }
      setProducts([...products, product])
      setNewProduct({ name: "", price: 0, category: "paes", description: "", active: true })
      setIsAddingProduct(false)
    }
  }

  const handleUpdateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleTogglePromotion = (id: number) => {
    setPromotions(promotions.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ))
  }

  const sendWhatsAppPromotion = (promotion: Promotion) => {
    const message = `🎉 *PROMOÇÃO MANELO FORNERIA*\n\n${promotion.title}\n${promotion.description}\n\n💰 ${promotion.discount}% de desconto!\n\n📍 Válido para retirada na loja`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header Admin */}
      <header className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Painel Administrativo</h1>
              <p className="text-sm opacity-90 mt-1">Manelo Forneria</p>
            </div>
            <div className="flex gap-2">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => window.location.href = '/admin/alertas'}
              >
                <Bell className="w-4 h-4 mr-2" />
                Alertas do Padeiro
              </Button>
              <Button 
                variant="outline" 
                className="bg-white text-[#8B4513] hover:bg-gray-100"
                onClick={() => window.location.href = '/'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao App
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Produtos Ativos</CardDescription>
              <CardTitle className="text-3xl text-[#8B4513]">
                {products.filter(p => p.active).length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <Package className="w-4 h-4 mr-1" />
                <span>No cardápio</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pedidos Hoje</CardDescription>
              <CardTitle className="text-3xl text-[#8B4513]">24</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% vs ontem</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Clientes Ativos</CardDescription>
              <CardTitle className="text-3xl text-[#8B4513]">156</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <Users className="w-4 h-4 mr-1" />
                <span>+8 novos</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Faturamento Hoje</CardDescription>
              <CardTitle className="text-3xl text-[#8B4513]">R$ 1.240</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>Meta: 80%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de gerenciamento */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border-2 border-[#8B4513]/20">
            <TabsTrigger value="products" className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white">
              Produtos
            </TabsTrigger>
            <TabsTrigger value="promotions" className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white">
              Promoções
            </TabsTrigger>
            <TabsTrigger value="combos" className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white">
              Combos
            </TabsTrigger>
          </TabsList>

          {/* Gerenciamento de Produtos */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#8B4513]">Gerenciar Produtos</h2>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-[#8B4513]">Novo Produto</DialogTitle>
                    <DialogDescription>Adicione um novo item ao cardápio</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Ex: Pão Francês"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select 
                        value={newProduct.category} 
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Descreva o produto..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">URL da Imagem</Label>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-[#8B4513] hover:bg-[#A0522D]"
                        onClick={handleAddProduct}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingProduct(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Lista de produtos por categoria */}
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.category === category.value)
              if (categoryProducts.length === 0) return null

              return (
                <div key={category.value}>
                  <h3 className="text-lg font-bold text-[#8B4513] mb-3">{category.label}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.map(product => (
                      <Card key={product.id} className={!product.active ? "opacity-50" : ""}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-[#8B4513]">{product.name}</CardTitle>
                              <CardDescription>{product.description}</CardDescription>
                            </div>
                            <Badge variant={product.active ? "default" : "secondary"}>
                              {product.active ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="text-2xl font-bold text-[#8B4513]">
                              R$ {product.price.toFixed(2)}
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="flex-1">
                                    <Edit className="w-4 h-4 mr-1" />
                                    Editar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="text-[#8B4513]">Editar Produto</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Nome</Label>
                                      <Input
                                        value={product.name}
                                        onChange={(e) => handleUpdateProduct(product.id, { name: e.target.value })}
                                      />
                                    </div>
                                    <div>
                                      <Label>Preço (R$)</Label>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={product.price}
                                        onChange={(e) => handleUpdateProduct(product.id, { price: parseFloat(e.target.value) })}
                                      />
                                    </div>
                                    <div>
                                      <Label>Descrição</Label>
                                      <Textarea
                                        value={product.description}
                                        onChange={(e) => handleUpdateProduct(product.id, { description: e.target.value })}
                                        rows={3}
                                      />
                                    </div>
                                    <Button 
                                      className="w-full bg-[#8B4513] hover:bg-[#A0522D]"
                                      onClick={() => {}}
                                    >
                                      <Save className="w-4 h-4 mr-2" />
                                      Salvar Alterações
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateProduct(product.id, { active: !product.active })}
                              >
                                {product.active ? "Desativar" : "Ativar"}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          {/* Gerenciamento de Promoções */}
          <TabsContent value="promotions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#8B4513]">Gerenciar Promoções</h2>
              <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                <Plus className="w-4 h-4 mr-2" />
                Nova Promoção
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promotions.map(promo => (
                <Card key={promo.id} className={!promo.active ? "opacity-50" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-[#8B4513]">{promo.title}</CardTitle>
                        <CardDescription>{promo.description}</CardDescription>
                      </div>
                      <Badge 
                        variant={promo.active ? "default" : "secondary"}
                        className={promo.active ? "bg-green-500" : ""}
                      >
                        {promo.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-[#8B4513]">
                        {promo.discount}% OFF
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleTogglePromotion(promo.id)}
                        >
                          {promo.active ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => sendWhatsAppPromotion(promo)}
                        >
                          Divulgar no WhatsApp
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gerenciamento de Combos */}
          <TabsContent value="combos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#8B4513]">Gerenciar Combos</h2>
              <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                <Plus className="w-4 h-4 mr-2" />
                Criar Combo
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#8B4513]">Criar Combo Personalizado</CardTitle>
                <CardDescription>
                  Monte combos especiais combinando produtos do cardápio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nome do Combo</Label>
                  <Input placeholder="Ex: Combo Café da Manhã" />
                </div>
                <div>
                  <Label>Produtos Inclusos</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um produto" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map(p => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                              {p.name} - R$ {p.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button size="icon" variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Preço do Combo (R$)</Label>
                  <Input type="number" step="0.01" placeholder="0.00" />
                </div>
                <Button className="w-full bg-[#8B4513] hover:bg-[#A0522D]">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Combo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
