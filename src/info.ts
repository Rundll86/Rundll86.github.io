import { PeopleDescriptor, ProjectData } from "./structs";

export const labels: string[] = [
    "完美主义",
    "Web 全栈 / 游戏开发",
    "福瑞控 / Gay(Bottom)",
    "SolariiX",
    "Rogue / 类银 / 类魂 重度爱好者"
];
export const email = "3161880837@qq.com";
export const qq = 3161880837;
export const otherContactWay: [string, string][] = [
    ["哔哩哔哩", "https://space.bilibili.com/649063815"],
    ["Github", "https://github.com/Rundll86"],
    ["X/Twitter", "https://x.com/fallingshrimp"]
];

export const languages: string[] = [
    "TypeScript / JavaScript",
    "Rust / C#",
    "GDScript / Python"
];
export const frameworks: string[] = [
    "Vue / Nine9 (Webpack/tsup)",
    "Hono.js / Flask",
    "Tauri",
    "Unity / Godot.NET",
    "TModLoader",
];
export const learnings: string[] = [
    "片段着色器",
    "2D骨骼动画",
    "FSM Animator",
    "Tauri"
];
export const studios: PeopleDescriptor[] = [
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
];
export const teachers: PeopleDescriptor[] = [
    {
        name: "熊谷 凌",
        website: "https://github.com/FurryR/",
        description: "什么都写的全栈大佬，正在编写自己的博客，不谈对象。",
        avatar: "FurryR"
    },
];
export const cakeIsLie: PeopleDescriptor[] = [
    {
        name: "Cyberexplorer",
        website: "https://lanwywritexu.github.io/",
        description: "不要看着我以为我很傻，其实我一点也不聪明。"
    },
];
export const specialFriends: Record<"lycaon" | "death", PeopleDescriptor> = {
    lycaon: {
        name: "冯·莱卡恩",
        website: "https://e621.net/posts?tags=von_lycaon",
        description: "哎呀主播你怎么这么帅🥰看得我春水都要泛滥了🥰",
        avatar: "lycaon",
        dangerous: true
    },
    death: {
        name: "Death",
        website: "https://e621.net/posts?tags=death_(puss_in_boots)",
        description: "哎呀主播你怎么这么帅🥰看得我春水都要泛滥了🥰",
        avatar: "death",
        dangerous: true
    }
};
export const friends: PeopleDescriptor[] = [
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
];
export const projects: ProjectData[] = [
    {
        website: "https://github.com/Rundll86/script-editor-2",
        image: "se2.jpg",
        title: "ScriptEditor",
        techStack: "Vue",
        category: "工具",
        description: "基于GUI的游戏剧本设计器，让不会写代码的文案师也能组织游戏剧本。"
    },
    {
        website: "/fs-context",
        image: "fsc.jpg",
        title: "FS-Context",
        techStack: "TypeScript",
        category: "框架",
        description: "类型安全且灵活易用的框架模板，用于开发某软件的通用拓展程序。"
    },
    {
        website: "https://github.com/Rundll86/NDDrone-SDK",
        image: "nds.jpg",
        title: "NDDrone-SDK",
        techStack: "Python",
        category: "软件",
        description: "基于SSVEP BCI接口技术实现的 脑机接口-无人机飞控 桥接技术。"
    },
    {
        website: "https://github.com/Rundll86/nine",
        image: "nine.jpg",
        title: "Nine-9",
        techStack: "Vanilla",
        category: "框架",
        description: "一个轻量、超高性能、类型安全的 Vanilla DOM 响应式 UI 框架。"
    }
];

export const aliases = [
    "fshrimp.top",
    "von-lycaon.我爱你",
    "1145141919810.website",
    "91vip.website",
    "917891789178.xyz"
];
