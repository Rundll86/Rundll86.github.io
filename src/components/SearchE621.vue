<template>
    <LinkA :href="`https://e621.net/posts?tags=${url}`">
        <template #prompt>
            跳转的页面可能会引起你的不适，请谨慎斟酌
        </template>
        <slot></slot>
    </LinkA>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import LinkA from './Link.vue';
const { target } = defineProps({ target: String });
const url = computed(() => encodeURIComponent(target?.toLowerCase().replaceAll(' ', '_') ?? ""));
</script>