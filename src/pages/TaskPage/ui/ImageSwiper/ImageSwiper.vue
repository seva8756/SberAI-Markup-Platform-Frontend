<template>
  <AppSkeleton class="swiper-skeleton" v-if="isLoading" />
  <VStack gap="24" v-else>
    <div class="swiper-container">
      <swiper-container
        :navigation-next-el="isNavigationAvailable ? '#my-next-button' : false"
        :navigation-prev-el="isNavigationAvailable ? '#my-prev-button' : false"
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img class="img" :src="base64Image(image)" alt="slider" />
        </swiper-slide>
      </swiper-container>

      <template v-if="isNavigationAvailable">
        <button id="my-next-button">
          <ArrowRight width="22" class="arrow" />
        </button>
        <button id="my-prev-button">
          <ArrowLeft class="arrow" width="22" />
        </button>
      </template>

      <button
        @click="open"
        :class="['full-screen-btn', getVStack({ max: true, align: 'center', justify: 'center' })]"
      >
        <FullScreenIcon />
      </button>
      <FullScreenImage
        :open="isOpen"
        :on-close="close"
        :image="base64Image(images?.[currentImageIndex])"
      />
    </div>
    <HStack v-if="isNavigationAvailable" gap="10" class="pagination">
      <span
        v-for="(n, index) in images.length"
        :key="index"
        :class="['bullet', { 'bullet-active': index === currentImageIndex }]"
      ></span>
    </HStack>
  </VStack>
</template>

<script setup lang="ts">
import { computed, onMounted, type PropType, ref } from 'vue'
import ArrowLeft from '@/shared/assets/icons/arrow_left.svg'
import ArrowRight from '@/shared/assets/icons/arrow_right.svg'
import FullScreenIcon from '@/shared/assets/icons/full-screen.svg'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
import { getVStack } from '@/shared/lib/helpers/getVStack'
import FullScreenImage from '@/shared/ui/FullScreenImage/FullScreenImage.vue'
import testImage from '@/shared/assets/testSlider.png'
import './ImageSwiper.css'
import { initSwiper } from '../../lib/initSwiper'
import type { SwiperRef } from '../../model/types/swiper'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'

const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)
const currentImageIndex = ref(0)
const swiperRef = ref<SwiperRef | null>(null)
const base64Image = computed(() => {
  return (code?: string) => (code ? `data:image/jpeg;base64,${code}` : testImage)
})
const isNavigationAvailable = computed(() => {
  return props.images && props.images?.length > 1
})

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const onChangeImage = (index: number) => {
  currentImageIndex.value = index
}

onMounted(() => {
  swiperRef.value = initSwiper(onChangeImage)
})
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 850px;
  height: 485px;
}

.swiper-skeleton {
  width: 850px;
  height: 485px;
}

.img {
  width: 850px;
  height: 485px;
  object-fit: cover;
}

.pagination {
}

.bullet {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--gray-secondary);
}

.bullet-active {
  background: var(--accent-color);
}

#my-next-button,
#my-prev-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 85px;
  background: rgba(37, 37, 37, 0.7);
  z-index: 10;
  cursor: pointer;
  transition: var(--transition-opacity);
  &:hover {
    opacity: 0.8;
  }
}

.full-screen-btn {
  position: absolute;
  right: 11px;
  bottom: 11px;
  width: 38px;
  height: 38px;
  border-radius: 15px;
  z-index: 10;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.7);
  transition: var(--transition-opacity);
  &:hover {
    opacity: 0.8;
  }
}

#my-prev-button {
  left: 0;
  border-radius: 0 23px 23px 0;
}

#my-next-button {
  right: 0;
  border-radius: 23px 0 0 23px;
}
</style>
