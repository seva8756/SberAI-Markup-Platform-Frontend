<script setup lang="ts">
import '@/app/styles/variables/global.scss'
</script>

<template>
    <div class="profile-block">
        <div class="user-text-info">
            <div class="username"><a>Имя пользователя</a></div>
            <div class="role">Разметчик</div>
        </div>
        <img class="pfp" src="/src/shared/assets/icons/default_pfp.png" alt="">
    </div>
</template>

<style scoped>
    .pfp {
      border-radius: 50%;
      vertical-align: middle;
    }

    .user-text-info {
      font-family: var(--font-family);
      display: inline-block;
      margin-right: 12px;
      vertical-align: middle;
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
        margin-left: 53.5px;
    }
</style>