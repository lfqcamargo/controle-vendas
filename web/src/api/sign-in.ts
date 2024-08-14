import { api } from '@/lib/axios'

interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  await api.post('/sessions', { email, password })
}
