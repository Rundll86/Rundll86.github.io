# 编写无入口的独立模块

所有无入口独立模块都可以通过加载拓展时相同的方法来指定编译目标，框架能自动判断。
```ts{3,5}
import { ExtensionLoadError } from "@framework/exceptions";
import type { LoaderConfig } from "@framework/internal";
import Injector from "@samples/add-emoji/injector";
const config: LoaderConfig = {
    target: Injector,
    errorCatches: [ExtensionLoadError],
    platform: ["TurboWarp"],
    mode: "debug"
};
export default config;
```
运行`yarn project build standalone`即可编译模块。

## 例-Blockly注入

目前独立模块的框架只做了这一个。用法和拓展类似，如果你还没有看过[拓展教程](./)，最好先了解下。  
首先，默认导出一个实现于`BlocklyInjector(A)`的类。
```ts{2}
import { BlocklyInjector } from "@framework/tools";
export default class AppendEmojiToEnd extends BlocklyInjector { }
```
既然是要修改积木，那在注入之前就得先确定哪些积木是可以被注入的。覆写`isAvailableBlock`方法，接收一个参数指定对应的原版积木定义对象，然后返回一个布尔值指示框架是否要注入这个积木。
```ts{4-6}
import { BlocklyInjector } from "@framework/tools";
import { BlockPlain } from "@framework/internal";
export default class AppendEmojiToEnd extends BlocklyInjector {
    isAvailableBlock(blockInfo: BlockPlain) {
        return Object.hasOwn(blockInfo, "endEmoji");
    }
}
```
这个示例将会制作一个<u>将积木文字最后一个字符转换为emoji</u>的功能。配置积木时在配置对象里添加一个`endEmoji`字段就代表这个积木可用。
接下来要简单修改下原版积木上的文字，覆写`configMap`方法，接收使用自身的`isAvailableBlock`过滤之后的所有可用积木，处理好后返回即可。
```ts{7-10}
import { BlocklyInjector } from "@framework/tools";
import { BlockPlain } from "@framework/internal";
export default class MyInjector extends BlocklyInjector {
    isAvailableBlock(blockInfo: BlockPlain) {
        return Object.hasOwn(blockInfo, "endEmoji");
    }
    configMap(originBlock: BlockPlain) {
        originBlock.text = originBlock.text.slice(0, -1); //去掉文字的最后一个字符
        return originBlock;
    }
}
```
接下来要让可用的积木在初始化时自动添加一个`Input`及其`字段`在其后面，覆写`init`方法，接收Blockly的一个积木的实例，可以对积木进行各种操作了，具体功能需要看Blockly文档来实现。这里举个简单例子，添加**DummyInput**和其下`Field`。
```ts{15-17,4-6}
import { BlocklyInjector } from "@framework/tools";
import { BlockPlain } from "@framework/internal";
import { Block } from "blockly";
type AssignedConfig = {
    endEmoji: string
};
export default class MyInjector extends BlocklyInjector {
    isAvailableBlock(blockInfo: BlockPlain) {
        return Object.hasOwn(blockInfo, "endEmoji");
    }
    configMap(originBlock: BlockPlain) {
        originBlock.text = originBlock.text.slice(0, -1); //去掉文字的最后一个字符
        return originBlock;
    }
    init(block: Block, myInfo: BlockPlain & AssignedConfig): void {
        block.appendDummyInput("END_EMOJI_TEXT").appendField(myInfo.endEmoji);
    }
}
```