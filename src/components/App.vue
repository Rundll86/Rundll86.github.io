<template>
    <BackgroundImage :disable="false" :blur="bluring" />
    <FullscreenSize class="container-app">
        <div class="main" @mouseover="bluring = true" @mouseleave="bluring = false">
            <Avatar /><br>
            <NameLabel>FallingShrimp</NameLabel><br>
            <BlockLabel>完美主义</BlockLabel>
            <BlockLabel>Web/游戏开发</BlockLabel>
            <BlockLabel>福瑞控</BlockLabel>
            <BlockLabel>SolariiX</BlockLabel><br>
            <Catcher>好看的皮囊千篇一律，有趣的灵魂万里挑一</Catcher>
            <Description>
                你好！<br>
                我是FallingShrimp，来自SolariiX的全栈/桌面应用开发爱好者。<br>
                有梦想，但仍在学习的路上，尚无法实现。<br>
                目前能熟练使用的一些前沿 <b>语言/技术栈</b>：<br>
                <BlockLabel>Python/GDScript</BlockLabel>
                <BlockLabel>Type/JavaScript</BlockLabel>
                <BlockLabel>C#/Java</BlockLabel>
                <VerticalLine />
                <BlockLabel>Webpack</BlockLabel>
                <BlockLabel>Electron</BlockLabel>
                <BlockLabel>Flask</BlockLabel>
            </Description>
            <Description>
                联系方式：<br>
                邮箱：<LinkA href="mailto:3161880837@qq.com">3161880837@qq.com</LinkA><br>
                QQ：<LinkA @click="copy('3161880837')">3161880837</LinkA><br>
                <LinkA href="https://space.bilibili.com/649063815">哔哩哔哩</LinkA>
                <LinkA class="link-2" href="https://github.com/Rundll86">Github</LinkA>
            </Description>
            <HorizontalLine />
            <BigTitle>development</BigTitle><br>
            <ProjectCard image="se2.jpg" title="ScriptEditor" tech-stack="Vue" category="工具">
                基于界面的AVG游戏剧本设计器，让不会写代码的文案师也能组织剧本。
            </ProjectCard>
            <ProjectCard image="fsc.jpg" title="FS-Context" tech-stack="TS" category="开发框架">
                易用的TS上下文，使用ts的类型提示和新脚手架开发TW/Gandi通用拓展。
            </ProjectCard>
            <ProjectCard image="mln.jpg" title="ModLoaderNew" tech-stack="Python" category="游戏">
                将自定义模型注入原神客户端，基于GIMI。封装更多工具，可能违法。
            </ProjectCard>
            <HorizontalLine />
            <BigTitle>友情链接</BigTitle><br>
            <LinkA href="https://solariix.com/">SolariiX</LinkA><br>
            <LinkA href="https://github.com/FurryR/">熊谷 凌/FurryR</LinkA><br>
            <LinkA href="https://lanwywritexu.github.io/">Cyberexplorer</LinkA><br>
            <LinkA href="https://furryaria.top/">Aria</LinkA><br>
            <LinkA href="https://daiqitao.github.io/">DAIQITAO</LinkA><br>
            <LinkA href="https://www.ccw.site/student/6107cafb76415b2f27e0d4d4/">TangDo158/Tin-Dunwi</LinkA>
        </div>
    </FullscreenSize>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Avatar from "./Avatar.vue";
import BackgroundImage from "./BackgroundImage.vue";
import FullscreenSize from "./FullscreenSize.vue";
import NameLabel from "./NameLabel.vue";
import BlockLabel from "./BlockLabel.vue";
import Catcher from "./Catcher.vue";
import Description from "./Description.vue";
import VerticalLine from "./VerticalLine.vue";
import LinkA from "./Link.vue";
import HorizontalLine from "./HorizontalLine.vue";
import ProjectCard from "./ProjectCard.vue";
import BigTitle from "./BigTitle.vue";
const bluring = ref(false);
function copy(data: string) {
    try {
        window.navigator.clipboard.writeText(data);
    } catch {
        alert("复制失败。");
    }
};
</script>
<style scoped>
.container-app {
    text-align: center;
    width: 100%;
    height: auto;
    position: absolute;
}

.main {
    padding: 50px 0;
    display: inline-block;
}

.link-2 {
    margin-left: 5px;
}
</style>