<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'

defineProps({
  description: {
    type: String,
    default: ''
  }
})

let currentTab = 0

function check() {
  var links = document.getElementsByTagName('a')
  var currentUrl = document.location.href
  for (var i = 0; i < links.length; i++) {
    if (links[i].href == currentUrl) {
      links[i].className += 'visited'
    }
  }
}
</script>

<template>
  <hr class="line" style="margin-top: 60px" />
  <AppText size="l" weight="500" style="margin-top: 80px">{{ description }}</AppText>
</template>

<style scoped>
.line {
  width: 100%;
  height: 5px;
  background: var(--hint-color-muted);
  border: none;
  margin-top: 55px;
  border-radius: 5px;
}
</style>
