<template>
    <div class="tips" :class="{ show }" :style="{
        '--x': x + 'px',
        '--y': ((y ?? 0) - 2) + 'px'
    }">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
defineProps({
    x: Number,
    y: Number,
    show: Boolean
});
</script>
<style scoped>
.tips {
    --x: 0px;
    --y: 0px;
    position: fixed;
    left: var(--x);
    top: var(--y);
    transform: translate(-50%, -100%) scale(0.5);
    opacity: 0;
    transform-origin: 50% 100%;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    padding: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
}

.tips.show {
    opacity: 1;
    transform: translate(-50%, -100%) scale(1);
}
</style>