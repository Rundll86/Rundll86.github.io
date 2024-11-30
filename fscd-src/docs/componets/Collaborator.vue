<template>
    <div class="container" @click="jump" ref="root">
        <OutboundLink class="icon" />
        <img class="avatar" :src="avatar" :alt="name + '的头像'" />
        <span class="name">{{ name }}</span>
        <span class="hover-bar">
            <Label v-for="label in labels">{{ label }}</Label>
        </span>
    </div>
</template>
<script setup>
import Label from './Label.vue';
</script>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Collaborator',
    props: {
        avatar: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
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
            labels: this.label.split(',').filter(Boolean)
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
});
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
    padding: 0 5px;
    padding-top: 20px
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