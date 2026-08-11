<template>
    <div>
        提议者：
        <Collaborator :user="send" />
        处理者：
        <Collaborator :key="user" v-for="user in results" :user="user" />
        提议主题：
        <span class="topic">{{ topic }}</span><br>
        提议类型：
        <Label>{{ type }}</Label><br>
        涉及文件：
        <Label v-for="file in files" :key="file">{{ file }}</Label><br>
        <slot></slot>
    </div>
</template>
<script setup>
import Label from "./Label.vue";
</script>
<script>
export default {
    name: "SuggestionMeta",
    props: {
        send: {
            type: String,
            default: "fs"
        },
        result: {
            type: String,
            default: "fs"
        },
        topic: {
            type: String,
            default: "无主题"
        },
        file: {
            type: String,
            default: "无"
        },
        type: {
            type: String,
            default: "未知"
        }
    },
    data() {
        return {
            files: this.file.split(",").filter(Boolean).map(file => file.trim()),
            results: this.result.split(",").filter(Boolean).map(result => result.trim())
        };
    }
};
</script>
<style scoped>
.topic {
    font-weight: bold;
}
</style>