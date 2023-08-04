<template>
  <div v-if="!isLoading" class="swiper-container">
    <swiper-container navigation-next-el="#my-next-button" navigation-prev-el="#my-prev-button">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img class="img" :src="image" alt="slider" />
      </swiper-slide>
    </swiper-container>
    <button id="my-next-button"><ArrowRight width="22" class="arrow" /></button>
    <button id="my-prev-button">
      <ArrowLeft class="arrow" width="22" />
    </button>
  </div>
  <AppSkeleton class="swiper-skeleton" v-else />
</template>

<script setup lang="ts">
import { Navigation } from 'swiper/modules'
import { register } from 'swiper/element/bundle'
import './ImageSwiper.css'
import { onMounted, type PropType } from 'vue'
type SwiperRef = HTMLElement & { initialize: () => void }
import ArrowLeft from '@/shared/assets/icons/arrow_left.svg'
import ArrowRight from '@/shared/assets/icons/arrow_right.svg'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'

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
}

.swiper-skeleton {
  width: 850px;
  height: 485px;
}

.img {
  width: 100%;
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
  outline: none;
  border: none;
  z-index: 10;
}

.arrow {
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
