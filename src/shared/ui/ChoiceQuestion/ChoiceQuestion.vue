<script setup lang="ts">
import Radiobutton from '../AppRadiobutton/Radiobutton.vue'
import AppText from '../AppText/AppText.vue'
import VStack from '../Stack/VStack/VStack.vue'

defineProps({
    question: {
        type: String,
        default: ''
    },
    answers: {
        type: Array<string>,
        default: []
    },
    groupNumber: {
        type: Number
    }
})
</script>

<template>
    <VStack align="start">
        <AppText class="question-text">{{ question }}</AppText>
        <Radiobutton class="answer-text" v-for="(question, index) in answers" :label=question :name=groupNumber?.toString() />
    </VStack>
</template>

<style>
.question-text {
    margin-bottom: 15px;
    margin-left: 10px;
}
</style>