<script setup lang="ts">

import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from "@/shared/ui/AppText/AppText.vue";
import AppInput from "@/shared/ui/AppInput/AppInput.vue";
import Navbar from "@/widgets/ui/Navbar/Navbar.vue";
import SideButton from "@/shared/ui/Buttons/SideButton.vue";
import AppButton from "@/shared/ui/Buttons/AppButton.vue";
import AppUpload from "@/shared/ui/AppUpload/AppUpload.vue";

defineProps({
  projectId: {
    type: String,
    default: "*code*"
  }
})
</script>

<template>

  <Navbar username="Имя Пользователя" role="Root" />
  <SideButton orientation="left" />
  <SideButton orientation="right" />
  <div class="content-area">
    <AppInput placeholder="Введите название проекта" bigplaceholder squared class="project-name"/>
    <AppText class="project-id" align="center" weight="500" variant="secondary">Код проекта: {{projectId}}</AppText>

    <AppInput label="Краткое описание" squared class="input" />
    <AppInput label="Инструкция к проекту" squared class="input" />

    <hr class="line" />

    <AppText variant="primary" weight="600" align="left" size="xl" remark="(.zip, .rar)">Загрузите архив изображений</AppText>
    <AppUpload accept=".zip" multiple/>
    <AppText variant="primary" weight="600" align="left" size="xl" remark="(.csv)">Загрузите задания</AppText>
    <AppUpload accept=".csv" multiple/>

    <div class="create-button-container">
      <AppButton size="m" cl>Создать</AppButton>
    </div>


  </div>



</template>

<style scoped lang="scss">
.create-button-container{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.content-area{
  width: 40%;
  height: auto;
  margin: 50px auto auto;
  align-content: center;
}
.project-name {
  border-radius: 15px;
  margin-top: 50px;
  margin-bottom: 20px;

}
.project-id {
  color: var(--text-color-secondary);
}

.line {
  stroke-width: 5px;
  stroke: #252525;
  margin-bottom: 30px;
}

.input {
 margin-top: 30px;
  margin-bottom: 30px;
}
</style>