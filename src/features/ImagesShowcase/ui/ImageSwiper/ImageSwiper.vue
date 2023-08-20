<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initSwiper } from '../../lib/initSwiper'
import { SwiperRef } from '../../model/types/swiper'
import SwiperPagination from '../SwiperPagination/SwiperPagination.vue'
import { base64Src } from '@/shared/lib/helpers/base64Src'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'

interface ImageSwiperProps {
  images: string[]
  isLoading?: boolean
}
const props = defineProps<ImageSwiperProps>()

const swiperRef = ref<SwiperRef | null>(null)
const currentImageIndex = ref(0)

const onChangeImage = (index: number) => {
  currentImageIndex.value = index
}

onMounted(() => {
  swiperRef.value = initSwiper(onChangeImage)
})
</script>

<template>
  <AppSkeleton class="wrapper" v-if="isLoading" />
  <swiper-container class="wrapper" v-else>
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img class="img" :src="base64Src(image)" alt="slider" />
    </swiper-slide>
  </swiper-container>

  <SwiperPagination :image-length="images.length" :current-index="currentImageIndex" />
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 217px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>