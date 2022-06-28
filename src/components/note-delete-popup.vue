<template>
  <note-popup>
    <p>Вы действительно хотите удалить {{ what }}: {{ title }}?</p>
    <div>
      <button @click="$emit('delete')">Да</button>
      <button @click="$emit('close')">Нет</button>
    </div>
  </note-popup>
</template>

<script setup>
import NotePopup from '@/components/note-popup'

const props = defineProps({
  what: String,
  title: String,
})

const emits = defineEmits(['delete', 'close'])
</script>

<style scoped>
button {
  margin: 2vw;
  padding: .2vh 2vw;
}
</style>
