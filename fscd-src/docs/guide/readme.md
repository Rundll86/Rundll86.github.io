# 快速开始

在开始开发前，需要先进行一些准备。  
接下来所有教程的工作目录均位于`./src`目录内。要访问该目录给的内容，可使用`@src`别名来代替相对导入。

## 还原依赖

```bash
yarn install
```

## 启动开发服务器

框架提供了两种调试拓展的方法。

### 使用界面调试

对于积木作用域和整体vm需求较小的拓展，可在WaterBox界面中调试。

```bash
yarn dev:ui
```

### 使用编辑器调试

对于功能较复杂的拓展，可载入编辑器进行调试。

```bash
yarn dev:ext
```

## 配置加载目标和平台

你可以选择让框架加载一个`范例拓展`，也可以使框架加载你的`自定义拓展`。修改`config/loader.ts`中的配置项即可实现。

### 使用范例拓展

```ts
type LoaderConfig = import("@framework/internal").LoaderConfig;
const config: LoaderConfig = {
    target: import("@samples/fs-iframe/extension"), //从@samples别名中加载模块
    errorCatches: [], //不捕获任何运行时错误
    platform: ["TurboWarp"] //加载到TW
}
export default { ...config };
```

### 使用自定义拓展

```ts
type LoaderConfig = import("@framework/internal").LoaderConfig;
const config: LoaderConfig = {
    target: "@src/extension", //从当前源代码目录加载模块，即别名@src
    errorCatches: ["ExtensionLoadError"], //捕获拓展加载时发生的错误
    platform: ["GandiIDE", "TurboWarp"] //加载到Gandi和TW
}
export default { ...config };
```

# 基本代码结构

拓展的主要代码入口点位于`extension.ts`

## 部署翻译器

在Gandi中使用`translate.setup`有一个致命问题，*后加载的拓展*将会**全量覆盖***先加载的拓展*的翻译库，因此我们使用一个新定义的翻译器来解决这个问题。  
对于将会使用`Transifex`平台且部署于`TurboWarp拓展库`的拓展，**可跳过此章节**。

### 创建翻译器

翻译器需要配置基本语言及其翻译库，并使用`Translator.create`方法进行创建。不要直接new，会失去类型检查。
```ts
let translator = Translator.create("zh-cn", {
    name: "我的拓展",
    des: "这是我的第一个拓展"
});
```
储存其他语言的翻译库时，使用`translator.store`方法，将会自动提示需要的键。
```ts
translator.store("en", {
    name: "My Extension",
    des: "This is my first extension"
});
```

## 指定目标拓展

将拓展的类原型作为一个**默认导出**，框架会自动加载。
```ts
export default class MyExtension extends Extension { }
```

## 设置拓展的元数据

### ID、Name、Version、Description

覆盖`Extension`基类的id和displayName字段即可。  
拓展的元数据本质上是字符串，因此可以使用`translator.load`方法进行翻译。
```ts
export default class MyExtension extends Extension {
    id = "myextension";
    displayName = translator.load("name");
    version = new Version(1, 0, 0);
    description = translator.load("des");
}
```

### 主题色

覆盖`Extension`基类的`color字段`即可，类型为`ColorDefine`接口。  
可直接覆写`color`中的`theme`字段，框架可根据主题色自动推断**三个分别变深的颜色**。
```ts
export default class MyExtension extends Extension {
    color: ColorDefine = {
        theme: "#ff0000" //红色
    };
}
```
也可以**禁用**框架的自动推断功能，自定义设置三个主题颜色，字段`block`、`inputer`、`menu`分别对应**积木颜色**、**输入框颜色**、**菜单颜色**。  
记得要将字段`autoDeriveColors`设为`false`。
```ts
export default class MyExtension extends Extension {
    autoDeriveColors = false;
    color: ColorDefine = {
        block: "#ff0000", //红色
        inputer: "#00ff00", //绿色
        menu: "#0000ff" //蓝色
    };
}
```

### 拓展贡献者列表

此功能可能不太必要，若有想要匿名发布拓展**可跳过此章节**。  
反之可以覆盖`Extension`基类的`collaborators`字段，类型为`Collaborator[]`。
```ts
export default class MyExtension extends Extension {
    collaborators: Collaborator[] = [
        new Collaborator("FallingShrimp", "https://f-shrimp.solariix.com") //名称+链接
    ];
}
```

### 定义积木和菜单

#### 积木

使用`Block`类的静态方法`create`创建积木，参数依次为**积木名称**、**积木参数**、**积木执行函数**。  
只有在`积木参数`中**已定义的字段**才会被解析为参数框，否则多余的方括号和美元符号等<i>**将会被转义**</i>。
```ts
let translator = Translator.create("zh-cn", {
    name: "我的拓展",
    des: "这是我的第一个拓展",
    alert: "弹窗 $sth 到窗口中，使用后缀[_suffix]"
});
export default class MyExtension extends Extension {
    blocks = [
        Block.create(
            translator.load("alert"),
            {
                arguments: [
                    {
                        name: "$sth",
                        value: "Hello World",
                        inputType: "string"
                    },
                    {
                        name: "_suffix",
                        value: "已弹窗",
                        inputType: "string"
                    }
                ],
            },
            function alertSth(args) {
                alert(args.$sth + " " + args._suffix);
            }
        ),
    ]
}
```
积木参数的定义基于`ArgumentDefine`接口，其中`name`字段为**参数框名称**，`value`字段为**参数框默认值**。  
以下是对应字段的需求和默认值：
|字段|是否必填|默认值|
|-|-|-|
|name|是|无|
|value|否|空字符串|
|inputType|否|`string`|

积木参数框的名称需要有`$`、`_`这两个字符的*任意一种*作为前缀。在定义`积木文字`时可以直接使用字段名来声明参数框，**无需**方括号。

#### 菜单

可以直接将积木的`inputType`改为`menu`，然后在`value`字段传入一个`Menu`类的实例，框架能够自动识别。
```ts
Block.create(
    translator.load("alert"),
    {
        arguments: [
            {
                name: "$sth",
                value: "Hello World",
                inputType: "string"
            },
            {
                name: "_suffix",
                value: new Menu("suffixes", [
                    { name: "已打印", value: "printed" },
                    { name: "已输出", value: "output" },
                    { name: "已显示", value: "displayed" }
                ]),
                inputType: "menu"
            }
        ],
    },
    function alertSth(args) {
        alert(args.$sth + " " + args._suffix);
    }
)
```
也可以在拓展数据中覆写`Extension`基类的`menus`字段，作为一个`Menu[]`。
```ts
export default class MyExtension extends Extension {
    menus = [
        new Menu("suffixes", [
            { name: "已打印", value: "printed" },
            { name: "已输出", value: "output" },
            { name: "已显示", value: "displayed" }
        ])
    ];
}
```
菜单的定义基于`Menu`类，其中`name`字段为**菜单名称**，`items`字段为**菜单项**。菜单默认允许了`acceptReporters`，不需要手动声明。

接下来在积木中引用**菜单名称**也可实现菜单类型的参数框。
```ts
Block.create(
    translator.load("alert"),
    {
        arguments: [
            {
                name: "$sth",
                value: "Hello World",
                inputType: "string"
            },
            {
                name: "_suffix",
                value: "suffixes",
                inputType: "menu",
            }
        ],
    },
    function alertSth(args) {
        alert(args.$sth + " " + args._suffix);
    }
)
```

接下来，请查看[拓展开发时的常用工具集](./api/unnecessary)或[已释放的通用API](./api/general)