<template>
  <div>
    <div class="todo-wrapper" v-if="!editingTodo">
      <span>
        <input type="checkbox" class="note-checked" :checked="checked" @change="$emit('checked', id, !checked)">
        <span>{{ task }}</span>
        <note-action src="pencil.png" @click="editingTodo = true"/>
        <note-action src="eraser.png" @click="deleteTodoPopupOpened = true"/>
      </span>
    </div>
    <div class="todo-wrapper-editing" v-else>
      <input type="checkbox" disabled>
      <note-editor-creator :init="task" @created="editTodo"/>
      <note-action src="close.png" @click="editingTodo = !editingTodo"/>
    </div>
  </div>

  <note-delete-popup
      v-if="deleteTodoPopupOpened"
      what="задание"
      :title="task"
      @delete="deleteTodo"
      @close="deleteTodoPopupOpened = false"
  />
</template>

<script setup>
import {ref} from 'vue'
import NoteDeletePopup from '@/components/note-delete-popup'
import NoteEditorCreator from '@/components/note-editor-creator'
import NoteAction from '@/components/note-action'

const props = defineProps({id: Number,checked: Boolean, task: String})
const emits = defineEmits(['checked', 'changed', 'deleted'])

const editingTodo = ref(false)

function editTodo(newTask) {
  emits('changed', props.id, props.task, newTask)
  editingTodo.value = false
}

const deleteTodoPopupOpened = ref(false)

function deleteTodo() {
  emits('deleted', props.id)
  deleteTodoPopupOpened.value = false
}
</script>

<style scoped>
.todo-wrapper {
  font-size: 30px;
}

span * {
  margin-left: 2vw;
}

.todo-wrapper-editing * {
  font-size: 30px;
  margin-left: 2vw;
}

.note-checked:checked + span {
  text-decoration: line-through;
}
</style>
