<script setup lang="ts">
import AppOverlay from '@/shared/ui/Overlay/AppOverlay.vue'
import CloseIcon from '../../assets/icons/close.svg'

interface ModalProps {
  open?: boolean
  onClose?: () => void
}

defineProps<ModalProps>()
</script>

<template>
  <teleport to="body">
    <div :class="['Modal', { opened: open }]">
      <AppOverlay :on-click="onClose" />
      <div class="content">
        <slot />
        <CloseIcon @click="onClose" class="close" />
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.Modal {
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  opacity: 0;
  pointer-events: none;
  bottom: 0;
  position: fixed;
  z-index: var(--modal-z-index);
}

.content {
  position: relative;
  max-width: 60%;
  background: var(--gray-secondary);
  border: 2px solid var(--accent-color);
  color: var(--text-color);
  padding: 30px 45px;
  border-radius: 20px;
}

.close {
  position: absolute;
  right: 20px;
  top: 25px;
  cursor: pointer;
}

.opened {
  pointer-events: auto;
  opacity: 1;
}
</style>
