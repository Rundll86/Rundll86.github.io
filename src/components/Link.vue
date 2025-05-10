<template>
    <a>
        <slot></slot>
    </a>
</template>
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