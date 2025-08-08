<SuggestionMeta
    send="fs"
    result="fs"
    topic="添加一个切换按钮，使积木支持类似函数重载的切换"
    file="structs.ts,index.ts"
    type="功能"
>
</SuggestionMeta>

如题，在积木声明时添加一个重载字段，写若干个重载签名然后按照实现签名的格式把参数扔给方法

```ts
import { BlockTypes } from "@framework/structs";
```

```ts
export default class MyExtension extends Extension {
    blocks = [
        Block.create([
            "计算：[a]+[b]",
            "计算：[a]-[b]",
            "计算：[a]*[b]",
            "计算：[a]/[b]",
        ],{
            arguments: [
                {name:"a",inputType:"number"},
                {name:"b",inputType:"number"}
            ]
        },function calc({a,b},overloadIndex){
            const methods=[
                (a,b) => a+b,
                (a,b) => a-b,
                (a,b) => a*b,
                (a,b) => a/b,
            ];
            return methods[overloadIndex].call(undefined,a,b);
        })
    ];
}
```

<SuggestionResult completed />
