<script setup lang="ts">
import AppButton from "../AppButton/AppButton.vue"
const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    numQuestions: {
        type: Number,
        default: 0
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })
</script>

<template>
    <div class="task">
        <div class="text-info">
            <p class="title">{{ title }}</p>
            <p class="task-description">{{ description }}</p>
        </div>
            <AppButton label="Приступить" class="begin-btn"/>
            <p class="number-of-questions">Количество вопросов: {{ numQuestions }}</p>
    </div>
</template>

<style>
.task {
    width: 930px;
    height: 150px;
    border-radius: 20px;
    position: relative;
    background-color: var(--background-color-secondary);
    font-family: var(--font-family);
}
.text-info {
    position: absolute;
    height: 100px;
    width: 455px;
    left: 95px;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    word-break: break-word;
}
.title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 12.33px;
}
.task-description {
    font-weight: normal;
    font-size: 14px;
}
.begin-btn {
    position: absolute;
    right: 80px;
    top: 20px;
    height: fit-content;
}
.number-of-questions {
    position: absolute;
    top: 90px;
    right: 135px;
    opacity: 60%;
}
</style>