import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado
   * @param { Object} input - Transação a ser criada
   * @param { string } input.name - Nome da transação
   * @param { string } input.date - Data da transação
   * @param { string } input.amount - Valor da transação
   * @param { string } input.type - tipo da transação ("EARNING", "EXPENSE", "INVESTMENT")
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
  /**
   * Retorna as transações do usuário autenticado
   * @param { Object} input - Transação a ser criada
   * @param { string } input.from - Data inicial (YYYY-MM-DD)
   * @param { string } input.to - Data final (YYYY-MM-DD)
   */
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response
  },
}
