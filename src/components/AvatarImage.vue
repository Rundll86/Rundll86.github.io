<template>
    <div class="box">
        <img src="avatars/shrimp.png" class="img">
        <img src="avatars/lycaon.png" class="front img">
    </div>
</template>
<style scoped>
* {
    --size: 100px;
}

.box {
    position: relative;
    width: var(--size);
    height: var(--size);
}

.img {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    object-fit: contain;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    left: 0;
    top: 0;
}

.front:hover {
    opacity: 0;
    transform: scale(1.1);
}
</style>