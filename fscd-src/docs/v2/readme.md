# 前言

## 项目简介

**FS-Context**是 ~~一个名叫**陨落基围虾**的Furry觉得做拓展简直就是种折磨于是闲着没事研究的~~ 一个易用的**TypeScript**上下文，用于开发通用于各种ScratchMod的积木拓展。提供了一些拓展开发中较常用的工具/脚手架。

本项目仅仅由于个人兴趣而完成，开发目的仅为探索，也许代码也有优化空间，欢迎各位大佬提出建议。

## 项目初衷

不管在什么平台下，开发拓展都非常的折磨，缺少类型提示/自动补全/代码不易读，以及不同平台对`runtime`和`vm`的沙盒机制都有严重差异。通用拓展需要编写非常多的并不必要的冗余代码。

因此，本项目旨在提供一些`TS类型提示`与`工具集`，同时将不同平台加载拓展/获取vm等频繁且常用的操作封装，开发者不需要重复制造轮子，可以专注于**积木逻辑**的开发。

## 项目结构

```python
root
- node_modules/ #依赖
| - ...
- src/ #源代码
| - fs-context/ #框架代码，勿动
||| - ...
| - extension/
||| - blocks/ #积木代码
||| - menus/ #菜单代码
|| - extension.ts #拓展源代码
||| - ...
- package.json #包
- tsconfig.json #TS配置
- eslint.config.mjs #ESLint配置
- webpack.config.js #Webpack配置
```

## 快速上手

::: details 只需三步

**注意：不要使用npm作为包管理器！它会生成错误的依赖树且无法正确调用项目管理器。**
推荐使用yarn：`npm install -g yarn`

1. 安装依赖并部署配置

```bash
yarn install
```

2. 启动开发服务器

```bash
yarn dev tw #TurboWarp
yarn dev gandi #GandiIDE
```

3. 进行ESLint检查并自动修复

```bash
yarn check:lint
yarn check:type
```

4. 编译生产环境代码

```bash
yarn build
```

:::

对于新的拓展API文档，访问[概念和API](./guide)

## 欢迎贡献

[Github](https://github.com/Rundll86/fs-context)  
欢迎提交`Issue`或`Pull Request`，欢迎`Star`。

::: details 已储存的提议和建议
暂无
:::

### 项目贡献者

<Collaborator user="fs" />
<Collaborator user="fr" />
<Collaborator user="ce" />
<Collaborator user="mbd" />
