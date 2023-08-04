<script setup lang="ts">
import ImageDescription from '../ImageDescription/ImageDescription.vue'
import MultipleChoice from '../MultipleChoice/MultipleChoice.vue'
import FirstTask from '../FirstTask/FirstTask.vue'
import { QuestionType } from '../../const/const'
import type { PropType } from 'vue'
import { type Task } from '../../const/const'

defineProps({
    task: {
        type: Object as PropType<Task>
    }
})
</script>

<template>
    <FirstTask v-if="task?.taskType === QuestionType.FIRST" :description=task?.description />
    <ImageDescription v-if="task?.taskType === QuestionType.DESCRIPTION" :imageSource=task?.imageUrl />
    <MultipleChoice v-else :questions=task?.questions :answers=task?.answers :imageSource=task?.imageUrl />
</template>

<style>

</style>