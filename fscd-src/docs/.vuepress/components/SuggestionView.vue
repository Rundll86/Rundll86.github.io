<template>
    <div class="container">
        <OutboundLink class="icon" />
        <a :href="$withBase(`/suggestion/${target}`)" target="_blank">{{ target }}.md</a>
        <span class="hover-bar">
            <Label>{{ infos[sender].name }}</Label>
        </span>
    </div>
</template>
<script setup>
import Label from "./Label.vue";
import infos from "../assets/collaboratorInfo";
</script>
<script>
export default {
    name: "SuggestionView",
    props: {
        sender: {
            type: String,
            default: "fs"
        },
        target: {
            type: String,
            default: ""
        }
    }
};
</script>
<style scoped>
* {
    transition: all 0.2s ease-out;
}

.icon {
    opacity: 0;
    margin-left: 0;
    margin-right: 5px;
}

.hover-bar {
    transform: translate(-20%);
    opacity: 0;
    margin-left: 5px;
}

.container:hover .hover-bar {
    opacity: 1;
    transform: translate(0);
}

.container:hover .icon {
    opacity: 1;
    margin-left: 15px;
}

.container {
    display: flex;
    align-items: center;
}

.container:hover {
    cursor: pointer;
}
</style>