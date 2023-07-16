<script setup lang="ts">
import TaskContent from '../TaskContent/TaskContent.vue'
import AppText from '@/shared/ui/AppText/AppText.vue'
import Navbar from '@/widgets/ui/Navbar/Navbar.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import SideButton from '@/shared/ui/Buttons/SideButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { QuestionType } from '@/features/ProjectForm/const/const'
import { type Task } from '@/features/ProjectForm/const/const'
import { ref, onMounted } from 'vue';

const tasks: Task[] = [
    {
        taskType: QuestionType.FIRST,
        description: "В ходе выполнения разметки вам будут попадаться задания разных типов"
    },
    {
        taskType: QuestionType.DESCRIPTION,
        imageUrl: "/src/shared/assets/testImage.png"
    },
    {
        taskType: QuestionType.CHOICE,
        imageUrl: "/src/shared/assets/testImage.png",
        questions: ["Вопрос 1", "Вопрос 2"],
        answers: [["Ответ 1.1", "Ответ 1.2"], ["Ответ 2.1", "Ответ 2.2"]]
    }
]

onMounted(() => {
    let firstButton = document.getElementById("0");
    firstButton?.classList.add("completed");
    firstButton?.classList.add("current");
});

const currentTaskNum = ref(0);
let currentTask: Task = tasks[currentTaskNum.value];    

function checkIfTaskCompleted(){
    let taskCompleted = true;
    if(currentTask.taskType == QuestionType.CHOICE){
        for(let i = 0; i < currentTask.questions?.length!; i++){
            var selected = document.querySelector(`input[name="${i.toString()}"]:checked`);
            if(!selected){
                taskCompleted = false;
            }
        }
    }
    else if(currentTask.taskType == QuestionType.DESCRIPTION){
        let inputs = document.getElementsByTagName('textarea');
        if(inputs[0].value.length == 0){
            taskCompleted = false;
        }
    }
    return taskCompleted;
}

function changeTask(taskNum: number){
    
    let taskCompleted = checkIfTaskCompleted();
    let currentButton = document.getElementById(currentTaskNum.value.toString());
    if(taskCompleted || currentTaskNum.value == 0){
        currentButton?.classList.add("completed");
    }
    else {
        currentButton?.classList.remove("completed");
    }

    currentButton?.classList.remove("current");

    if(taskNum < 0){
        taskNum = 0;
    }
    if(taskNum >= tasks.length){
        taskNum = tasks.length - 1;
    }

    currentTask = tasks[taskNum];
    currentTaskNum.value = taskNum;
    currentButton = document.getElementById(taskNum.toString());
    currentButton?.classList.add("current");
}

defineProps({
    projectName: {
        type: String,
        default: ''
    },
    projectCode: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <Navbar username="Имя Пользователя" role="Root"/>
    <SideButton orientation="left" class="side-button" @click="changeTask(currentTaskNum-1)"/>
    <SideButton orientation="right" class="side-button" @click="changeTask(currentTaskNum+1)"/>
    <VStack justify="center" class="page-content">
        <AppText size="xl" weight="600">{{ projectName }}</AppText>
        <AppText variant="secondary" style="margin-top: 10px;">Код задания: {{ projectCode }}</AppText>
        <HStack gap="10" style="margin-top: 30px;">
            <AppButton type="square" v-for="(index) in tasks.length" @click="changeTask(index - 1)" :id="index-1">{{ index - 1 }} </AppButton>
        </HStack>
        <keep-alive>
            <component :key="currentTaskNum" :is="TaskContent" :task=currentTask></component>
        </keep-alive>
        <AppButton size="long" style="margin-top: 50px; align-self: end;" >Завершить задание</AppButton>
    </VStack>
</template>

<style>
.page-content {
    margin: 50px 18.9% 0 18.9%;
}

.side-button {
    margin-top: 50px;
}
</style>