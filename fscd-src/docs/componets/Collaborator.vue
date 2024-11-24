<template>
    <div class="container" @click="jump" ref="root">
        <img class="avatar" :src="avatar" :alt="name + '的头像'" />
        <span class="name">{{ name }}</span>
        <span class="hover-bar">
            <Label v-for="label in labels">{{ label }}</Label>
            <OutboundLink />
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
.hover-bar {
    transform: translate(-50%);
    opacity: 0;
    transition: all 0.2s ease-out;
}

.container:hover .hover-bar {
    opacity: 1;
    transform: translate(0);
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