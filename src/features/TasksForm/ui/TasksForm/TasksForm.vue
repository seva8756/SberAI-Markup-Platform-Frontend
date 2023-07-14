<script setup lang="ts">

import AppText from "@/shared/ui/AppText/AppText.vue";
import Navbar from "@/widgets/ui/Navbar/Navbar.vue";
import Task from "@/shared/ui/TaskCard/TaskCard.vue";
import VStack from "@/shared/ui/Stack/VStack/VStack.vue";
import HStack from "@/shared/ui/Stack/HStack/HStack.vue";
import AppInput from "@/shared/ui/AppInput/AppInput.vue";
import AppButton from "@/shared/ui/Buttons/AppButton.vue";
import { ref } from 'vue';

const tasks = ref([
  {title: "Заголовок задания 1", description: "Длинное и подробное описание задания 1. Описывается суть задания, дается краткая инструкци к выполнению.", questionAmount: 10},
  {title: "Заголовок задания 2", description: "Длинное и подробное описание задания 2. Описывается суть задания, дается краткая инструкци к выполнению.", questionAmount: 8},
  {title: "Заголовок задания 3", description: "Длинное и подробное описание задания 3. Описывается суть задания, дается краткая инструкци к выполнению.", questionAmount: 3},
  {title: "Заголовок задания 4", description: "Длинное и подробное описание задания 4. Описывается суть задания, дается краткая инструкци к выполнению.", questionAmount: 26},
  {title: "Заголовок задания 5", description: "Длинное и подробное описание задания 5. Описывается суть задания, дается краткая инструкци к выполнению.", questionAmount: 12},
  {title: "Заголовок задания 6", description: "Длинное и подробное описание задания 6. Описывается суть задания, дается краткая инструкци к выполнению.", questionAmount: 10},
  {title: "Заголовок задания 7", description: "Длинное и подробное описание задания 7. Описывается суть задания, дается краткая инструкци к выполнению!", questionAmount: 24},

])
</script>

<template>
  <Navbar username="Имя Пользователя" role="Root" />

  <div class="content-area">
    <HStack class="header">
      <AppText variant="accent" weight="700" size="xl" >Проекты</AppText>
        <AppInput placeholder="Введите код задания..." class=""/>
        <AppButton full-round></AppButton>
    </HStack>

    <VStack gap="24">
      <Task v-for="(task, index) in tasks"  :title="task.title" :description="task.description" :questionAmount="task.questionAmount"/>
    </VStack>
  </div>
</template>

<style scoped lang="scss">
.content-area{
  width: 930px;
  height: auto;
  margin: 50px auto auto;
  align-content: center;
}
.search::placeholder {
  width: 220px;
  height: 40px;
  margin-left: 275px;

}

.header {
  margin-bottom: 50px;
}
</style>