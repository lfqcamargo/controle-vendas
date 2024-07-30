import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { ErrorField } from './components/error-field'

const recoveryPassword = z.object({
  email: z.string().email({ message: 'Email inválido' }),
})

type RecoveryPassword = z.infer<typeof recoveryPassword>

export function RecoveryPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecoveryPassword>({
    resolver: zodResolver(recoveryPassword),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  async function handleRecoveryPassword(data: RecoveryPassword) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      reset()
      toast.success('Email enviado.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {}
  }

  const emailWatch = watch('email')
  const activeButton = !emailWatch

  return (
    <>
      <Helmet title="Recuperar senha" />
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Recuperar senha
          </h1>
          <span className="text-sm text-muted-foreground">
            Informe o e-mail, associado à sua conta para alterar sua senha.
          </span>
        </div>
        <form
          className="space-y-5"
          onSubmit={handleSubmit(handleRecoveryPassword)}
        >
          <div className="space-y-1">
            <Input placeholder="Email" {...register('email')} />
            <ErrorField error={errors.email} />
          </div>

          <Button className="w-full" disabled={isSubmitting || activeButton}>
            Enviar
          </Button>
        </form>
      </div>
    </>
  )
}
