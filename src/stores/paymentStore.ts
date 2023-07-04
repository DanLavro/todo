import { defineStore } from 'pinia'
import type { Payment } from '@/types/types'

export const usePaymentStore = defineStore({
  id: 'payment',
  state: () => ({
    payments: [
      { id: 1, userId: 1, title: 'Платеж 1', amount: 100, date: '2023-07-01' },
      { id: 2, userId: 1, title: 'Платеж 2', amount: 200, date: '2023-07-02' },
      { id: 3, userId: 2, title: 'Платеж 3', amount: 300, date: '2023-07-03' }
    ] as Payment[]
  }),
  actions: {
    getPaymentsForUser(userId: number) {
      return this.payments.filter((payment) => payment.userId === userId)
    },
    addPayment(payment: Payment) {
      this.payments.push(payment)
    },
    deletePaymentsForUser(userId: number) {
      this.payments = this.payments.filter((payment) => payment.userId !== userId)
    }
  }
})
