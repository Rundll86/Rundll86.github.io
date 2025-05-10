<SuggestionMeta
    send="mbd"
    result="fs,mbd"
    topic="添加eslint支持"
    file="eslint.config.mjs,src/*.ts"
    type="开发工作区"
>
</SuggestionMeta>

添加包脚本，名为`lint`，执行ESlint检查，再加上自动fix的选项。

检查
```bash
yarn project lint
```
自动修复
```bash
yarn project lint +f
```
<SuggestionResult completed />
无