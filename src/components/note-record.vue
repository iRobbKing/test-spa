<template>
  <div class="note-wrapper">
    <div>{{ title }}</div>
    <div class="note-todos">Задания: {{ formattedTodos }}</div>
    <div>
      <note-action class="note-data" src="pencil.png" alt="" @click="goToNoteEditor(id)"/>
      <note-action class="note-data" src="eraser.png" alt=""  @click="deletePopupOpened = true"/>
    </div>
  </div>

  <note-delete-popup
      v-if="deletePopupOpened"
      what="заметку"
      :title="title"
      @delete="$emit('delete', id)"
      @close="deletePopupOpened = false"
  />
</template>

<script setup>
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import NoteDeletePopup from '@/components/note-delete-popup'
import NoteAction from '@/components/note-action'

const props = defineProps({id: Number, title: String, todos: Array})
const emits = defineEmits(['delete'])
const router = useRouter()
const formattedTodos = computed(() => props.todos.map(todo => todo.task).join(', '))
const deletePopupOpened = ref(false)

function goToNoteEditor(id) {
  router.push({name: 'edit', params: {id}})
}
</script>

<style scoped>
.note-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 3vw;
  padding: 1.5vw;
  border-radius: 1rem;
  transition: all .5s;
}

.note-wrapper:hover {
  background-color: lightblue;
  transform: scale(1.2, 1.2);
}

.note-todos {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-data {
  margin-left: 20px;
}
</style>
