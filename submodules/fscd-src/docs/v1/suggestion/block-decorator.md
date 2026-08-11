<SuggestionMeta
    send="fr"
    result="fs"
    topic="使用TS的装饰器特性定义拓展积木"
    file="structs.ts,tools.ts"
    type="功能"
>
</SuggestionMeta>

如题，使用装饰器特性，打在拓展的类方法上，实现拓展积木的自动注册。

```ts
import { BlockTypes } from "@framework/structs";
```

```ts
export default class MyExtension extends Extension {
    @BlockTypes.Command("alert [sth=Hello] to window with suffix [suffix:number=114514]")
    alertToWindow(arg: { sth: string, suffix: number}) {
        alert(arg.sth);
    }
}
```

<SuggestionResult completed />
