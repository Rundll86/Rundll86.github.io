<template>
    <div class="align-box">
        <slot></slot>
    </div>
</template>
<style scoped>
.align-box {
    text-align: left;
    width: fit-content;
    display: inline-block;
    margin: 10px;
    border-left: 2px solid white;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.1);
}
</style>