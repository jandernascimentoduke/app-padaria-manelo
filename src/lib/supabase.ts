import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Cliente {
  id: string
  nome: string
  telefone: string
  email?: string
  status: 'ativo' | 'inativo'
  pontos: number
  created_at: string
  updated_at: string
}

export interface Compra {
  id: string
  cliente_id: string
  valor: number
  pontos: number
  comprovante_url?: string
  validado: boolean
  status: 'pendente' | 'confirmado' | 'cancelado' | 'expirado'
  data_expiracao: string
  created_at: string
  updated_at: string
}

// Funções auxiliares
export async function buscarClientePorNome(primeiroNome: string) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .ilike('nome', `${primeiroNome}%`)
    .eq('status', 'ativo')
    .single()

  if (error) {
    console.error('Erro ao buscar cliente por nome:', error)
    return null
  }

  return data as Cliente
}

export async function buscarClientePorTelefone(telefone: string) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('telefone', telefone)
    .eq('status', 'ativo')
    .single()

  if (error) {
    console.error('Erro ao buscar cliente por telefone:', error)
    return null
  }

  return data as Cliente
}

export async function criarCompra(compra: Omit<Compra, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('compras')
    .insert([compra])
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar compra:', error)
    throw error
  }

  return data as Compra
}

export async function atualizarPontosCliente(clienteId: string, pontos: number) {
  const { data, error } = await supabase
    .from('clientes')
    .update({ pontos, updated_at: new Date().toISOString() })
    .eq('id', clienteId)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar pontos:', error)
    throw error
  }

  return data as Cliente
}

export async function uploadComprovante(file: File, clienteId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${clienteId}-${Date.now()}.${fileExt}`
  const filePath = `comprovantes/${fileName}`

  const { data, error } = await supabase.storage
    .from('comprovantes')
    .upload(filePath, file)

  if (error) {
    console.error('Erro ao fazer upload do comprovante:', error)
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from('comprovantes')
    .getPublicUrl(filePath)

  return publicUrl
}
