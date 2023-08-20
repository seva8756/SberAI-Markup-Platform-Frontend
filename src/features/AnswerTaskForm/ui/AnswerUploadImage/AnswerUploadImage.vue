<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import UploadIcon from '@/shared/assets/icons/upload.svg'
import CloseIcon from '@/shared/assets/icons/close.svg'
import FullscreenIcon from '@/shared/assets/icons/full-screen.svg'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import { getVStack } from '@/shared/lib/helpers/getVStack'
import { useAnswerTaskStore } from '../../model/store/answerTaskStore'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useModal } from '@/shared/lib/hooks/useModal'
import { base64Src } from '@/shared/lib/helpers/base64Src'
import FullScreenImage from '@/shared/ui/Modals/FullScreenImage.vue'
import { isMobile } from 'mobile-device-detect'

const answerTaskStore = useAnswerTaskStore()
const [isVisible, { closeModal, openModal }] = useModal()
const { answer } = storeToRefs(answerTaskStore)
const { setAnswer } = answerTaskStore
const fileName = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const onChangeImage = (e: Event) => {
  e.preventDefault()
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  if (!file.type.includes('image')) {
    return alert('Please upload an image')
  }
  fileName.value = file.name
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    const result = reader.result as string
    setAnswer(result.split(',')[1])
  }
}

const clearImage = () => {
  setAnswer('')
  fileName.value = ''
  if (inputRef.value) inputRef.value.value = ''
}

watchEffect(() => {
  if (!answer?.value) {
    fileName.value = ''
  }
})
</script>

<template>
  <VStack max align="start" gap="16">
    <VStack max align="center" justify="center" class="image-container">
      <button
        v-if="answer"
        @click="clearImage"
        :class="['close-btn', getVStack({ max: true, align: 'center', justify: 'center' })]"
      >
        <CloseIcon />
      </button>
      <label
        for="image"
        :class="['image-label', getVStack({ align: 'center', justify: 'center' })]"
      >
        <VStack v-if="!answer" gap="10">
          <UploadIcon class="upload-icon" />
          <AppText variant="accent" :size="isMobile ? 'l' : 'xl'">Загрузить изображение</AppText>
        </VStack>
      </label>
      <input
        id="image"
        accept="image/*"
        className="form_image-input"
        ref="inputRef"
        type="file"
        @change="onChangeImage"
      />
      <img v-if="answer" class="upload-image" :src="base64Src(answer)" />
      <button
        v-if="answer && !isMobile"
        @click="openModal"
        :class="['fullscreen-btn', getVStack({ max: true, align: 'center', justify: 'center' })]"
      >
        <FullscreenIcon />
      </button>
    </VStack>
    <AppText v-if="fileName" weight="500" variant="secondary">Загружено: {{ fileName }}</AppText>
    <FullScreenImage :open="isVisible" :on-close="closeModal" :image="base64Src(answer)" />
  </VStack>
</template>

<style scoped lang="scss">
@import '@/shared/styles/mixins';
.image-container {
  position: relative;
  width: 715px;
  aspect-ratio: 16 /9;
}

.form_image-input {
}

.upload-icon {
  width: 226px;
  height: 226px;
}

.image-label {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-size: cover;
  background: url('@/shared/assets/icons/border.svg') no-repeat;
}

.form_image-input {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  cursor: pointer;
  z-index: 10;
  background: #000000b2;
}

.fullscreen-btn {
  position: absolute;
  width: 38px;
  height: 38px;
  bottom: 20px;
  right: 20px;
  border-radius: 15px;

  cursor: pointer;
  z-index: 10;
  background: #000000b2;
}

.upload-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@include mobile {
  .image-container {
    width: 100%;
  }
  .upload-icon {
    width: 85px;
    height: 85px;
  }
}
</style>
