import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'
import { ErrorField } from './components/error-field'

const signInForm = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 caracters' })
    .max(20, { message: 'A senha deve não pode ter mais de 20 caracteres' }),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
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
      reset()
      navigate('/')
    } catch (error) {
      toast.error('Erro ao Realizar Login')
    } finally {
      console.log(data)
    }
  }
  let activeButton = false
  const emailWatch = watch('email')
  const passwordWatch = watch('password')

  if (!emailWatch || !passwordWatch) {
    activeButton = false
  } else {
    activeButton = true
  }

  return (
    <>
      <Helmet title="Login" />
      <form
        className="m-auto flex h-2/5 w-4/5 flex-col justify-around"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            Seja Bem Vindo!
          </h1>
          <span className="lg:text-xl">
            Por favor conecte se a sua conta para continuar
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            className="bg-transparent"
            type="text"
            id="email"
            placeholder="Email"
            {...register('email')}
          />
          <ErrorField error={errors.email} />
          <Input
            className="bg-transparent"
            type="password"
            id="password"
            placeholder="Password"
            {...register('password')}
          />
          <ErrorField error={errors.password} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <Checkbox id="rememberMe" />
            <label htmlFor="rememberMe">Lembrar-me</label>
          </div>
          <Button variant="link" type="button">
            <Link to="/recovery-password">Esqueceu a senha?</Link>
          </Button>
        </div>
        <div>
          <Button className="w-full" disabled={isSubmitting || !activeButton}>
            LOGIN
          </Button>
        </div>
      </form>

      <div>
        <span>F</span>
        <span>G</span>
        <span>I</span>
        <span>T</span>
      </div>

      <div className="flex h-1/5 items-center justify-center">
        <span>Não tem uma conta?</span>
        <Button variant="ghost">
          <Link className="text-primary" to="/sign-up">
            Criar conta
          </Link>
        </Button>
      </div>
    </>
  )
}
