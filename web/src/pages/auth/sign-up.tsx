import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { ErrorField } from './components/error-field'

const signInForm = z
  .object({
    name: z
      .string()
      .min(8, { message: 'Insira o nome completo' })
      .max(50, { message: 'Use o primeiro e ultimo nome' }),
    cpfCnpj: z
      .string()
      .refine((cpfCnpj) => cpf.isValid(cpfCnpj) || cnpj.isValid(cpfCnpj), {
        message: 'CPF ou CNPJ inválido',
      }),
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
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas não são iguais',
    path: ['repeatPassword'],
  })

type SignInForm = z.infer<typeof signInForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await registerUserFn({
        name: data.name,
        cpfCnpj: data.cpfCnpj,
        email: data.email,
        password: data.password,
      })

      reset()
      navigate(`/sign-in?email=${data.email}`)
      toast.success('Restaurante cadastrado com sucesso!')
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

      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="flex flex-col">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  className="bg-transparent"
                  type="text"
                  id="nome"
                  placeholder="Nome Completo"
                  {...register('name')}
                />
                <ErrorField error={errors.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF ou CNPJ</Label>
                <Input
                  className="bg-transparent"
                  type="text"
                  id="cpfCnpj"
                  placeholder="CPF ou CNPJ"
                  {...register('cpfCnpj')}
                />
                <ErrorField error={errors.cpfCnpj} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="bg-transparent"
                  type="text"
                  id="email"
                  placeholder="Email"
                  {...register('email')}
                />
                <ErrorField error={errors.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  className="bg-transparent"
                  type="password"
                  id="password"
                  placeholder="Senha"
                  {...register('password')}
                />
                <ErrorField error={errors.password} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repeatPassword">Repita a Senha</Label>
                <Input
                  className="bg-transparent"
                  type="password"
                  id="repeatPassword"
                  placeholder="Repita a Senha"
                  {...register('repeatPassword')}
                />
                <ErrorField error={errors.repeatPassword} />
              </div>
            </div>
            <div>
              <Button
                className="w-full"
                disabled={isSubmitting || !activeButton}
              >
                CADASTRAR
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-center">
            <span>Já tem uma conta?</span>
            <Button variant="ghost">
              <Link className="text-primary" to="/sign-in">
                Faça Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
