import { api } from '@/lib/axios'

export interface RegisterUserBody {
  name: string
  cpfCnpj: string
  email: string
  password: string
}

export async function registerUser({
  name,
  cpfCnpj,
  email,
  password,
}: RegisterUserBody) {
  await api.post('/users', {
    name,
    cpfCnpj,
    email,
    password,
  })
}
