import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

const signInForm = z.object({
  name: z
    .string()
    .min(8, { message: 'Insira o nome completo' })
    .max(50, { message: 'Use o primeiro e ultimo nome' }),
  cpfCnpj: z
    .string()
    .min(8, { message: 'CPF ou CNPJ inválido' })
    .max(14, { message: 'CPF ou CNPJ inválido' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 caracters' })
    .max(20, { message: 'A senha deve não pode ter mais de 20 caracteres' }),
  repeatPassword: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 caracters' })
    .max(20, { message: 'A senha deve não pode ter mais de 20 caracteres' }),
})

type SignInForm = z.infer<typeof signInForm>

export function SignUp() {
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
      toast.success('Cadastro Realizado com sucesso')
    } catch (error) {
      toast.error('Erro ao Realizar Cadastro')
    } finally {
      console.log(data)
    }
  }
  let activeButton = false
  const nameWatch = watch('name')
  const cpfCnpjWatch = watch('cpfCnpj')
  const emailWatch = watch('email')
  const passwordWatch = watch('password')
  const repeatPasswordWatch = watch('repeatPassword')

  if (
    !nameWatch ||
    !cpfCnpjWatch ||
    !emailWatch ||
    !passwordWatch ||
    !repeatPasswordWatch
  ) {
    activeButton = false
  } else {
    activeButton = true
  }
  return (
    <>
      <Helmet title="Login" />
      <form
        className="m-auto flex h-5/6 w-4/5 flex-col justify-between"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Cadastro</h1>
          <span className="lg:text-xl">
            Por favor preencha os dados para se cadastrar
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              className="bg-transparent"
              type="text"
              id="nome"
              placeholder="Nome Completo"
              {...register('name')}
            />
            <div className="h-4 text-right">
              {errors.name && (
                <p className="text-destructive">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cpfCnpj">CPF ou CNPJ</Label>
            <Input
              className="bg-transparent"
              type="text"
              id="cpfCnpj"
              placeholder="CPF ou CNPJ"
              {...register('cpfCnpj')}
            />
            <div className="h-4 text-right">
              {errors.cpfCnpj && (
                <p className="text-destructive">{errors.cpfCnpj.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-transparent"
              type="text"
              id="email"
              placeholder="Email"
              {...register('email')}
            />
            <div className="h-4 text-right">
              {errors.email && (
                <p className="text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              className="bg-transparent"
              type="password"
              id="password"
              placeholder="Senha"
              {...register('password')}
            />
            <div className="h-4 text-right">
              {errors.password && (
                <p className="text-destructive">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="repeatPassword">Repita a Senha</Label>
            <Input
              className="bg-transparent"
              type="password"
              id="repeatPassword"
              placeholder="Repita a Senha"
              {...register('repeatPassword')}
            />
            <div className="h-4 text-right">
              {errors.repeatPassword && (
                <p className="text-destructive">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <Button className="w-full" disabled={isSubmitting || !activeButton}>
            CADASTRAR
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
    </>
  )
}
