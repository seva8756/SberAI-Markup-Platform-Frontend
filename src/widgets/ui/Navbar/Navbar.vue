<script setup lang="ts">
import CurrentProfile from '@/shared/ui/CurrentProfile/CurrentProfile.vue'
import Logo from '@/shared/assets/icons/logo.svg'
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
    default: '/src/shared/assets/icons/defaultPfp.png'
  }
})
</script>

<template>
  <nav class="navbar">
    <div class="image-container">
      <Logo class="logo"/>
    </div>
    <CurrentProfile :username=username :role=role :profilePic=profilePic />
    <ul class="nav-body">
      <li class="link">Задания</li>
      <li class="link" v-show="role === 'Root'">Создать</li>
      <li class="link">Пользователи</li>
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
.image-container{
  margin-left: 6.25%;
  margin-right: 8.59%;
  float: left;
  display: flex;
  justify-content: center;
}
.logo{
  width: 170px;
  height: 35px;

}
.link {
  display: block;
  padding: 0px;
  color: var(--hint-color);
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
  background-color: var(--text-color);
  transition: 0.2s ease-in-out;
}

.link:hover::after {
  width: 100%;
}

.link:hover {
  color: var(--text-color);
}

.navbar {
  background-color: var(--gray-secondary);
  width: 100%;
  overflow: auto;
  height: 101px;
  display: flex;
  align-items: center;
  position: relative;
}
</style>