<script setup lang="ts">
import CurrentProfile from './CurrentProfile.vue'
import '@/app/styles/variables/global.scss'
</script>

<template>
  <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet">
  <nav class="navbar">
    <img class="logo" src="/public/Logotype.png" alt="">
      <ul class="nav-body">
        <li><a class="link-text" href="">Задания</a></li>
        <li><a class="link-text" href="">Пользователи</a></li>
        <li><a class="link-text" href="">Поддержка</a></li>
        <li><a class="link-text" href="">О проекте</a></li>
      </ul>
    <CurrentProfile />
  </nav>
</template>

<style lang="scss" scoped>
.nav-body{
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 43.9%;
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

.link-text {
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

.link-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  background-color: var(--text-primary-color);
  transition: 0.3s ease-in-out;
}

.link-text:hover::after {
  width: 100%;
}

.link-text:hover {
  color: var(--text-primary-color);
}

.navbar {
  background-color: var(--background-color-secondary);
  width: 100%;
  overflow: auto;
  height: 101px;
  display: flex;
  align-items: center;

}
</style>