<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePaymentStore } from '@/stores/paymentStore'
import { Payment } from '@/types/types'
import PaymentDetailsModal from '@/components/PaymentDetailsModal.vue'

export default defineComponent({
  components: {
    PaymentDetailsModal
  },
  setup() {
    const paymentsStore = usePaymentStore()
    const payments = paymentsStore.payments
    const selectedPayment = ref<Payment | null>(null)
    const isModalOpen = ref(false)

    const showPaymentDetails = (payment: Payment) => {
      selectedPayment.value = payment
      isModalOpen.value = true
    }

    return {
      payments,
      selectedPayment,
      isModalOpen,
      showPaymentDetails
    }
  }
})
</script>

<template>
  <div>
    <div v-for="payment in payments" :key="payment.id" class="payment-item">
      <h3>{{ payment.title }}</h3>
      <p>Сумма: {{ payment.amount }}</p>
      <p>Дата: {{ payment.date }}</p>
      <button @click="showPaymentDetails(payment)" class="btn btn-primary">Подробнее</button>
    </div>

    <PaymentDetailsModal
      :payment="selectedPayment"
      :isOpen="isModalOpen"
      @update:isOpen="isModalOpen = $event"
    />
  </div>
</template>

<style scoped>
.payment-item {
  margin-bottom: 20px;
}
</style>
