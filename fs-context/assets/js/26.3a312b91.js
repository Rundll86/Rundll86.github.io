(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{352:function(a,s,t){"use strict";t.r(s);var e=t(14),r=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"前言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[a._v("#")]),a._v(" 前言")]),a._v(" "),s("h2",{attrs:{id:"项目简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目简介"}},[a._v("#")]),a._v(" 项目简介")]),a._v(" "),s("p",[s("strong",[a._v("FS-Context")]),a._v("是 "),s("s",[a._v("一个名叫"),s("strong",[a._v("FallingShrimp")]),a._v("的Furry觉得做拓展简直就是种折磨于是闲着没事研究的")]),a._v(" 一个易用的"),s("strong",[a._v("TypeScript")]),a._v("上下文，用于开发通用于"),s("code",[a._v("TurboWarp/GandiIDE")]),a._v("等ScratchMod的积木拓展。提供了一些拓展开发中较常用的工具/脚手架。")]),a._v(" "),s("p",[a._v("本项目仅仅由于个人兴趣而完成，开发目的仅为探索，也许代码也有优化空间，欢迎各位大佬提出建议。")]),a._v(" "),s("h2",{attrs:{id:"项目初衷"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目初衷"}},[a._v("#")]),a._v(" 项目初衷")]),a._v(" "),s("p",[a._v("不管在什么平台下，开发拓展都非常的折磨，缺少类型提示/自动补全/代码不易读，以及不同平台对"),s("code",[a._v("runtime")]),a._v("和"),s("code",[a._v("vm")]),a._v("的沙盒机制都有严重差异。通用拓展需要编写非常多的并不必要的冗余代码。")]),a._v(" "),s("p",[a._v("因此，本项目旨在提供一些"),s("code",[a._v("TS类型提示")]),a._v("与"),s("code",[a._v("工具集")]),a._v("，同时将不同平台加载拓展/获取vm等频繁且常用的操作封装，开发者不需要重复制造轮子，可以专注于"),s("strong",[a._v("积木逻辑")]),a._v("的开发。")]),a._v(" "),s("h2",{attrs:{id:"项目结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目结构"}},[a._v("#")]),a._v(" 项目结构")]),a._v(" "),s("div",{staticClass:"language-plaintext line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-plaintext"}},[s("code",[a._v("root\n- config/\n| - loader.ts\n| - server.js\n||| - ...\n- node_modules/\n| - ...\n- src/\n| - fs-context/\n||| - ...\n| - extension.ts\n||| - ...\n- package.json\n- tsconfig.json\n- index.html\n- webpack.config.js\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br")])]),s("h3",{attrs:{id:"文件-夹-解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件-夹-解释"}},[a._v("#")]),a._v(" 文件/夹 解释")]),a._v(" "),s("ul",[s("li",[s("code",[a._v("extension.ts")]),a._v("：拓展入口文件，定义了l10n、积木、菜单等内容")]),a._v(" "),s("li",[s("code",[a._v("fs-context")]),a._v("：框架核心代码")]),a._v(" "),s("li",[s("code",[a._v("config/loader.ts")]),a._v("：拓展加载器的配置文件")]),a._v(" "),s("li",[s("code",[a._v("config/server.js")]),a._v("：调试服务器的配置文件")]),a._v(" "),s("li",[s("code",[a._v("package.json")]),a._v("：包配置文件")]),a._v(" "),s("li",[s("code",[a._v("tsconfig.json")]),a._v("：TypeScript配置文件")]),a._v(" "),s("li",[s("code",[a._v("webpack.config.js")]),a._v("：Webpack配置文件")]),a._v(" "),s("li",[s("code",[a._v("index.html")]),a._v("：WaterBox界面的HTML模板")])]),a._v(" "),s("h2",{attrs:{id:"快速上手"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#快速上手"}},[a._v("#")]),a._v(" 快速上手")]),a._v(" "),s("details",{staticClass:"custom-block details"},[s("summary",[a._v("只需三步")]),a._v(" "),s("ol",[s("li",[a._v("安装依赖")])]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("启动开发服务器")])]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" dev:ui\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("编译生产环境代码")])]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yarn")]),a._v(" dist:ext\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("p",[a._v("对于新的拓展API文档，访问"),s("a",{attrs:{href:"./guide"}},[a._v("概念和API")])]),a._v(" "),s("h2",{attrs:{id:"欢迎贡献"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#欢迎贡献"}},[a._v("#")]),a._v(" 欢迎贡献")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/Rundll86/fs-context",target:"_blank",rel:"noopener noreferrer"}},[a._v("Github"),s("OutboundLink")],1),s("br"),a._v("\n欢迎提交"),s("code",[a._v("Issue")]),a._v("或"),s("code",[a._v("Pull Request")]),a._v("，欢迎"),s("code",[a._v("Star")]),a._v("。")]),a._v(" "),s("h3",{attrs:{id:"项目贡献者"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目贡献者"}},[a._v("#")]),a._v(" 项目贡献者")]),a._v(" "),s("Collaborator",{attrs:{name:"FallingShrimp",avatar:"https://avatars.githubusercontent.com/u/108387605",url:"https://rundll86.github.io",label:"开发,文档"}}),a._v(" "),s("Collaborator",{attrs:{name:"FurryR/熊谷 凌",avatar:"https://avatars.githubusercontent.com/u/55276797",url:"https://github.com/FurryR",label:"代码优化"}}),a._v(" "),s("Collaborator",{attrs:{name:"Cyberexplorer",avatar:"https://avatars.githubusercontent.com/u/177754635",url:"https://lanwywritexu.github.io",label:"示例拓展,测试"}}),a._v(" "),s("Collaborator",{attrs:{name:"MoreBugOfDog",avatar:"https://avatars.githubusercontent.com/u/121487216",url:"https://github.com/MoreBugOfDog",label:"精神支持"}})],1)}),[],!1,null,null,null);s.default=r.exports}}]);