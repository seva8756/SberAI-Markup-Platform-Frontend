<template>
  <input class="input" v-model="input" :placeholder="placeholder" @mouseover="hovered = true" @mouseleave="hovered = false"/>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
const hovered = ref(false);

const props = defineProps({
  placeholder: {
    type: String,
    default: " текст..."
  },
});
</script>

<style scoped>
.input {
  padding: 30px;
  flex-shrink: 0;
  border-radius: 28.5px;
  background: var(--input-text-color);
  height: 40px;
  color: var(--text-primary-color);
  font-size: 14px;
  font-family: var(--font-family);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: 0;
  transition: placeholder 0.3s ease;
}

.input::placeholder {
  color: var(--text-primary-color);
  font-size: 14px;
  font-family: var(--font-family);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: 0;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.input:hover::placeholder {
  opacity: 0;
}

.input:focus::placeholder {
  opacity: 0;
}

.input:not(:focus)::placeholder {
  opacity: 1;
  transition-delay: 0.3s;
}

.input:hover:not(:focus)::placeholder {
  opacity: 0;
  transition-delay: 0s;
}

.input:focus {
  outline: none;
}

.input:hover {
  background: var(--input-hover-color);
}
</style>
