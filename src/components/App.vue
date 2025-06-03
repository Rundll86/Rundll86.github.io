<template>
    <BackgroundImage :disable="false" :blur="bluring" />
    <FullscreenSize class="container-app">
        <div class="main" :class="{ bluring }" @mouseover="bluring = true" @mouseleave="bluring = false">
            <AvatarImage /><br>
            <NameLabel>FallingShrimp</NameLabel><br>
            <BlockLabel>完美主义</BlockLabel>
            <BlockLabel>Web</BlockLabel>
            <BlockLabel>桌面</BlockLabel>
            <BlockLabel>游戏</BlockLabel>
            <BlockLabel>福瑞控</BlockLabel>
            <BlockLabel>SolariiX</BlockLabel><br>
            <CatcherText>好看的皮囊千篇一律，有趣的灵魂万里挑一</CatcherText>
            <DescriptionParagraph title="关于我">
                你好！<br>
                我是<b>陨落基围虾</b>，来自SolariiX的 <i>全栈/桌面</i> 开发爱好者。<br>
                有梦想，但仍在学习的路上，尚无法实现。
            </DescriptionParagraph>
            <DescriptionParagraph title="技能">
                用 <b>Godot</b> 和 <b>Unity</b> 做过一些游戏，但仍不太精通。<br>
                目前能熟练使用的一些前沿 <b>语言/技术栈</b>：<br>
                <BlockLabel>Python/GDScript</BlockLabel>
                <BlockLabel>Type/JavaScript</BlockLabel>
                <BlockLabel>C#/Java</BlockLabel>
                <VerticalLine />
                <BlockLabel>Webpack</BlockLabel>
                <BlockLabel>Electron</BlockLabel>
                <BlockLabel>Flask</BlockLabel>
            </DescriptionParagraph>
            <DescriptionParagraph title="展望">
                福瑞控，但是LGBT。<br>
                推：
                <SearchE621 target="Von Lycaon">冯·莱卡恩</SearchE621>
                <SearchE621 target="Death (Puss in Boots)">The Death</SearchE621><br>
                <OutLink href="oc.jpg">
                    <template #prompt>
                        <img src="oc.jpg" class="oc-preview">
                    </template>
                    自设/OC：希利普医生
                </OutLink><br>
                大尾巴白狼疑似命中注定。
            </DescriptionParagraph>
            <DescriptionParagraph title="联系方式">
                邮箱：<OutLink href="mailto:3161880837@qq.com">3161880837@qq.com</OutLink><br>
                QQ：<OutLink @click="copy('3161880837')">3161880837</OutLink><br>
                <OutLink href="https://space.bilibili.com/649063815">哔哩哔哩</OutLink>
                <OutLink class="link-2" href="https://github.com/Rundll86">Github</OutLink>
            </DescriptionParagraph>
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
            <OutLink href="https://solariix.com/">SolariiX</OutLink><br>
            <OutLink href="https://github.com/FurryR/">熊谷 凌/FurryR</OutLink><br>
            <OutLink href="https://lanwywritexu.github.io/">Cyberexplorer</OutLink><br>
            <OutLink href="https://furryaria.top/">Aria</OutLink><br>
            <OutLink href="https://daiqitao.github.io/">DAIQITAO</OutLink><br>
            <OutLink href="https://www.ccw.site/student/6107cafb76415b2f27e0d4d4/">TangDo158</OutLink><br>
            <OutLink href="https://lljl00982.pages.dev/">lljl00982</OutLink><br>
            <OutLink href="https://vuejs.org">Vue</OutLink>
            +
            <OutLink href="https://webpackjs.com">Webpack</OutLink>
        </div>
    </FullscreenSize>
</template>
<script setup lang="ts">
import { ref } from "vue";
import AvatarImage from "./AvatarImage.vue";
import BackgroundImage from "./BackgroundImage.vue";
import FullscreenSize from "./FullscreenSize.vue";
import NameLabel from "./NameLabel.vue";
import BlockLabel from "./BlockLabel.vue";
import CatcherText from "./CatcherText.vue";
import DescriptionParagraph from "./DescriptionParapragh.vue";
import VerticalLine from "./VerticalLine.vue";
import OutLink from "./OutLink.vue";
import HorizontalLine from "./HorizontalLine.vue";
import ProjectCard from "./ProjectCard.vue";
import BigTitle from "./BigTitle.vue";
import SearchE621 from "./SearchE621.vue";
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