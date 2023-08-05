<template>
  <div v-if="!isLoading" class="swiper-container">
    <swiper-container navigation-next-el="#my-next-button" navigation-prev-el="#my-prev-button">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img class="img" :src="`data:image/jpeg;base64,${image}`" alt="slider" />
      </swiper-slide>
    </swiper-container>
    <button id="my-next-button">
      <ArrowRight width="22" class="arrow" />
    </button>
    <button id="my-prev-button">
      <ArrowLeft class="arrow" width="22" />
    </button>
    <button
      @click="open"
      :class="['full-screen-btn', getVStack({ max: true, align: 'center', justify: 'center' })]"
    >
      <FullScreenIcon />
    </button>
    <FullScreenImage
      :open="isOpen"
      :on-close="close"
      :image="`data:image/jpeg;base64,${images?.[currentImage]}`"
    />
  </div>
  <AppSkeleton class="swiper-skeleton" v-else />
</template>

<script setup lang="ts">
import { Navigation } from 'swiper/modules'
import { register } from 'swiper/element/bundle'
import './ImageSwiper.css'
import { onMounted, type PropType, ref } from 'vue'
type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void }
import ArrowLeft from '@/shared/assets/icons/arrow_left.svg'
import ArrowRight from '@/shared/assets/icons/arrow_right.svg'
import FullScreenIcon from '@/shared/assets/icons/full-screen.svg'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
import { getVStack } from '@/shared/lib/helpers/getVStack'
import FullScreenImage from '@/shared/ui/FullScreenImage/FullScreenImage.vue'
import { Swiper } from 'swiper/types'

const isOpen = ref(false)
const currentImage = ref(0)
const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

defineProps({
  images: {
    type: Array as PropType<string[]>
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {
  register()
  const swiperEl = document.querySelector('swiper-container') as SwiperRef

  const params = {
    modules: [Navigation]
  }

  swiperEl.addEventListener('slidechange', () => {
    currentImage.value = swiperEl.swiper.activeIndex
  })

  if (swiperEl) {
    Object.assign(swiperEl, params)

    swiperEl.initialize()
  }
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

#my-next-button,
#my-prev-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 85px;
  background: rgba(37, 37, 37, 0.7);
  z-index: 10;
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
