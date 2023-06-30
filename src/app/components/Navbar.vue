<script setup lang="ts">
import CurrentProfile from './CurrentProfile.vue'
</script>

<template>
  <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet">
  <nav class="navbar">
    <img src="/public/Logotype.png" alt="">
      <ul>
        <li><a href="">Задания</a></li>
        <li><a href="">Пользователи</a></li>
        <li><a href="">Поддержка</a></li>
        <li><a href="">О проекте</a></li>
      </ul>
    <CurrentProfile />
  </nav>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 43.9%;
}

img{
  margin-left: 6.25%;
  margin-right: 8.59%;
  float: left;
  width: 170px;
  height: 35px;
}

li {
  margin-left: 2.34%;
  padding: 0px;
  display: inline-block;
}

li:first-child{ 
  margin-left: 0px;
}

a {
  display: block;
  padding: 0px;
  background-color: #353535;
  color: #f4f4f4;
  font-family: Montserrat;
  font-size: 20px;
  padding: 0px;
}

.active {
  text-decoration: underline;
}

.navbar {
  background-color: #353535;
  width: 100%;
  overflow: auto;
  height: 101px;
  display: flex;
  align-items: center;
}

body {
  height: 101px;
}
</style>