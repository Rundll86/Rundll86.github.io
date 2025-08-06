<template>
    <a target="_blank" :href="href" @mouseover="mouseIn = true" @mouseleave="mouseIn = false">
        <SuspensionPrompt v-if="useSlots().prompt" :x="window.mouse.value[0]" :y="window.mouse.value[1]"
            :show="mouseIn">
            <slot name="prompt"></slot>
        </SuspensionPrompt>
        <slot></slot>
    </a>
</template>
<script setup lang="ts">
import { ref, useSlots } from "vue";
import SuspensionPrompt from "./SuspensionPrompt.vue";
defineProps({ href: String, unimportant: Boolean });
const mouseIn = ref(false);
</script>
<style scoped>
a {
    --color: white;
    transition: none;
}

a:link,
a:visited {
    color: var(--color);
    text-decoration: none;
}

a:hover {
    color: var(--color);
    text-decoration: underline;
}

a:active {
    opacity: 0.8;
    text-decoration: underline;
}
</style>