<script setup lang="ts">
import '@/app/styles/variables/global.scss'
import {ref} from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "Button"
  },
  color: {
    type: String,
    default: "primary"
  },
  size: {
    type: String,
    default: "big"
  }
})

const emit = defineEmits(["click"])
const clickOnButton = () => {
  emit("click")
}
</script>

<template>
  <button :class="['btn', `btn_${color}`, `btn_${size}`]" @click="clickOnButton">{{label}}</button>
</template>

<style lang="scss" scoped>
.btn {
  margin: 15px;
  display: inline-flex;

  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 10;
  height: 45px;
  border-radius: 22.5px;
  border: none;
  padding: 10px 15px;
  transition: transform 0.1s;

  font-family: var(--font-family);
  color: var(--text-primary-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;


  &_primary {
    background: var(--button-primary-color);
  }
  &_secondary {
    background: var(--button-secondary-color);
  }
  &_big {
    min-width: 250px;
  }
  &_small {
    min-width: 210px;
  }
}
.btn:hover {
  opacity: 80%;
}
.btn:active {
  transform: scale(0.99);
}
</style>