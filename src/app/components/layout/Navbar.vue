<script setup lang="ts">
import CurrentProfile from '../CurrentProfile.vue'
import '@/app/styles/variables/global.scss'

const props = defineProps({
  username: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  profilePic: {
    type: String,
    default: '/src/shared/assets/icons/default_pfp.png'
  }
})
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <img src="/src/shared/assets/icons/logo.png" alt="">
    </router-link>
    <CurrentProfile :username=username :role=role />

    <ul class="nav-body">
      <li>
        <router-link class="link" to="/tasks">Задания</router-link>
      </li>

      <li v-show="role === 'Root'">
        <router-link class="link" to="/createTask">Создать</router-link>
      </li>

      <li>
        <router-link class="link" to="/users">Пользователи</router-link>
      </li>

    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav-body{
  list-style-type: none;
  margin-left: 0px;
  padding: 0;
  width: auto;
  display: inline-flex;
  align-items: flex-start;
  position: absolute;
  gap: 30px;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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