# 高级用法

## 自定义参数类型

你可以通过定义加载器来创建自定义参数类型。

```ts
// src/extension/extension.ts
import { extension, blockType } from "fs-context";

export default extension("my-extension")
    .name("My Extension")
    .description("This is my extension")
    .loader("my-loader", (value: string) => {
        // 自定义处理逻辑
        return value.toUpperCase();
    })
    .block(
        blockType.command("my-command")
            .text("Process [value:my-loader]")
            .action(({ value }) => {
                console.log(value);
            })
            .build()
    )
    .build();
```

## 菜单

你可以创建自定义菜单。

```ts
// src/extension/extension.ts
import { extension, blockType, menu } from "fs-context";

const myMenu = menu("my-menu")
    .item("Option 1", "option1")
    .item("Option 2", "option2")
    .build();

export default extension("my-extension")
    .name("My Extension")
    .description("This is my extension")
    .menu(myMenu)
    .block(
        blockType.command("my-command")
            .text("Select [option:menu=my-menu]")
            .action(({ option }) => {
                console.log(option);
            })
            .build()
    )
    .build();
```
