# 快速开始

## 初始化

安装下依赖。

```bash
yarn install
```

## 创建扩展

在 `src/extension/` 目录下创建你的扩展代码。你可以参考以下示例：

```ts
// src/extension/extension.ts
import { extension, blockType } from "fs-context";

export default extension("my-extension")
    .name("My Extension")
    .description("This is my extension")
    .block(
        blockType.command("my-command")
            .text("Say [message]")
            .action(({ message }) => {
                alert(message);
            })
            .build()
    )
    .build();
```

## 启动开发服务器

你可以使用以下命令启动开发服务器：

```bash
yarn dev tw # TurboWarp
yarn dev gandi # GandiIDE
```

## 构建生产版本

使用以下命令构建生产版本：

```bash
yarn build
```

## API 指南

有关 API 的详细信息，请参阅 [API 指南](./api.md)。

## 高级用法

有关高级用法的详细信息，请参阅 [高级用法](./advanced.md)。
