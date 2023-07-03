<script setup lang="ts">
import CurrentProfile from '../CurrentProfile.vue'
import '@/app/styles/variables/global.scss'
</script>

<template>
  <nav class="navbar">
    <img class="logo" src="/src/shared/assets/icons/logo.png" alt="">
      <ul class="nav-body">
        <li class="link">Задания</li>
        <li class="link">Пользователи</li>
      </ul>
    <CurrentProfile username="Имя Пользователя" role="Разметчик"/>
  </nav>
</template>

<style lang="scss" scoped>
.nav-body{
  list-style-type: none;
  margin-left: 244.5px;
  padding: 0;
  width: auto;
  display: inline-flex;
  align-items: flex-start;
  gap: 30px;
}

.logo{
  margin-left: 6.25%;
  margin-right: 8.59%;
  float: left;
  width: 170px;
  height: 35px;
}

.link {
  display: block;
  padding: 0px;
  color: var(--text-secondary-color);
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 500;
  word-wrap: break-word;
  text-decoration: none;
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--text-primary-color);
  transition: 0.2s ease-in-out;
}

.link:hover::after {
  width: 100%;
}

.link:hover {
  color: var(--text-primary-color);
}

.navbar {
  background-color: var(--background-color-secondary);
  width: 100%;
  overflow: auto;
  height: 101px;
  display: flex;
  align-items: center;
  position: relative;
}
</style>