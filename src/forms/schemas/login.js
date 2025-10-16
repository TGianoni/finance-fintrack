import z from 'zod'

export const createLoginPageSchema = z.object({
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
