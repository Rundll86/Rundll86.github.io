<template>
    <div>
        <span class="title">{{ title }}</span><br>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
defineProps({ title: String });
</script>
<style scoped>
div {
    margin: 10px;
}

.title {
    --size: 10px;
    position: relative;
    font-weight: bold;
    font-size: 14px;
    margin: 5px;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.35);
    width: 100px;
    padding: 2px 0;
    clip-path: polygon(0 50%, var(--size) 0,
            calc(100% - var(--size)) 0,
            100% 50%,
            calc(100% - var(--size)) 100%,
            var(--size) 100%);
}
</style>