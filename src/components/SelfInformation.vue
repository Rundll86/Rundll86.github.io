<template>
    <div class="info">
        <AvatarImage />
        <NameLabel>陨落基围虾</NameLabel>
        <div>
            <BlockLabel v-for="label in labels" :key="label">{{ label }}</BlockLabel>
        </div>
        <CatcherText>好看的皮囊千篇一律，有趣的灵魂万里挑一</CatcherText>
    </div>
</template>
<script setup lang="ts">
import AvatarImage from "./AvatarImage.vue";
import NameLabel from "./NameLabel.vue";
import BlockLabel from "./BlockLabel.vue";
import CatcherText from "./CatcherText.vue";

const labels: string[] = [
    "完美主义",
    "桌面/Web全栈/游戏开发",
    "福瑞控",
    "SolariiX",
    "Roguelike重度爱好者"
];
</script>
<style scoped>
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>