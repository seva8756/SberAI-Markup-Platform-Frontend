<script setup lang="ts">
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppTextArea from '@/shared/ui/AppTextArea/AppTextArea.vue'

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
        <AppTextArea placeholder="Опишите изображение..." backgroundType="filled"></AppTextArea>
    </VStack>
</template>

<style>
.image {
    margin-top: 25px;
    margin-bottom: 80px;
}
</style>