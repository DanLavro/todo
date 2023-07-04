<script lang="ts">
import { defineComponent, ref } from 'vue'
import TaskItem from './TaskItem.vue'

export default defineComponent({
  components: {
    TaskItem
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const newTaskName = ref('')

    const closeModal = () => {
      emit('close')
    }

    const deleteTask = (index) => {
      props.user.tasks.splice(index, 1)
    }

    const updateTask = (index, updatedTask) => {
      props.user.tasks[index] = updatedTask
    }

    const addTask = () => {
      const newTaskNameValue = newTaskName.value.trim()
      if (newTaskNameValue === '') {
        return
      }
      const newTask = {
        id: props.user.tasks.length + 1,
        name: newTaskNameValue,
        done: false
      }
      props.user.tasks.push(newTask)
      newTaskName.value = ''
    }

    return {
      newTaskName,
      closeModal,
      deleteTask,
      updateTask,
      addTask
    }
  }
})
</script>

<template>
  <div class="modal fade show" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Список задач пользователя {{ user.name }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <ul>
            <task-item
              v-for="(task, index) in user.tasks"
              :key="task.id"
              :task="task"
              @delete="deleteTask(index)"
              @update="updateTask(index, $event)"
            />
          </ul>
          <div class="mt-3">
            <input
              type="text"
              v-model="newTaskName"
              class="form-control"
              placeholder="Новая задача"
            />
            <button class="btn btn-sm btn-primary mt-2" @click="addTask">Добавить задачу</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" @click="closeModal"></div>
</template>
