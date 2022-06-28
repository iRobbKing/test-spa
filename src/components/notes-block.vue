<template>
  <div class="notes-wrapper">
    <h1>Notes</h1>
    <note-record
        v-for="note in notes"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :todos="note.todos"
        @delete="deleteNote"
    />
    <button @click="createNote">Создать</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import NoteRecord from '@/components/note-record'

const route = useRoute()
const notes = ref([])

onMounted(() => {
  const storedNotes = localStorage.getItem('notes')

  if (storedNotes !== null)
    notes.value = JSON.parse(storedNotes)
  else
    localStorage.setItem('notes', JSON.stringify([]))
})

function deleteNote(id) {
  notes.value = notes.value.filter(note => note.id !== id)
  localStorage.setItem('notes', JSON.stringify(Object.assign([], notes.value)))
}

const router = useRouter()

function createNote() {
  const index = notes.value.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0) + 1
  router.push({name: 'edit', params: {id: index}})
}
</script>

<style scoped>
.notes-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: clamp(200px, 65vw, 1200px);
  white-space: nowrap;
}

button {
  margin: 2vw;
  padding: .2vh 2vw;
}
</style>
