<template>
    <a target="_blank" :href="href">
        <slot></slot>
    </a>
</template>
<script setup lang="ts">
defineProps({ href: String, unimportant: Boolean });
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