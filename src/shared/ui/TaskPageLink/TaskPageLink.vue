<script setup lang="ts">
defineProps({
    link: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <a :href=link class="task-link">
        <slot />
    </a>
</template>

<style>
.task-link {
    height: 34px;
    width: 34px;
    border-radius: 5px;
    background-color: var(--accent-color-muted);
    color: var(--text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-m);
    font-weight: 400;

    &:hover {
        background: var(--accent-color);
    }
}

.visited {
    background: var(--accent-color);
}
</style>