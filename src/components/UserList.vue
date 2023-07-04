<script lang="ts">
import { defineComponent } from 'vue'

import TodoListModal from './TodoListModal.vue'
import EditUserModal from './EditUserModal.vue'

import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  components: {
    TodoListModal,
    EditUserModal
  },
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  }
})
</script>

<template>
  <div class="mx-auto w-75">
    <h1 class="mt-4">Список пользователей</h1>
    <div v-for="user in userStore.users" :key="user.id" class="mb-4 border rounded p-2">
      <div class="mb-2">
        <span>Имя: {{ user.name }}</span>
      </div>
      <div class="mb-2">
        <span>Почта: {{ user.email }}</span>
      </div>
      <div class="mb-2">
        <span>Телефон: {{ user.phone }}</span>
      </div>
      <div class="d-flex gap-1">
        <button @click="userStore.deleteUser(user.id)" class="btn btn-danger">Удалить</button>
        <button @click="userStore.editUser(user)" class="btn btn-primary">Редактировать</button>
        <button @click="userStore.showTodoListModal(user)" class="btn btn-secondary">
          Список задач
        </button>
      </div>
      <TodoListModal
        :user="user"
        v-if="userStore.selectedUser === user && userStore.showModal"
        @close="userStore.closeModal"
      />
      <EditUserModal
        v-if="userStore.selectedUser === user && userStore.showEditModal"
        @close="userStore.closeModal"
        @update="userStore.updateUser"
      />
    </div>
    <button @click="userStore.showAddUserModal" class="btn btn-primary">
      Добавить пользователя
    </button>

    <div v-if="userStore.isAddUserModalVisible" class="modal fade show" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Добавить пользователя</h5>
            <button type="button" class="btn-close" @click="userStore.hideAddUserModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-2">
              <input
                type="text"
                v-model="userStore.newUserName"
                class="form-control"
                placeholder="Имя пользователя"
              />
            </div>
            <div class="mb-2">
              <input
                type="email"
                v-model="userStore.newUserEmail"
                class="form-control"
                placeholder="Email пользователя"
              />
            </div>
            <div class="mb-2">
              <input
                type="tel"
                v-model="userStore.newUserPhone"
                class="form-control"
                placeholder="Номер телефона пользователя"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="userStore.hideAddUserModal">
              Отмена
            </button>
            <button type="button" class="btn btn-primary" @click="userStore.addUser">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userStore.isAddUserModalVisible" class="modal-backdrop fade show"></div>
  </div>
</template>

<style>
h1 {
  font-size: 24px;
}

.btn {
  margin-top: 8px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal.fade.show {
  display: block;
}
</style>
