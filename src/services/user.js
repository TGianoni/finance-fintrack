import { publicApi } from '@/lib/axios'

export const UserService = {
  signUp: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return response.data
  },
}
