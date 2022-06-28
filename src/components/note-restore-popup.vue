<template>
  <note-popup>
    <p>Вы действительно хотите отменить изменения?</p>
    <button @click="$emit('restore')">Yes</button>
    <button @click="$emit('close')">No</button>
  </note-popup>
</template>

<script setup>
import NotePopup from '@/components/note-popup'

const emits = defineEmits(['restore', 'close'])
</script>

<style scoped>

</style>
