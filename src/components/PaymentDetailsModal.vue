<script lang="ts">
import { defineComponent } from 'vue'
import { Payment } from '@/types/types'

export default defineComponent({
  props: {
    payment: {
      type: Object as () => Payment | null,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:isOpen'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:isOpen', false)
    }

    return {
      closeModal
    }
  }
})
</script>

<template>
  <div class="modal" :class="{ 'is-open': isOpen }">
    <div class="modal-content">
      <h2>Детали платежа</h2>
      <p v-if="payment">
        <strong>Название: </strong> {{ payment.title }}
        <br />
        <strong>Сумма: </strong> {{ payment.amount }}
        <br />
        <strong>Дата: </strong> {{ payment.date }}
      </p>
      <button @click="closeModal" class="btn btn-secondary">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal.is-open {
  display: block;
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
