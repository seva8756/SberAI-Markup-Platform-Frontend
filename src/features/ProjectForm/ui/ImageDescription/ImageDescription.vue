<script setup lang="ts">
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'

defineProps({
    imageSource:{
        type: String,
        default: ''
    }
})
</script>

<template>
    <VStack>
        <img :src=imageSource class="image"/>
        <AppInput placeholder="Опишите изображение..." class="image-description" size="large"/>
    </VStack>
</template>

<style>
.image-description {
}
.image {
    margin-top: 25px;
    margin-bottom: 80px;
}
</style>