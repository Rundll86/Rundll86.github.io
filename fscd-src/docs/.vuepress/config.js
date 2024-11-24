module.exports = {
    themeConfig: {
        displayAllHeaders: true,
        sidebar: {
            "/": "auto"
        },
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
    },
    markdown: {
        lineNumbers: true
    },
    head: [
        ["link", { rel: "stylesheet", href: "https://cdn.staticfile.net/prism-themes/1.9.0/prism-vsc-dark-plus.min.css" }]
    ]
}