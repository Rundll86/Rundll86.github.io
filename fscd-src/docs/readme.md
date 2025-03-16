# 前言

## 项目简介

**FS-Context**是 ~~一个名叫**FallingShrimp**的Furry觉得做拓展简直就是种折磨于是闲着没事研究的~~ 一个易用的**TypeScript**上下文，用于开发通用于`TurboWarp/GandiIDE`等ScratchMod的积木拓展。提供了一些拓展开发中较常用的工具/脚手架。

本项目仅仅由于个人兴趣而完成，开发目的仅为探索，也许代码也有优化空间，欢迎各位大佬提出建议。

## 项目初衷

不管在什么平台下，开发拓展都非常的折磨，缺少类型提示/自动补全/代码不易读，以及不同平台对`runtime`和`vm`的沙盒机制都有严重差异。通用拓展需要编写非常多的并不必要的冗余代码。

因此，本项目旨在提供一些`TS类型提示`与`工具集`，同时将不同平台加载拓展/获取vm等频繁且常用的操作封装，开发者不需要重复制造轮子，可以专注于**积木逻辑**的开发。

## 项目结构

```python
root
- config/ #配置
| - loader.ts #拓展加载器配置
| - server.js #开发服务器配置
||| - webpack/ #Webpack相关
||||| - common.ts #通用配置
||||| - extension.ts #直接编译拓展时
||||| - waterbox.ts #使用UI调试时
||||| - standalone.ts #编译一些无功能的独立模块
- node_modules/ #依赖
| - ...
- src/ #源代码
| - fs-context/ #框架代码，勿动
||| - ...
| - extension.ts #拓展源代码
||| - ...
- package.json #包
- tsconfig.json #TS配置
- tsconfig.node.json #编译Node.js库时的TS配置
- tsconfig.webpackConfig.json #编译Webpack配置时的TS配置
- index.html #调试器界面的模板
- eslint.config.mjs #ESLint配置
- cli.cjs #项目管理器的CLI工具
```

## 快速上手

::: details 只需三步

**注意：不要使用npm作为包管理器！它会生成错误的依赖树且无法正确调用项目管理器。**
推荐使用yarn：`npm install -g yarn`

1. 安装依赖并部署配置
```bash
yarn install
yarn project init
```

2. 启动开发服务器
```bash
yarn project dev ui
```

3. 进行ESLint检查并自动修复
```bash
yarn project lint -f
```

4. 编译生产环境代码
```bash
yarn project build extension
```

:::

对于新的拓展API文档，访问[概念和API](./guide)

## 欢迎贡献

[Github](https://github.com/Rundll86/fs-context)  
欢迎提交`Issue`或`Pull Request`，欢迎`Star`。

::: details 已储存的提议和建议
<SuggestionView sender="fr" target="block-decorator" />
<SuggestionView sender="fs"target="text-parser" />
<SuggestionView sender="mbd" target="eslint-support" />
<SuggestionView sender="fs" target="arg-loader" />
<SuggestionView sender="mbd" target="rest-args" />
<SuggestionView sender="fs" target="overload-by-rest" />
:::

### 项目贡献者

<Collaborator user="fs" />
<Collaborator user="fr" />
<Collaborator user="ce" />
<Collaborator user="mbd" />