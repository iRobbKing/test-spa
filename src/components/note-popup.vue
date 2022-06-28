<template>
  <teleport to="body">
    <div class="modal">
      <slot></slot>
    </div>
  </teleport>
</template>

<style scoped>
@keyframes animate-dialog {
  from {
    top: 20%;
    opacity: 0;
  }

  to {
    top: 50%;
    opacity: 1;
  }
}

.modal {
  position: fixed;
  background-color: white;
  border-radius: 2rem;
  box-shadow: 4px 4px 4px grey;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: clamp(250px, 40vw, 1200px);
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-duration: .5s;
  animation-name: animate-dialog;
}
</style>
