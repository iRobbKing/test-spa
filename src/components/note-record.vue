<template>
  <div class="note-wrapper">
    <div class="note-data note-title">Note: {{ note.title }}</div>
    <div class="note-data note-todos">Todos: {{ printTodos(note) }}</div>
    <img class="note-date note-action-1 note-action" src="pencil.png" alt="" @click="editNote(note.id)">
    <img class="note-date note-action" src="eraser.png" alt=""  @click="askDeleteNote(index)">
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
