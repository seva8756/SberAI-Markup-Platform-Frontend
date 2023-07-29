<script setup lang="ts">
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppCard from '@/shared/ui/AppCard/AppCard.vue'
import type { PropType } from 'vue'
import type { Project } from '@/entities/Project/model/types/project'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import { getHStack } from '@/shared/lib/helpers/getHStack'
import ProjectIcon from '@/shared/assets/icons/project.svg'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'

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
    :class="['task', getHStack({ justify: 'between', align: 'center' })]"
  >
    <HStack gap="30" align="start">
      <ProjectIcon />
      <VStack gap="10" align="start" class="text-info">
        <AppText weight="700">Заголовок</AppText>
        <AppText size="s" class="task-description">
          Длинное и подробное описание задания 5. Описывается суть задания, дается краткая инструкци
          к выполнению.
        </AppText>
      </VStack>
    </HStack>
    <AppButton class="begin-btn">Приступить</AppButton>
  </AppCard>
</template>

<style scoped lang="scss">
.task {
  width: 930px;
  height: 150px;
  position: relative;
}

.text-info {
  width: 455px;
}
</style>
