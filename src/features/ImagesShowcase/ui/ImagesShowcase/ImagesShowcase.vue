<script setup lang="ts">
import { computed, type PropType, ref } from 'vue'
import testImage from '@/shared/assets/testSlider.png'
import FullScreenImageSwiper from '../FullScreenImageSwiper/FullScreenImageSwiper.vue'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
import NoImagesBlock from '../NoImagesBlock/NoImagesBlock.vue'

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

const base64Image = computed(() => {
  return (code?: string) => (code ? `data:image/jpeg;base64,${code}` : testImage)
})

const isOpen = ref(false)
const currentImageIndex = ref(0)
const open = (index: number) => {
  currentImageIndex.value = index
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <AppSkeleton class="wrapper" v-if="isLoading" />
  <template v-else>
    <div class="wrapper">
      <NoImagesBlock v-if="images.length === 0" />
      <div v-else class="grid">
        <div class="img-wrapper" v-for="(image, index) in images" :key="index">
          <img @click="open(index)" class="img" :src="base64Image(image)" alt="grid" />
          <img class="img-blur" :src="base64Image(image)" alt="grid" />
        </div>
      </div>
    </div>
  </template>

  <FullScreenImageSwiper :images="images" :open="isOpen" :on-close="close" />
</template>

<style scoped lang="scss">
@import '@/shared/styles/mixins';
.wrapper {
  width: 849px;
  height: 483px;

  @include laptop {
    width: 700px;
    height: 420px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(415px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(232px, 1fr));
  width: 100%;
  height: 100%;
  gap: 18px;
}

.img-wrapper {
  position: relative;
  width: 100%;
}

.img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 3;
  backdrop-filter: blur(30px);
}

.img-blur {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-skeleton {
  width: 850px;
  height: 485px;
}
</style>
