<script setup lang="ts">
import Button from "@/app/components/Button.vue";
import Panel from "@/app/components/Panel.vue";
import Radiobutton from "@/app/components/Radiobutton.vue";
import {ref} from "vue";
import TextInput from "@/app/components/TextInput.vue";

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

  <Panel>
    <h1>Ввод текста</h1>
    <TextInput placeholder="Ввод" v-model="inputValue"/>
    <p>Веденный текст: "{{inputValue}}"</p>
  </Panel>
</template>

<style lang="scss" scoped>
</style>