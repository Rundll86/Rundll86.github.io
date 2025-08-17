<template>
    <div class="info">
        <AvatarImage />
        <NameLabel>陨落基围虾</NameLabel>
        <div>
            <BlockLabel>完美主义</BlockLabel>
            <BlockLabel>Web</BlockLabel>
            <BlockLabel>桌面</BlockLabel>
            <BlockLabel>游戏</BlockLabel>
            <BlockLabel>福瑞控</BlockLabel>
            <BlockLabel>SolariiX</BlockLabel>
        </div>
        <CatcherText>好看的皮囊千篇一律，有趣的灵魂万里挑一</CatcherText>
    </div>
</template>
<script setup lang="ts">
import AvatarImage from "./AvatarImage.vue";
import NameLabel from "./NameLabel.vue";
import BlockLabel from "./BlockLabel.vue";
import CatcherText from "./CatcherText.vue";
</script>
<style scoped>
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>