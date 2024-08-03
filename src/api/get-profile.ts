import { api } from '@/lib/axios'

interface GetProfileResponse {
  name: string
  cpfCnpj: string
  email: string
  password: string
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get('/users/1')

  return response.data
}
