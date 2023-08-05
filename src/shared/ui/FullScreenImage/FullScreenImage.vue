<script setup lang="ts">
import AppOverlay from '../Overlay/AppOverlay.vue'
interface FullScreenImageProps {
  open?: boolean
  onClose?: () => void
  image: string
}
defineProps<FullScreenImageProps>()
</script>

<template>
  <teleport to="body">
    <div :class="['full-screen', { opened: open }]">
      <AppOverlay :on-click="onClose" />
      <img class="image" :src="image" alt="full-screen" />
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.full-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  z-index: var(--modal-z-index);
  transition: opacity 0.3s;
}

.opened {
  pointer-events: auto;
  opacity: 1;
}

.image {
  max-width: 60%;
  max-height: 90%;
}
</style>
