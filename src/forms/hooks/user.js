import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createLoginPageSchema, signUpSchema } from '../schemas/user'

export const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(createLoginPageSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return { form }
}

export const useSignupForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })
  return { form }
}
