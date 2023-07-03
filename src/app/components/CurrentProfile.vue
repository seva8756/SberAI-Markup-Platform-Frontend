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
  }
})
</script>

<template>
    <div class="profile-block">
        <div class="user-text-info">
            <div class="username"><a>{{username}}</a></div>
            <div class="role">{{role}}</div>
        </div>
        <img class="pfp" :src= profilePic alt="">
    </div>
</template>

<style scoped>
    .pfp {
      border-radius: 50%;
      height: 45px;
      width: 45px;
      vertical-align: middle;
      display: inline-block;
    }

    .user-text-info {
      font-family: var(--font-family);
      margin-right: 12px;
      vertical-align: middle;
      display: inline-block;
    }

    .username {
      color: var(--text-primary-color);
      text-align: right;
      font-size: 17px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .role {
      color: var(--text-secondary-color);
      font-size: 15px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      text-align: right;
    }

    .profile-block {
        width: auto;
        height: 45px;
        float: right;
        position: absolute;
        right: 6.25%;
    }
</style>