<script setup lang="ts">
import Button from "@/app/components/Button.vue";
import Panel from "@/app/components/layout/Panel.vue";
import Radiobutton from "@/app/components/Radiobutton.vue";
import Task from "@/app/components/Task.vue";
import {ref} from "vue";
import TextInput from "@/app/components/TextInput.vue";
import UserInfo from "@/app/components/UserInfo.vue";
import SideButton from "@/app/components/SideButton.vue";


const options = ref([
  {name: 'Вариант 1', id: '0'},
  {name: 'Вариант 2', id: '1'},
  {name: 'Вариант 3', id: '2'},
  {name: 'Вариант 4', id: '3'}
])
const selected = ref('')

const inputValue = ref('')
</script>

<template>
    <Panel>
      <h1>Кнопки</h1>
      <Button label="Кнопка 1" color="primary"/>
      <Button label="Кнопка 2" color="secondary"/>
      <Button label="Назад" color="secondary" size="small"/>
    </Panel>

  <Panel>
    <h1>Радиокнопки</h1>
    <p>Выбранный вариант: {{ selected }}</p>
    <div
        v-for="option in options"
        :key="option.id">
      <radiobutton
          :value="option.name"
          :label="option.name"
          :id="option.id"
          name="club"
          v-model:checkedValue="selected"/>
    </div>
  </Panel>

  <Panel accented>
    <h1>Ввод текста</h1>
    <TextInput placeholder="Ввод" v-model="inputValue"/>
    <p>Веденный текст: "{{inputValue}}"</p>
  </Panel>
  
  <UserInfo username="Имя Пользователя" role="Разметчик" :rating=100 style="margin: 20px;"/>
  <Task title="Опрос о качестве работы сервиса" description="Пройдите короткий опрос и оцените качество работы сервиса. Это поможет нам стать лучше! :)" style="margin: 20px;"/>  
  <SideButton orientation="left" />
  <SideButton orientation="right" />
</template>

<style lang="scss" scoped>
</style>