<template>
    <BackgroundImage :blur="bluring" />
    <FullscreenSize class="container-app">
        <div class="main" @mouseover="bluring = true" @mouseout="bluring = false">
            <SelfInformation />
            <DescriptionParagraph title="关于我">
                你好！<br>
                我是 <b>FallingShrimp</b>，来自SolariiX的 <b>全栈/游戏</b> 开发爱好者。<br>
                有梦想，但仍在学习的路上，尚无法实现。
            </DescriptionParagraph>
            <DescriptionParagraph title="技能">
                我讨厌 <b>vibe-coding</b>。<br>
                我用 <b>Godot</b> 和 <b>Unity</b> 做过一些游戏，现不太精通。<br>
                我热爱设计 <b>类型安全</b> / <b>高度IntelliSense</b> 的开发框架。<br>
                <AlignBox>
                    <span>
                        语言
                        <WhiteSpace :width="10" />
                        <BlockLabel v-for="language in languages" :key="language">{{ language }}</BlockLabel>
                    </span>
                    <br>
                    <span>
                        技术栈
                        <WhiteSpace :width="10" />
                        <BlockLabel v-for="framework in frameworks" :key="framework">{{ framework }}</BlockLabel>
                    </span>
                    <br>
                    <span>
                        正在学习
                        <WhiteSpace :width="10" />
                        <BlockLabel v-for="learning in learnings" :key="learning">{{ learning }}</BlockLabel>
                    </span>
                </AlignBox>
            </DescriptionParagraph>
            <DescriptionParagraph title="XP">
                只是一个变态兽人控罢了，bottom。<br>
                <OutLink href="oc.jpg">
                    <template #prompt>
                        <img src="oc.jpg" class="oc-preview">
                        <img src="avatars/shrimp-background.jpg" class="oc-preview">
                    </template>
                    自设/OC：希利普医生
                </OutLink><br>
                大尾巴白狼疑似命中注定。<br>
                推荐观看：<br>
                <FriendLink :people="specialFriends.lycaon" />
                <FriendLink :people="specialFriends.death" />
            </DescriptionParagraph>
            <DescriptionParagraph title="联系方式">
                邮箱：<OutLink href="mailto:3161880837@qq.com">3161880837@qq.com</OutLink><br>
                QQ：<OutLink @click="copy('3161880837')">3161880837</OutLink><br>
                <div class="links">
                    <OutLink v-for="link in otherContactWay" :href="link[1]">{{ link[0] }}</OutLink>
                </div>
            </DescriptionParagraph>
            <HorizontalLine />
            <BigTitle>development</BigTitle><br>
            <template v-for="project in projects" :key="project.title">
                <ProjectCard :website="project.website" :image="project.image" :title="project.title"
                    :tech-stack="project.techStack" :category="project.category">
                    {{ project.description }}
                </ProjectCard>
            </template>
            <HorizontalLine />
            <BigTitle>友情链接</BigTitle><br>
            <span>相关工作室</span>
            <div class="friend-links">
                <FriendLink v-for="people in studios" :people="people" :key="people.name" />
            </div>
            <span>高山流水，知音之交</span>
            <div class="friend-links">
                <FriendLink v-for="people in friends" :people="people" :key="people.name" />
            </div>
            <span>三人行，必有我师焉</span>
            <div class="friend-links">
                <FriendLink v-for="people in teachers" :people="people" :key="people.name" />
            </div>
            <span>蛋糕是个谎言</span>
            <div class="friend-links">
                <FriendLink v-for="people in cakeIsLie" :people="people" :key="people.name" />
            </div>
            <span>本网站的别名</span><br>
            <AlignBox>
                <template v-for="alias in aliases">
                    <OutLink :href="`https://${alias}`">{{ alias }}</OutLink><br>
                </template>
            </AlignBox>
        </div>
    </FullscreenSize>
</template>
<script setup lang="ts">
import { ref } from "vue";
import FullscreenSize from "./FullscreenSize.vue";
import DescriptionParagraph from "./DescriptionParapragh.vue";
import OutLink from "./OutLink.vue";
import HorizontalLine from "./HorizontalLine.vue";
import ProjectCard from "./ProjectCard.vue";
import BigTitle from "./BigTitle.vue";
import SelfInformation from "./SelfInformation.vue";
import BlockLabel from "./BlockLabel.vue";
import FriendLink from "./FriendLink.vue";
import AlignBox from "./AlignBox.vue";
import WhiteSpace from "./WhiteSpace.vue";
import BackgroundImage from "./BackgroundImage.vue";
import { aliases, frameworks, friends, cakeIsLie, languages, learnings, otherContactWay, projects, specialFriends, studios, teachers } from "@/info";
import { copy } from "@/utils";

const bluring = ref(false);
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

.links {
    display: inline-flex;
    gap: 5px;
}

.oc-preview {
    width: 200px;
    display: block;
    margin: 5px;
}

.text-left {
    text-align: left;
    width: fit-content;
    display: inline-block;
}
</style>