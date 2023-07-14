<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');</script>

<template>
  <div>
    <textarea v-model="message" class="input" ></textarea>
  </div>
</template>

<style scoped lang="scss">
  .input{
    border-radius: 15px;
    border: 3px solid #505050;
    background-color: transparent;
    color: var(--text-color);
    resize: vertical;
  }
</style>