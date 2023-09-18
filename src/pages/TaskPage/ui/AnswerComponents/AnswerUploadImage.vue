<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import UploadIcon from '@/shared/assets/icons/upload.svg'
import CloseIcon from '@/shared/assets/icons/close.svg'
import FullscreenIcon from '@/shared/assets/icons/full-screen.svg'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import { getVStack } from '@/shared/lib/helpers/getVStack'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useModal } from '@/shared/lib/hooks/useModal'
import { base64Src } from '@/shared/lib/helpers/base64Src'
import FullScreenImage from '@/shared/ui/Modals/FullScreenImage.vue'
import { isMobile } from 'mobile-device-detect'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import ComponentName from '@/shared/ui/ComponentName/ComponentName.vue'
import BorderIcon from '@/shared/assets/icons/border.svg'

interface AnswerUploadImageProps {
  name: string
  displayName: string
}

const props = defineProps<AnswerUploadImageProps>()

const currentTaskStore = useCurrentTaskStore()
const { setAnswer } = currentTaskStore
const { answer } = storeToRefs(currentTaskStore)
const [isVisible, { closeModal, openModal }] = useModal()
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
    setAnswer(props.name, result.split(',')[1])
  }
}

const clearImage = () => {
  setAnswer(props.name, '')
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
  <VStack align="start" gap="4">
    <ComponentName :name="displayName" />
    <VStack max align="start" gap="16">
      <VStack max align="center" justify="center" class="image-container">
        <button
          v-if="answer[name]"
          @click="clearImage"
          :class="['close-btn', getVStack({ max: true, align: 'center', justify: 'center' })]"
        >
          <CloseIcon />
        </button>
        <label
          for="image"
          :class="['image-label', getVStack({ align: 'center', justify: 'center' })]"
        >
          <VStack v-if="!answer[name]" gap="10">
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
        <img v-if="answer[name]" class="upload-image" :src="base64Src(answer[name])" />
        <button
          v-if="answer[name] && !isMobile"
          @click="openModal"
          :class="['fullscreen-btn', getVStack({ max: true, align: 'center', justify: 'center' })]"
        >
          <FullscreenIcon />
        </button>
        <BorderIcon class="border" />
      </VStack>
      <AppText v-if="fileName" weight="500" variant="secondary">Загружено: {{ fileName }}</AppText>
      <FullScreenImage :open="isVisible" :on-close="closeModal" :image="base64Src(answer[name])" />
    </VStack>
  </VStack>
</template>

<style scoped lang="scss">
@import '@/shared/styles/mixins';
.image-container {
  position: relative;
  height: 485px;
  @include mobile {
    height: 280px;
  }
}

.upload-icon {
  width: 70px;
  height: 70px;
}

.image-label {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-size: cover;
}

.border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
}
</style>
