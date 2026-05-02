<template>
    <a target="_blank" :href="href" @mouseover="mouseIn = true" @mouseout="mouseIn = false">
        <SuspensionPrompt v-if="useSlots().prompt" :x="mouse[0]" :y="mouse[1]" :show="mouseIn">
            <slot name="prompt"></slot>
        </SuspensionPrompt>
        <slot></slot>
    </a>
</template>
<script setup lang="ts">
import { ref, useSlots } from "vue";
import SuspensionPrompt from "./SuspensionPrompt.vue";
import { useMouse } from "@/composers/useMouse";

defineProps({ href: String, unimportant: Boolean });

const mouse = useMouse();
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