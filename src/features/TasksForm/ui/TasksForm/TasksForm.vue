<script setup lang="ts">

import AppText from "@/shared/ui/AppText/AppText.vue";
import Navbar from "@/widgets/ui/Navbar/Navbar.vue";
import Task from "@/shared/ui/TaskCard/TaskCard.vue";
import VStack from "@/shared/ui/Stack/VStack/VStack.vue";
import HStack from "@/shared/ui/Stack/HStack/HStack.vue";
import AppInput from "@/shared/ui/AppInput/AppInput.vue";
import AppButton from "@/shared/ui/Buttons/AppButton.vue";
import Radiobutton from "@/shared/ui/AppRadiobutton/Radiobutton.vue";
</script>

<template>
  <Navbar username="Имя Пользователя" role="Root" />

  <div class="content-area">
    <h-stack class="header">

      <AppText variant="accent" weight="700" size="xl" >Проекты</AppText>
      <div class="">
        <AppInput placeholder="Введите код задания..." class=""/>
      </div>
      <Radiobutton></Radiobutton>
      <div>
        <AppButton full-round></AppButton>
      </div>
    </h-stack>

    <v-stack gap="24">
      <Task title="Заголовок" description="Описание описание описание описание описание описание описание описание описание описание описание" num-questions="10"/>
      <Task title="Заголовок" description="Описание описание описание описание описание описание описание описание описание описание описание" num-questions="10"/>
      <Task title="Заголовок" description="Описание описание описание описание описание описание описание описание описание описание описание" num-questions="10"/>

    </v-stack>

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