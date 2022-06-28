<template>
  <div>
    <span>Заметка:</span>
    <span v-if="!editingTitle">
      {{ title }}
      <note-action src="pencil.png" @click="editingTitle = !editingTitle"/>
    </span>
    <span v-else>
      <note-editor-creator :init="title" @created="change"/>
      <note-action class="edit-img" src="close.png" @click="editingTitle = !editingTitle"/>
    </span>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import NoteEditorCreator from '@/components/note-editor-creator'
import NoteAction from '@/components/note-action'

const props = defineProps({title: String})
const emits = defineEmits(['change'])

const editingTitle = ref(false)

function change(newTitle) {
  editingTitle.value = false
  emits('change', newTitle)
}
</script>

<style scoped>
div {
  font-size: 2rem;
}

.edit-img {
  margin-left: 2vw;
}
</style>
