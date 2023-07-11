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
      default: 'src/shared/assets/icons/defaultPfp.png'
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

  const emit = defineEmits(["click"])
  const goToUserPage = () => {
    emit("click");
  }
</script>

<template>
    <div class="user-info-block" @click="goToUserPage">
        <div class="content">
            <img :src=profilePic alt="" class="avatar">
            <div class="user-info">
            <p class="name">{{ username }}</p>
            <p class="info">{{ role }} | Рейтинг: {{ rating }}</p>
            <p class="id">ID: {{ id }}</p>
        </div>
        </div>
    </div>
</template>

<style>
.user-info-block {
    background-color: var(--gray-secondary);
    border-radius: 20px;
    font-family: var(--font-family-main);
    color: var(--text-color);
    height: 114px;
    width: 455px;
    position: relative;
    margin: 10px;
    cursor: pointer;
    display: inline-block;
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
    color: var(--text-color-secondary);
}

.id {
    font-weight: 300;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-secondary);
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