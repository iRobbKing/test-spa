<template>
  <span>
    <input type="text" v-model="todo">
    <note-action class="edit-img" src="check.png" @click="create"/>
  </span>
</template>

<script setup>
import {ref} from 'vue'
import NoteAction from '@/components/note-action'

const props = defineProps({init: String})
const emits = defineEmits(['created', 'close'])

const todo = ref(props.init ?? '')

function create() {
  emits('created', todo.value)
  todo.value = ''
}
</script>

<style scoped>
input {
  font-size: 20px;
  margin: 1vw;
}

.edit-img {
  font-size: 30px;
  margin-left: 2vw;
}
</style>
