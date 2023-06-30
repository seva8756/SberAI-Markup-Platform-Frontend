<script setup lang="ts">
import Button from "@/app/components/Button.vue";
</script>

<template>
  <div class="background-div" >
    <h1>Заголовок 1</h1>
    <Button label="Кнопка 1" color="primary"/>
    <Button label="Кнопка 2" color="secondary"/>
    <Button label="Назад" color="secondary" size="small"/>
  </div>
</template>

<style lang="scss" scoped>
.background-div {
  background: var(--background-color-primary);
  width: 100%;
  height: 100vh;
}
</style>