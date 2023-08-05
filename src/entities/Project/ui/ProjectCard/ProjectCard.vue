<script setup lang="ts">
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppCard from '@/shared/ui/AppCard/AppCard.vue'
import type { PropType } from 'vue'
import type { Project } from '../../model/types/project'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import { getHStack } from '@/shared/lib/helpers/getHStack'
import ProjectIcon from '@/shared/assets/icons/project.svg'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { routes } from '@/shared/const/routes'
import classes from './ProjectCard.module.scss'

defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
})
</script>

<template>
  <AppCard
    padding-horizontal="30"
    padding-vertical="25"
    :class="[classes.task, getHStack({ justify: 'between', align: 'center' })]"
  >
    <HStack gap="30" align="start">
      <ProjectIcon />
      <VStack gap="10" align="start" :class="classes.textInfo">
        <AppText weight="700">{{ project.title }}</AppText>
        <AppText size="s" class="task-description">
          {{ project.description }}
        </AppText>
      </VStack>
    </HStack>
    <AppButton
      class="begin-btn"
      button-tag="link"
      :to="routes.project_welcome(project.ID.toString())"
      >Приступить</AppButton
    >
  </AppCard>
</template>
