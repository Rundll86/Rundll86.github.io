<template>
    <span>
        <slot></slot>
    </span>
</template>
<style scoped>
span {
    font-size: 20px;
    font-weight: bold;
    margin-top: 15px;
    display: inline-block;
}

span::before {
    content: "「";
}

span::after {
    content: "」";
}
</style>