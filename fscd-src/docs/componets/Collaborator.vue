<template>
    <div class="container" @click="jump" ref="root">
        <img class="avatar" :src="avatar" :alt="name + '的头像'" />
        <span class="name">{{ name }}</span>
        <OutboundLink v-if="hovering" />
    </div>
</template>
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
        }
    },
    methods: {
        jump() {
            window.open(this.url, "_blank");
        }
    },
    data() {
        return {
            hovering: false
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
.container {
    display: flex;
    align-items: center;
    margin: 20px 5px;
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