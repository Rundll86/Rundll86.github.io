<script setup lang="ts">
defineProps<{ width: number }>();
</script>
<template>
    <span class="white" :style="{ '--w': width }"></span>
</template>
<style scoped>
.white {
    display: inline-block;
    --w: 10px;
    width: var(--w);
}
</style>