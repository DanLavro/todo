<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const editMode = ref(false)
    const editName = ref('')

    const toggleTaskDone = () => {
      props.task.done = !props.task.done
    }

    const editTask = () => {
      editMode.value = true
      editName.value = props.task.name
    }

    const saveTaskEdit = () => {
      if (editName.value.trim() === '') {
        return
      }
      props.task.name = editName.value
      editMode.value = false
    }

    const cancelTaskEdit = () => {
      editMode.value = false
    }

    return {
      editMode,
      editName,
      toggleTaskDone,
      editTask,
      saveTaskEdit,
      cancelTaskEdit
    }
  }
})
</script>

<template>
  <li>
    <div class="d-flex align-items-center">
      <input type="checkbox" :checked="task.done" @input="toggleTaskDone" />
      <span :class="{ 'task-done': task.done }">{{ task.name }}</span>
      <button class="btn btn-sm btn-danger ms-2" @click="$emit('delete')">Удалить</button>
    </div>
    <div v-if="editMode">
      <input type="text" v-model="editName" class="form-control mt-2" />
      <div class="d-flex justify-content-end mt-2">
        <button class="btn btn-sm btn-primary me-2" @click="saveTaskEdit">Сохранить</button>
        <button class="btn btn-sm btn-secondary" @click="cancelTaskEdit">Отмена</button>
      </div>
    </div>
    <div v-else>
      <button class="btn btn-sm btn-secondary" @click="editTask">Редактировать</button>
    </div>
  </li>
</template>

<style>
.task-done {
  text-decoration: line-through;
}
</style>
