<script setup lang="ts">
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
    },
    rating: {
        type: Number,
        default: 0
    },
    id: {
        type: Number,
        default: 0
    }
  })
</script>

<template>
    <div class="user-info-block">
        <div class="content">
            <img :src=profilePic alt="" class="avatar">
            <div class="user-info">
            <p class="name">{{ username }}</p>
            <p class="info">{{ role }} | Рейтинг:{{ rating }}</p>
            <p class="id">ID: {{ id }}</p>
        </div>
        </div>
    </div>
</template>

<style>
.user-info-block {
    background-color: var(--background-color-secondary);
    border-radius: 20px;
    font-family: var(--font-family);
    color: var(--text-primary-color);
    height: 114px;
    width: 455px;
    position: relative;
}

.avatar {
    display: inline;
    position: absolute;
    width: 80px;
    height: 80px;
    left: 25px;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}

.name {
    font-weight: bold;
    font-size: 18px;
}

.info {
    font-weight: 300;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary-color);
}

.id {
    font-weight: 300;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary-color);
}

.user-info {   
    position: absolute;
    display: inline;
    top: 50%;
    margin-left: 140px;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>