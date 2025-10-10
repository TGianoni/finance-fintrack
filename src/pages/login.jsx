import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'

const loginPageSchema = z.object({
  email: z
    .string()
    .email({
      message: 'O e-mail é inválido.',
    })
    .trim()
    .min(1, {
      message: 'O e-mail é inválido.',
    }),
  password: z.string().trim().min(6, {
    message: 'A Senha deve conter pelo menos 6 caracteres',
  }),
})

const LoginPage = () => {
  const [user, setUser] = useState(null)
  const loginPageMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const form = useForm({
    resolver: zodResolver(loginPageSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.error(error)
      }
    }
    init()
  }, [])

  const handleSubmit = (data) => {
    loginPageMutation.mutate(data, {
      onSuccess: (loginUser) => {
        const accessToken = loginUser.tokens.accessToken
        const refreshToken = loginUser.tokens.refreshToken
        setUser(loginUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success(`Bem-vindo de volta, ${loginUser.firstName}!`)
      },
      onError: () => {
        toast.error(
          'Erro ao fazer login. Por favor, tente novamente mais tarde'
        )
      },
    })
  }

  if (user) {
    return <h1>Olá, {user.email}</h1>
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[450px]">
            <CardHeader className="text-center">
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira os dados abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* E-MAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie agora</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
