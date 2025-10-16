import { Loader2Icon } from 'lucide-react'
import { Link, Navigate } from 'react-router'

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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/contexts/auth'
import { useSignupForm } from '@/forms/hooks/user'

const SignUpPage = () => {
  const { user, signup, isInitializing } = useAuthContext()
  const form = useSignupForm()

  const handleSubmit = (data) => signup(data)

  if (isInitializing) {
    return null
  }

  if (user) {
    return <Navigate to="/" />
  }
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>Crie sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* PRIMEIRO NOME */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ÚLTIMO NOME */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu Sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* E-MAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRMAÇÃO DE PASSWORD */}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="leading-none">
                      <FormLabel
                        className={`text-xs text-muted-foreground opacity-75 ${form.formState.errors.terms && 'text-red-500'}`}
                      >
                        Ao clicar em Criar Conta, você aceita{' '}
                        <a
                          href="#"
                          className={`underline ${form.formState.errors.terms && 'text-red-500'}`}
                        >
                          nosso termo de uso e política de privacidade.
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Criar Conta
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}
export default SignUpPage
