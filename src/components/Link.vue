<template>
    <a target="_blank" :href="href">
        <slot></slot>
    </a>
</template>
<script setup lang="ts">
defineProps({ href: String });
</script>
<style scoped>
a {
    transition: none;
}

a:link,
a:visited {
    color: white;
    text-decoration: none;
}

a:hover {
    color: white;
    text-decoration: underline;
}

a:active {
    color: rgb(200, 200, 200);
    text-decoration: underline;
}
</style>