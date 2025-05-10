<template>
    <div class="container" @click="jump" ref="root">
        <OutboundLink class="icon" />
        <img class="avatar" :src="avatar" :alt="name + '的头像'" />
        <span class="name">{{ name }}</span>
        <span class="hover-bar">
            <Label v-for="i in label">{{ i }}</Label>
        </span>
    </div>
</template>
<script setup>
import Label from './Label.vue';
import infos from "../assets/collaboratorInfo";
</script>
<script>
export default {
    name: 'Collaborator',
    props: {
        user: {
            type: String,
            default: "fs"
        }
    },
    methods: {
        jump() {
            window.open(this.url, "_blank");
        }
    },
    data() {
        return {
            hovering: false,
            avatar: infos[this.user].avatar || infos.fs.avatar,
            name: infos[this.user].name || infos.fs.name,
            label: infos[this.user].label || infos.fs.label,
            url: infos[this.user].url || infos.fs.url
        }
    },
    mounted() {
        this.$refs.root.addEventListener('mouseenter', () => {
            this.hovering = true;
        });
        this.$refs.root.addEventListener('mouseleave', () => {
            this.hovering = false;
        });
    }
};
</script>
<style scoped>
* {
    transition: all 0.2s ease-out;
}

.hover-bar {
    transform: translate(-50%);
    opacity: 0;
}

.container:hover .hover-bar {
    opacity: 1;
    transform: translate(0);
}

.container:hover .icon {
    opacity: 1;
    margin-left: 15px;
}

.icon {
    opacity: 0;
    margin-left: 0;
    margin-right: 5px;
}

.container {
    display: flex;
    align-items: center;
    padding: 10px 5px;
}

.container:hover {
    cursor: pointer;
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    border: 2px gray solid;
}

.name {
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
}
</style>