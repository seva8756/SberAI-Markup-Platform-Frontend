<script setup lang="ts">
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
</script>

<template>
  <button :class="['btn', `btn_${color}`, `btn_${size}`]">{{label}}</button>
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
    padding: 25px 42px;
    border-radius: 23px;
  }
  &_small {
    padding: 10px 15px;
    border-radius: 21px;
  }

}
</style>