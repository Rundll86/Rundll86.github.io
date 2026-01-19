<template>
    <BackgroundImage :disable="false" :blur="bluring" />
    <FullscreenSize class="container-app">
        <div class="main" :class="{ bluring }" @mouseover="bluring = true" @mouseleave="bluring = false">
            <SelfInformation />
            <DescriptionParagraph title="关于我">
                你好！<br>
                我是<b>陨落基围虾</b>，来自SolariiX的 <i>全栈/桌面</i> 开发爱好者。<br>
                有梦想，但仍在学习的路上，尚无法实现。
            </DescriptionParagraph>
            <DescriptionParagraph title="技能">
                用 <b>Godot</b> 和 <b>Unity</b> 做过一些游戏，但仍不太精通。<br>
                目前能熟练使用的一些前沿 <b>语言/技术栈</b>：<br>
                <BlockLabel>Python/GDScript</BlockLabel>
                <BlockLabel>(Type/Java)Script</BlockLabel>
                <BlockLabel>C#</BlockLabel>
                <VerticalLine />
                <BlockLabel>Vue - Webpack</BlockLabel>
                <BlockLabel>Electron</BlockLabel>
                <BlockLabel>Flask/httpx</BlockLabel>
                <BlockLabel>TMod - NET</BlockLabel>
            </DescriptionParagraph>
            <DescriptionParagraph title="展望">
                福瑞控，但是LGBT。<br>
                推：
                <SearchE621 target="Von Lycaon">冯·莱卡恩</SearchE621>
                <SearchE621 target="Death (Puss in Boots)">The Death</SearchE621><br>
                <OutLink href="oc.jpg">
                    <template #prompt>
                        <img src="oc.jpg" class="oc-preview">
                        <img src="avatars/shrimp-background.jpg" class="oc-preview">
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
            <template v-for="project in projects" :key="project.title">
                <ProjectCard :website="project.website" :image="project.image" :title="project.title"
                    :tech-stack="project.techStack" :category="project.category">
                    {{ project.description }}
                </ProjectCard>
            </template>
            <HorizontalLine />
            <BigTitle>友情链接</BigTitle><br>
            <div class="friend-links">
                <FriendLink v-for="friend in friends" :name="friend.name" :avatar="friend.avatar"
                    :description="friend.description" :website="friend.website" />
            </div>
        </div>
    </FullscreenSize>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import BackgroundImage from "./BackgroundImage.vue";
import FullscreenSize from "./FullscreenSize.vue";
import DescriptionParagraph from "./DescriptionParapragh.vue";
import VerticalLine from "./VerticalLine.vue";
import OutLink from "./OutLink.vue";
import HorizontalLine from "./HorizontalLine.vue";
import ProjectCard from "./ProjectCard.vue";
import BigTitle from "./BigTitle.vue";
import SearchE621 from "./SearchE621.vue";
import SelfInformation from "./SelfInformation.vue";
import BlockLabel from "./BlockLabel.vue";
import FriendLink from "./FriendLink.vue";
const bluring = ref(false);
onMounted(() => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "陨落基围虾",
        "url": "https://rundll86.github.io/",
        "image": "https://rundll86.github.io/avatar.png",
        "sameAs": [
            "https://space.bilibili.com/649063815",
            "https://github.com/Rundll86"
        ],
        "jobTitle": "全栈/桌面开发爱好者",
        "worksFor": {
            "@type": "Organization",
            "name": "SolariiX"
        },
        "description": "FallingShrimp的个人网站，展示技术项目、技能和兴趣爱好。全栈/桌面开发爱好者，专注Web技术、游戏开发和福瑞文化。"
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
});
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
interface FriendLink {
    name: string;
    website: string;
    avatar?: string;
    description: string;
}
interface ProjectData {
    website: string;
    image: string;
    title: string;
    techStack: string;
    category: string;
    description: string;
}
const friends: FriendLink[] = [
    {
        name: "SolariiX",
        website: "https://solariix.com/",
        description: "一家成立于2022年的独立游戏工作室。"
    },
    {
        name: "Yearnstudio",
        description: "一家云端技术工作室，由一群热爱技术、追求创新的开发者、设计师和创作者组成。",
        website: "https://yearn.studio",
        avatar: "阳毅"
    },
    {
        name: "阳毅",
        website: "https://yangyiit.top/",
        description: "保持热爱, 奔赴山海。"
    },
    {
        name: "TangDo158",
        website: "https://www.ccw.site/student/6107cafb76415b2f27e0d4d4/",
        description: "也许是情绪不够稳定（存疑）。"
    },
    {
        name: "主核Kernyr",
        website: "https://www.hujiarong.site/",
        description: "永远相信自己可以“不自量力”的改变世界。"
    },
    {
        name: "熊谷 凌",
        website: "https://github.com/FurryR/",
        description: "什么都写的全栈大佬，正在编写自己的博客，不谈对象。",
        avatar: "FurryR"
    },
    {
        name: "Cyberexplorer",
        website: "https://lanwywritexu.github.io/",
        description: "不要看着我以为我很傻，其实我一点也不聪明。"
    },
    {
        name: "lljl00982",
        website: "https://lljl00982.pages.dev/",
        description: ""
    }
];
const projects: ProjectData[] = [
    {
        website: "https://github.com/Rundll86/script-editor-2",
        image: "se2.jpg",
        title: "ScriptEditor",
        techStack: "Vue",
        category: "工具",
        description: "基于界面的AVG游戏剧本设计器，让不会写代码的文案师也能组织剧本。"
    },
    {
        website: "/fs-context",
        image: "fsc.jpg",
        title: "FS-Context",
        techStack: "TS",
        category: "开发框架",
        description: "一个开发上下文，使用TS类型提示和全新的脚手架开发某软件的通用拓展。"
    },
    {
        website: "https://github.com/Rundll86/ModLoaderNew",
        image: "mln.jpg",
        title: "ModLoaderNew",
        techStack: "Python",
        category: "游戏",
        description: "将自定义模型注入原神客户端，基于GIMI。封装更多工具，可能违法。"
    }
];
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

.friend-links {
    max-width: 50vw;
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
    margin: 5px;
}

.text-left {
    text-align: left;
    width: fit-content;
    display: inline-block;
}
</style>