import { defineConfig } from "vuepress/config";
export default defineConfig({
    themeConfig: {
        sidebar: "auto",
        sidebarDepth: 5
    },
    base: "/fs-context/",
    dest: "../dist/fs-context",
    locales: {
        "/": {
            lang: "zh-CN",
            title: "FS-Context",
            description: "一个易用的 ScratchExtension TypeScript 上下文"
        }
    },
    markdown: {
        lineNumbers: true
    }
});