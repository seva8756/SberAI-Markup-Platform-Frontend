<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import Navbar from '@/widgets/NavBar/ui/NavBar.vue'
import Task from '@/shared/ui/TaskCard/TaskCard.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import { ref } from 'vue'
import ProjectList from '@/entities/Project/ui/ProjectList/ProjectList.vue'

const showAll = ref(true)
const currentButton = ref(0)

function toggleButtonStyles(e: any) {
  let button = document.getElementById(currentButton.value.toString())
  button?.classList.remove('selected')
  currentButton.value = e.target.id
  let newButton = document.getElementById(currentButton.value.toString())
  newButton?.classList.add('selected')
}

function toggleTasks(e: any) {
  toggleButtonStyles(e)
  if (e.target.id == 0) {
    showAll.value = true
  } else {
    showAll.value = false
  }
}
</script>

<template>

  <div class="content-area">
    <HStack class="header">
      <AppText variant="accent" weight="700" size="xl">Проекты</AppText>
      <div class="buttons-container">
        <AppButton class="task-type-selector left selected" id="0" @click="toggleTasks"
          >Все</AppButton
        >
        <AppButton class="task-type-selector right" id="1" @click="toggleTasks">Активные</AppButton>
      </div>
      <AppInput placeholder="Введите код задания..." class="search" />
      <AppButton full-round class="code-search-button">
        <img src="src/shared/assets/icons/arrow_right.svg" class="arrow-image" />
      </AppButton>
    </HStack>

    <ProjectList />
  </div>
</template>

<style scoped lang="scss">
.content-area {
  width: 930px;
  height: auto;
  padding-top: var(--navbar-height);
  margin: 50px auto auto;
  align-content: center;
}

.buttons-container {
  display: inline-flex;
  margin-left: 50px;
  margin-right: 275px;
}

.search {
  height: 60px;
  margin-right: 28px;
  width: 220px;
  font-size: 14px;
}

.arrow-image {
  width: 21px;
  height: 16px;
}

.task-type-selector {
  height: 31px;
  background-color: var(--hint-color-muted);
  font-size: 14px;

  &:hover {
    background-color: var(--accent-color);
  }

  &.left {
    border-radius: 5px 0px 0px 5px;
    width: 57px;
    margin-right: 2px;
  }
  &.right {
    border-radius: 0px 5px 5px 0px;
    width: 103px;
  }
}

.selected {
  background-color: var(--accent-color);
}

.code-search-button {
  width: 40px;
  height: 40px;
}

.header {
  margin-bottom: 50px;
}
</style>
