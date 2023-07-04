<script lang="ts">
import { defineComponent } from 'vue'
import PaymentList from '@/components/PaymentList.vue'

export default defineComponent({
  components: {
    PaymentList
  }
})
</script>

<template>
  <div>
    <h1>Страница Платежей</h1>
    <PaymentList />
  </div>
</template>
