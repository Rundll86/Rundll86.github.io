<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    name: String,
    avatar: String,
    website: String,
    description: String,
});
const avatarLink = computed(() => props.avatar || props.name);

function openWebsite() {
    if (props.website) window.open(props.website);
}
</script>
<template>
    <div class="friend-link" @click="openWebsite">
        <img v-if="avatarLink" :src="`friends/${avatarLink}.jpg`" class="avatar">
        <div class="info">
            <span class="name">{{ name }}</span>
            <span class="description">{{ description }}</span>
        </div>
    </div>
</template>
<style scoped>
.friend-link {
    --s: 75px;
    display: inline-flex;
    border: transparent 2px solid;
    border-radius: var(--s);
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 20px;
    backdrop-filter: blur(10px);
}

.friend-link:hover {
    border-color: white;
    transform: scale(110%) translateY(-5px);
    backdrop-filter: blur(20px);
}

.avatar {
    width: var(--s);
    height: var(--s);
    border-radius: 50%;
}

.info {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
}

.name {
    color: white;
    font-weight: bold;
    font-size: 18px;
}

.description {
    color: rgb(225, 225, 225);
    font-size: 14px;
}
</style>