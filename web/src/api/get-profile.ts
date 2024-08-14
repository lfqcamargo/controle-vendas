import { api } from '@/lib/axios'

interface GetProfileResponse {
  user: {
    id: string
    name: string
    cpf_cnpj: string
    email: string
    date_created: Date
    last_login: Date | null
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get('/me')

  return response.data
}
