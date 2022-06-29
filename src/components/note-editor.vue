<template>
  <div class="editor-wrapper">
    <note-editor-title class="note-title" :title="editedNote.title" @change="changeTitle"/>
    <note-editor-todo
        v-for="(todo, index) in editedNote.todos"
        :key="index"
        :id="index"
        :checked="todo.checked"
        :task="todo.task"
        @checked="checkTodo"
        @changed="changeTodo"
        @deleted="deleteTodo"
    />
    <note-editor-creator @created="addTodoTask"/>
    <div class="editor-restore-actions">
      <button @click="restoreNotePopupOpened = true">Отменить действия</button>
      <button @click="saveNote">Сохранить действия</button>
    </div>
    <div class="editor-restore-actions">
      <button @click="inverse">Отменить последние действиe</button>
      <button @click="restore">Вернуть последние действиe</button>
    </div>
    <div class="editor-restore-actions">
      <button @click="deletePopupOpened = true">Удалить</button>
      <button @click="$router.push({name: 'home'})">На главную</button>
    </div>
  </div>

  <note-restore-popup
      v-if="restoreNotePopupOpened"
      @restore="restoreNote"
      @close="restoreNotePopupOpened = false"
  />

  <note-delete-popup
      v-if="deletePopupOpened"
      what="заметку"
      :title="editedNote.title"
      @delete="deleteNote"
      @close="deletePopupOpened = false"
  />
</template>

<script setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useCommands from '@/composables/use-commands'
import NoteRestorePopup from '@/components/note-restore-popup'
import NoteEditorTitle from '@/components/note-editor-title'
import NoteEditorCreator from '@/components/note-editor-creator'
import NoteEditorTodo from '@/components/note-editor-todo'
import NoteDeletePopup from '@/components/note-delete-popup'

const route = useRoute()
const router = useRouter()

function loadNote() {
  const notes = localStorage.getItem('notes')
  if (notes === null)
    router.push({name: 'home'})

  const parsedNote = JSON.parse(notes).find(note => note.id === parseInt(route.params.id))
  if (parsedNote === undefined)
    return {id: parseInt(route.params.id), title: '', todos: []}

  return parsedNote
}

const editedNote = ref(loadNote())

const {addCommands, inverse, restore, clearCommands} = useCommands()

function changeTitle(newTitle) {
  const oldTitle = editedNote.value.title

  const inverseCommand = () => editedNote.value.title = oldTitle
  const restoreCommand = () => editedNote.value.title = newTitle

  addCommands(inverseCommand, restoreCommand)
  restoreCommand()
}

function checkTodo(index, checked) {
  const inverseCommand = () => editedNote.value.todos[index].checked = !checked
  const restoreCommand = () => editedNote.value.todos[index].checked = checked

  addCommands(inverseCommand, restoreCommand)
  restoreCommand()
}

function changeTodo(index, oldTask, newTask) {
  const inverseCommand = () => editedNote.value.todos[index].task = oldTask
  const restoreCommand = () => editedNote.value.todos[index].task = newTask

  addCommands(inverseCommand, restoreCommand)
  restoreCommand()
}

function deleteTodo(index) {
  const todos = editedNote.value.todos
  const value = todos[index]
  const inverseCommand = () => todos.splice(index, 0, value)
  const restoreCommand = () => todos.splice(index, 1)

  addCommands(inverseCommand, restoreCommand)
  restoreCommand()
}

function addTodoTask(task) {
  const inverseCommand = () => editedNote.value.todos.pop()
  const restoreCommand = () => editedNote.value.todos.push({checked: false, task})

  addCommands(inverseCommand, restoreCommand)
  restoreCommand()
}

const restoreNotePopupOpened = ref(false)

function restoreNote() {
  restoreNotePopupOpened.value = false

  const original = loadNote()
  editedNote.value.id = original.id
  editedNote.value.title = original.title
  editedNote.value.todos = original.todos

  clearCommands()
}

function saveNote() {
  const note = {
    id: editedNote.value.id,
    title: editedNote.value.title,
    todos: Object.assign([], editedNote.value.todos),
  }
  const notes = JSON.parse(localStorage.getItem('notes'))
  const index = notes.findIndex(n => parseInt(n.id) === note.id)

  if (index === -1) {
    localStorage.setItem('notes', JSON.stringify([...notes, note]))
  } else {
    notes[index] = note
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  router.push({name: 'home'})
}

const deletePopupOpened = ref(false)

function deleteNote() {
  const notes = localStorage.getItem('notes')
  if (notes === null)
    return

  const data = JSON.parse(notes).filter(note => note.id !== editedNote.value.id)
  localStorage.setItem('notes', JSON.stringify(data))

  router.push({name: 'home'})
}
</script>

<style scoped>
button {
  padding: 0 1vw;
}

.editor-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: clamp(200px, 70%, 1200px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.editor-restore-actions {
  width: 80%;
  margin: 1vw;
  display: flex;
  justify-content: space-around;
}
</style>
