<script setup lang="ts">
import '@/app/styles/variables/global.scss'

const props = defineProps({
    orientation: {
      type: String,
      default: ''
    }
})

const emit = defineEmits(["click"])
const clickOnButton = () => {
  emit("click")
}
</script>

<template>
    <button :class="['side-button', `side-button_${orientation}`]" @click="clickOnButton">
        <img v-if="orientation == 'left'" src="/src/shared/assets/icons/arrow_left.png" alt="" class="button-arrow">
        <img v-else src="/src/shared/assets/icons/arrow_right.png" alt="" class="button-arrow">
    </button>
</template>

<style scoped lang="scss">
.side-button {    
    background-color: var(--button-primary-color);
    width: 114px;
    height: 505px;

    position: sticky;
    display: inline-flex;
    
    border: none;
    transition: transform 0.1s;
    background: var(--button-primary-color);

    
    &_left {
        border-radius: 0px 15px 15px 0px;
        float: left;
    } 
    &_right {
        border-radius: 15px 0px 0px 15px;
        float: right;
    }
}
.button-arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.side-button:hover {
  opacity: 80%;
}
.side-button:active {
  transform: scale(0.99);
}
</style>