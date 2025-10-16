import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createLoginPageSchema } from '../schemas/login'

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
