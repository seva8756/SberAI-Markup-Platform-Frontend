<script setup lang="ts">
import AppText from '@/shared/ui/AppText/AppText.vue'
import Navbar from '@/widgets/ui/Navbar/Navbar.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'

defineProps({
    username: {
        type: String,
        default: "Имя Пользователя"
    },
    role: {
        type: String,
        default: "Root"
    },
    id: {
        type: Number,
        default: 12345678
    },
    rating: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: "Муж"
    },
    residence: {
        type: String,
        default: "Россия, Москва"
    },
    age: {
        type: Number,
        default: 0
    },
    mail: {
        type: String,
        default: ""
    },
    taskCount: {
        type: Number,
        default: 0
    },
    imgCount: {
        type: Number,
        default: 0
    },
    regDate: {
        type: Date,
        default: new Date(1970, 0, 1)
    },
})
</script>

<template>
    <Navbar username="Имя Пользователя" role="Root" />
    <HStack class="page-content" align="start" gap="85">
        <VStack justify="center" gap="24">
            <img src="@/shared/assets/icons/defaultPfp.png" alt="">
            <AppButton size="xs" border="dashed">Обновить фото</AppButton>
        </VStack>
        <VStack class="user-info" align="start" gap="16">
            <div class="main-info">
                <AppText size="xl" weight="600">{{ username }}</AppText>
                <AppText size="xl" variant="muted">ID: {{ id }}</AppText>
            </div>
            <AppText variant="muted" class="additional-info">{{ role }} | Рейтинг: {{ rating }}</AppText>
            <hr class="line"/>
            
            <AppText size="l" weight="600" variant="underlined" style="margin-top: 20px">Личная информация</AppText>
            <AppText>Пол: {{ gender }}</AppText>
            <AppText>Место проживания: {{ residence }}</AppText>
            <AppText>Возраст: {{ age }}</AppText>
            <AppText>Почта: {{ mail }}</AppText>

            <AppText size="l" weight="600" variant="underlined" style="margin-top: 20px">Статистика</AppText>
            <AppText>Количество выполненных заданий: {{ taskCount }}</AppText>
            <AppText>Количество размеченных изображений: {{ imgCount }}</AppText>
            <AppText>Дата регистрации: {{ regDate.toDateString() }}</AppText>
        </VStack>
    </HStack>
</template>

<style>
.page-content {
    margin-left: 6.25%;
    margin-top: 88px;
    margin-right: 9.37%;
}

.main-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.additional-info {
    margin-top: 10px;
}

.user-info {
    flex-grow: 1;
}

.line {
  width: 100%;
  height: 5px;
  background: var(--hint-color-muted);
  border: none;
  margin-top: 55px;
  border-radius: 5px;
}
</style>