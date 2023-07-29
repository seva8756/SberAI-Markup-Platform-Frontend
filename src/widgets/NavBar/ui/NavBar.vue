<script setup lang="ts">
import CurrentProfile from '@/shared/ui/CurrentProfile/CurrentProfile.vue'
import Logo from '@/shared/assets/icons/logo.svg'
import '@/app/styles/variables/global.scss'
import { routes } from '@/shared/const/routes'
import { getHStack } from '@/shared/lib/helpers/getHStack'
import { links } from '@/widgets/NavBar/const/links'
import AppLink from '@/shared/ui/TextViews/AppLink/AppLink.vue'

defineProps({
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
  <nav :class="[getHStack({ gap: '30', justify: 'between' }), 'navbar']">
    <router-link :to="routes.projects()">
      <Logo width="170" height="35" />
    </router-link>
    <ul :class="getHStack({ gap: '50' })">
      <li v-for="(link, index) in links" :key="index" class="link">
        <AppLink weight="500" :to="link.to">{{ link.title }}</AppLink>
      </li>
    </ul>
    <CurrentProfile :username="username" :role="role" :profilePic="profilePic" />
  </nav>
</template>

<style lang="scss" scoped>
.logo {
  width: 170px;
  height: 35px;
  cursor: pointer;
}
.link {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--text-color);
    transition: 0.2s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: var(--text-color);
  }
}

.navbar {
  position: fixed;
  background: var(--gray-secondary);
  width: 100%;
  height: var(--navbar-height);
  padding: 0 80px;
  z-index: 100;
}
</style>
