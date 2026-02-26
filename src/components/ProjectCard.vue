<template>
    <div class="project" @click="website ? window.open(website, '_blank') : null">
        <img class="avatar" :src="image">
        <div class="description">
            <span class="title">{{ title }}</span><br>
            <div class="content">
                <slot></slot><br>
                &nbsp;
            </div>
            <div class="cuts">
                <div class="cut" style="--count: 1;--pad-left:14px">技术栈</div>
                <div class="cut gaper" style="--count: 2">{{ techStack }}</div>
                <div class="cut" style="--count: 3">分类</div>
                <div class="cut gaper" style="--count: 4">{{ category }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    title: String,
    image: String,
    techStack: String,
    category: String,
    website: String
});
</script>
<style scoped>
.project {
    border-radius: 10px;
    overflow: hidden;
    display: inline-flex;
    flex-direction: column;
    width: 200px;
    border: 2px rgb(200, 200, 200) solid;
    margin: 10px;
}

.project:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    transform: scale(102%);
    border-color: white;
}

.avatar {
    width: 200px;
    height: 112.5px;
}

.description {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: left;
    padding: 10px 15px;
    position: relative;
}

.title,
.content,
.cut {
    color: black;
    text-align: left;
}

.title {
    font-size: 17px;
    font-weight: bold;
}

.content {
    font-size: 14px;
    margin-top: 5px;
}

.cuts {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
}

.cut {
    --offset: 8px;
    --pad-left: 9px;
    clip-path: polygon(0 0, calc(100% - var(--offset)) 0, 100% 100%, var(--offset) 100%);
    background-color: rgba(0, 0, 0, 0.15);
    padding: 2px 9px;
    padding-left: var(--pad-left);
    font-size: 12px;
    text-wrap-mode: nowrap;
    transform: translateX(calc(var(--offset) * -1 * var(--count)));
}

.cut.gaper {
    background-color: rgba(0, 0, 0, 0.25);
}
</style>