<script setup lang="ts">
import ChoiceQuestion from '@/shared/ui/ChoiceQuestion/ChoiceQuestion.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'

defineProps({
    imageSource: {
        type: String,
        default: ''
    },
    questions: {
        type: Array<string>,
        default: []
    },
    answers: {
        type: Array<Array<string>>,
        default: []
    }
})
</script>

<template>
    <VStack max justify="center">
        <img :src=imageSource class="image"/>
        <ChoiceQuestion v-for="(question, index) in questions" :question=question :answers=answers[index] :groupNumber=index class="question"/>
    </VStack>
</template>

<style>
.image {
    margin-top: 25px;
    margin-bottom: 80px;
}

.question {
    align-self: start;
    margin-bottom: 50px;
}
</style>