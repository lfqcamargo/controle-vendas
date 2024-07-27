import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'

const signInForm = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 caracters' })
    .max(20, { message: 'A senha deve não pode ter mais de 20 caracteres' }),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (
        data.email !== 'lfqcamargo@gmail.com' ||
        data.password !== '12345678'
      ) {
        throw new Error()
      }
      toast.success('Login Realizado com sucesso')
    } catch (error) {
      toast.error('Erro ao Realizar Login')
    } finally {
      console.log(data)
    }
  }
  let activeButton = false
  const emailWatch = watch('email')
  const emailPassword = watch('password')

  if (!emailWatch || !emailPassword) {
    activeButton = false
  } else {
    activeButton = true
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="bg-primary"></div>
      <div className="relative flex flex-col">
        <form
          className="m-auto flex h-3/6 w-4/5 flex-col justify-between"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight">
              Seja Bem Vindo!
            </h1>
            <span className="lg:text-xl">
              Por favor conecte se a sua conta para continuar
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <Input
              className="bg-transparent"
              type="text"
              id="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-destructive">{errors.email.message}</p>
            )}
            <Input
              className="bg-transparent"
              type="password"
              id="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <Checkbox id="rememberMe" />
              <label htmlFor="rememberMe">Lembrar-me</label>
            </div>
            <Button variant="link">
              <Link to="/revovery-password">Esqueceu a senha?</Link>
            </Button>
          </div>
          <div>
            <Button className="w-full" disabled={isSubmitting || !activeButton}>
              LOGIN
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <span>New on our plataform?</span>
            <Button variant="ghost">
              <Link className="text-primary" to="/sign-up">
                Create an account
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
