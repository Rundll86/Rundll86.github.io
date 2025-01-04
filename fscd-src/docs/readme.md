# 前言

## 项目简介

**FS-Context**是 ~~一个名叫**FallingShrimp**的Furry觉得做拓展简直就是种折磨于是闲着没事研究的~~ 一个易用的**TypeScript**上下文，用于开发通用于`TurboWarp/GandiIDE`等ScratchMod的积木拓展。提供了一些拓展开发中较常用的工具/脚手架。

本项目仅仅由于个人兴趣而完成，开发目的仅为探索，也许代码也有优化空间，欢迎各位大佬提出建议。

## 项目初衷

不管在什么平台下，开发拓展都非常的折磨，缺少类型提示/自动补全/代码不易读，以及不同平台对`runtime`和`vm`的沙盒机制都有严重差异。通用拓展需要编写非常多的并不必要的冗余代码。

因此，本项目旨在提供一些`TS类型提示`与`工具集`，同时将不同平台加载拓展/获取vm等频繁且常用的操作封装，开发者不需要重复制造轮子，可以专注于**积木逻辑**的开发。

## 项目结构

```plaintext
root
- config/
| - loader.ts
| - server.js
||| - ...
- node_modules/
| - ...
- src/
| - fs-context/
||| - ...
| - extension.ts
||| - ...
- package.json
- tsconfig.json
- index.html
- webpack.config.js
```
### 文件/夹 解释
- `extension.ts`：拓展入口文件，定义了l10n、积木、菜单等内容
- `fs-context`：框架核心代码
- `config/loader.ts`：拓展加载器的配置文件
- `config/server.js`：调试服务器的配置文件
- `package.json`：包配置文件
- `tsconfig.json`：TypeScript配置文件
- `webpack.config.js`：Webpack配置文件
- `index.html`：WaterBox界面的HTML模板

## 快速上手

::: details 只需三步

**注意：不要使用npm来管理包！它会生成错误的依赖树！**

1. 安装依赖
```bash
yarn install
```

2. 启动开发服务器
```bash
yarn dev:ui
```

3. 进行ESLint检查
```bash
yarn lint
```

4. 自动修复ESLint错误
```bash
yarn lint:fix
```

5. 编译生产环境代码
```bash
yarn dist:ext
```
:::

对于新的拓展API文档，访问[概念和API](./guide)

## 欢迎贡献

[Github](https://github.com/Rundll86/fs-context)  
欢迎提交`Issue`或`Pull Request`，欢迎`Star`。

::: details 已储存的提议和建议
<SuggestionView
sender="fr"
topic="使用TS的装饰器特性定义拓展积木" target="block-decorator" />
<SuggestionView
sender="fs"
topic="新写法的积木文本解析器" target="text-parser" />
<SuggestionView
sender="mbd"
topic="添加eslint支持" target="eslint-support" />
<SuggestionView
sender="fs"
topic="自定义积木参数类型和对应加载器" target="arg-loader" />
<SuggestionView
sender="mbd"
topic="实现动态参数，类似Rest" target="rest-args" />
:::

### 项目贡献者

<Collaborator user="fs" />
<Collaborator user="fr" />
<Collaborator user="ce" />
<Collaborator user="mbd" />