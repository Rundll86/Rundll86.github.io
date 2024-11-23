module.exports = {
    themeConfig: {
        displayAllHeaders: true,
        sidebar: {
            "/": "auto"
        },
        smoothScroll: true,
        sidebarDepth: 6
    },
    base: "/fs-context/",
    dest: "../fs-context",
    locales: {
        "/": {
            lang: "zh-CN",
            title: "FS-Context",
            description: "一个易用的 ScratchExtension TypeScript 上下文"
        }
    }
}