<script setup lang="ts">
import SideButton from '@/shared/ui/Buttons/SideButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppTextArea from '@/shared/ui/AppTextArea/AppTextArea.vue'

defineProps({
  taskId: {
    type: String,
    default: '*code*'
  }
})
</script>

<template>
  <SideButton orientation="left" />
  <SideButton orientation="right" />

  <div class="content-area">
    <VStack align="center" max gap="30">
      <AppText variant="primary" size="xl" weight="700">Напишите инструкцию к заданию</AppText>
      <AppText variant="secondary" size="m">Код задания: {{ taskId }}</AppText>
      <hr class="line" />
      <AppTextArea />
      <div class="create-button-container">
        <AppButton size="m">Создать</AppButton>
      </div>
    </VStack>
  </div>
</template>

<style scoped lang="scss">
.line {
  width: 100%;
  height: 3px;
  background: var(--hint-color-muted);
  border: none;
}

.create-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.content-area {
  width: 40%;
  height: auto;
  margin: 50px auto auto;
  align-content: center;
}

.create-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.input {
  height: 100px;
  width: 100%;
}
</style>
