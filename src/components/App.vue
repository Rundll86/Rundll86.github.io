<template>
    <BackgroundImage :disable="false" :blur="bluring" />
    <FullscreenSize class="container-app">
        <div class="main" :class="{ bluring }" @mouseover="bluring = true" @mouseleave="bluring = false">
            <Avatar /><br>
            <NameLabel>FallingShrimp</NameLabel><br>
            <BlockLabel>完美主义</BlockLabel>
            <BlockLabel>Web</BlockLabel>
            <BlockLabel>桌面</BlockLabel>
            <BlockLabel>游戏</BlockLabel>
            <BlockLabel>福瑞控</BlockLabel>
            <BlockLabel>SolariiX</BlockLabel><br>
            <Catcher>好看的皮囊千篇一律，有趣的灵魂万里挑一</Catcher>
            <Description title="关于我">
                你好！<br>
                我是<b>陨落基围虾</b>，来自SolariiX的 <i>全栈/桌面</i> 开发爱好者。<br>
                有梦想，但仍在学习的路上，尚无法实现。
            </Description>
            <Description title="技能">
                用 <b>Godot</b> 和 <b>Unity</b> 做过一些游戏，但仍不太精通。<br>
                目前能熟练使用的一些前沿 <b>语言/技术栈</b>：<br>
                <BlockLabel>Python/GDScript</BlockLabel>
                <BlockLabel>Type/JavaScript</BlockLabel>
                <BlockLabel>C#/Java</BlockLabel>
                <VerticalLine />
                <BlockLabel>Webpack</BlockLabel>
                <BlockLabel>Electron</BlockLabel>
                <BlockLabel>Flask</BlockLabel>
            </Description>
            <Description title="展望">
                福瑞控，但是LGBT。<br>
                <div class="text-left">
                    <LinkA href="https://e621.net/posts?tags=von_lycaon">
                        <template #prompt>
                            跳转的页面可能会引起你的不适，请谨慎斟酌
                        </template>
                        推：冯·莱卡恩（《绝区零》）
                    </LinkA><br>
                    <LinkA href="https://e621.net/posts?tags=death_%28puss_in_boots%29">
                        <template #prompt>
                            跳转的页面可能会引起你的不适，请谨慎斟酌
                        </template>
                        推：The Death（《穿靴子的猫》）
                    </LinkA><br>
                    <LinkA href="oc.jpg">
                        <template #prompt>
                            <img src="oc.jpg" class="oc-preview">
                        </template>
                        自设/OC：希利普医生
                    </LinkA>
                </div><br>
                大尾巴白狼疑似命中注定。
            </Description>
            <Description title="联系方式">
                邮箱：<LinkA href="mailto:3161880837@qq.com">3161880837@qq.com</LinkA><br>
                QQ：<LinkA @click="copy('3161880837')">3161880837</LinkA><br>
                <LinkA href="https://space.bilibili.com/649063815">哔哩哔哩</LinkA>
                <LinkA class="link-2" href="https://github.com/Rundll86">Github</LinkA>
            </Description>
            <HorizontalLine />
            <BigTitle>development</BigTitle><br>
            <ProjectCard website="https://github.com/Rundll86/script-editor-2" image="se2.jpg" title="ScriptEditor"
                tech-stack="Vue" category="工具">
                基于界面的AVG游戏剧本设计器，让不会写代码的文案师也能组织剧本。
            </ProjectCard>
            <ProjectCard website="https://github.com/Rundll86//fs-context" image="fsc.jpg" title="FS-Context"
                tech-stack="TS" category="开发框架">
                一个开发上下文，使用TS类型提示和全新的脚手架开发某软件的通用拓展。
            </ProjectCard>
            <ProjectCard website="https://github.com/Rundll86/ModLoaderNew" image="mln.jpg" title="ModLoaderNew"
                tech-stack="Python" category="游戏">
                将自定义模型注入原神客户端，基于GIMI。封装更多工具，可能违法。
            </ProjectCard>
            <HorizontalLine />
            <BigTitle>友情链接</BigTitle><br>
            <LinkA href="https://solariix.com/">SolariiX</LinkA><br>
            <LinkA href="https://github.com/FurryR/">熊谷 凌/FurryR</LinkA><br>
            <LinkA href="https://lanwywritexu.github.io/">Cyberexplorer</LinkA><br>
            <LinkA href="https://furryaria.top/">Aria</LinkA><br>
            <LinkA href="https://daiqitao.github.io/">DAIQITAO</LinkA><br>
            <LinkA href="https://www.ccw.site/student/6107cafb76415b2f27e0d4d4/">TangDo158</LinkA><br>
            <LinkA>Vue3+Webpack</LinkA>
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
window.mouse = ref([0, 0]);
window.addEventListener("mousemove", (e) => {
    window.mouse.value = [e.clientX, e.clientY];
});
</script>
<style scoped>
.container-app {
    text-align: center;
    width: 100%;
    height: auto;
    position: absolute;
}

.main.bluring {
    opacity: 1;
}

.main {
    padding: 50px 0;
    display: inline-block;
}

.link-2 {
    margin-left: 5px;
}

.oc-preview {
    width: 200px;
    display: block;
}

.text-left {
    text-align: left;
    width: fit-content;
    display: inline-block;
}
</style>