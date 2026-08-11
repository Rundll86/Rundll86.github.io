<template>
    <div>
        <a :href="$withBase('/')">返回首页</a>
        <hr>提议处理状态：<Label>{{ getState() }}</Label><br>
        <span v-if="completed">处理结果：</span>
    </div>
</template>
<script setup>
import Label from "./Label.vue";
</script>
<script>
export default {
    name: "SuggestionResult",
    props: {
        completed: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getState() {
            if (this.completed) {
                return "已完成";
            } else {
                return "处理中";
            }
        }
    }
};
</script>
<style scoped>
hr {
    border-top-width: 3px;
    border-radius: 2px;
}

div {
    margin-top: 50px;
    margin-bottom: 10px;
}
</style>