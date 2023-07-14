<script setup lang="ts">

import Navbar from "@/widgets/ui/Navbar/Navbar.vue";
import SideButton from "@/shared/ui/Buttons/SideButton.vue";
</script>

<template>
  <Navbar username="Имя Пользователя" role="Root" />
  <SideButton orientation="left" />
  <SideButton orientation="right" />
</template>

<style scoped lang="scss">

</style>