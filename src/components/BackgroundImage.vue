<template>
    <FullscreenSize>
        <img v-if="!disable" src="background.jpg" :class="{ blur }">
        <div v-else class="placeholder"></div>
    </FullscreenSize>
</template>
<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    filter: blur(0);
}

img.blur {
    filter: blur(3px);
    transform: scale(1.02);
}

.placeholder {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}
</style>
<script setup lang="ts">
import FullscreenSize from "./FullscreenSize.vue";
defineProps({
    disable: Boolean,
    blur: Boolean
});
</script>