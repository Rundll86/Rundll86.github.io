<script setup lang="ts">
import { PeopleDescriptor } from "src/structs";
import { computed } from "vue";

const props = defineProps<{
    people: PeopleDescriptor;
}>();
const avatarLink = computed(() => props.people.avatar || props.people.name);

function openWebsite() {
    if (props.people.website) window.open(props.people.website);
}
</script>
<template>
    <div class="friend-link" @click="openWebsite">
        <div class="avatar-wrapper">
            <img v-if="avatarLink" :src="`friends/${avatarLink}.jpg`" class="avatar">
        </div>
        <div class="info">
            <span class="name">{{ people.name }}</span>
            <span class="description">{{ people.description }}</span>
        </div>
    </div>
</template>
<style scoped>
.friend-link {
    display: inline-flex;
    align-items: center;
    border: transparent 2px solid;
    border-radius: 100vw;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 20px;
    backdrop-filter: blur(10px);
}

.friend-link:hover {
    border-color: white;
    transform: scale(110%) translateY(-5px);
    backdrop-filter: blur(20px);
    cursor: pointer;
}

.avatar-wrapper {
    --s: 75px;
    width: 75px;
    height: 75px;
    aspect-ratio: 1;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.info {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    overflow: hidden;
}

.name {
    font-weight: bold;
    font-size: 18px;
    text-wrap-mode: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.description {
    color: white;
    font-size: 14px;
}
</style>