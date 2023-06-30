<script setup lang="ts">

</script>

<template>
    <div class="profileBlock">
        <div class="user">
            <div class="username">Имя пользователя</div>
            <div class="role">Разметчик</div>
        </div>
        <img src="/public/DefaultProfilePic.png" alt="">
    </div>
</template>

<style scoped>
    img {
        border-radius: 50%;
        vertical-align: middle;
    }

    .user {
        font-family: Montserrat;
        color: #F4F4F4;
        display: inline-block;  
        margin-right: 12px;
        vertical-align: middle;
    }

    .username {
        font-size: 17px;
    }

    .role {
        font-weight: 300;
        font-size: 15px;
        opacity: 70%;
        float: right;
    }

    .profileBlock {
        width: auto;
        height: 45px;
        margin-left: 53.5px;
    }
</style>