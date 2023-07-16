<script setup lang="ts">
import HStack from '../Stack/HStack/HStack.vue'

defineProps({
    label: {
        type: String,
        default: ''
    }
})



</script>

<template>
  <label>
    <span>{{ label }}</span>
    <HStack gap="10" class="input-container">
      <input class="birthdate-input" placeholder="День"/>
      <input class="birthdate-input" placeholder="Мес."/>
      <input class="birthdate-input year" placeholder="Год" list="years"/>
      <datalist id="years">
        <option v-for="n in 41">{{ n + 1979 }}</option>
      </datalist>
    </HStack>
  </label>
</template>

<style>
.input-container {
  margin-top: 10px;
}

.birthdate-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80px;
    outline: none;
    border: none;
    color: var(--text-color);
    padding: 8px 15px;
    background: var(--gray-primary);
    border-radius: 10px;
    height: 40px;

    &::placeholder {
      color: var(--text-color);
    }

    &.year{
      width: 170px
    }
}
</style>