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
        <img v-if="avatarLink" :src="`friends/${avatarLink}.jpg`" class="avatar">
        <div class="info">
            <span class="name">{{ people.name }}</span>
            <span class="description">{{ people.description }}</span>
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