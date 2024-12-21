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
    target: import("@src/extension"), //从当前源代码目录加载模块，即别名@src
    errorCatches: [ExtensionLoadError], //捕获拓展加载时发生的错误，需要传入错误类的原型，不是实例
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

覆盖`Extension`基类的字段即可。  
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
### 定义积木

使用`Block`类的静态方法`create`创建积木，参数依次为**积木名称**、**积木参数**、**积木执行函数**。  
只有在`积木参数`中**已定义的字段**才会被解析为参数框，否则多余的方括号和美元符号等<i>**将会被转义**</i>。
```ts
Block.create(
    "弹窗 $sth ，使用后缀 _suffix",
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
)
```
积木参数的定义基于`ArgumentDefine`接口，其中`name`字段为**参数框名称**，`value`字段为**参数框默认值**。  
以下是对应字段的需求和默认值：
|字段|是否必填|默认值|类型|
|-|-|-|-|
|name|是|无|字符串|
|value|否|空字符串|任意|
|inputType|否|`string`|`keyof InputTypeCast`|

积木参数框的名称需要有`$`、`_`这两个字符的*任意一种*作为前缀。在定义`积木文字`时可以直接使用字段名来声明参数框，**无需**方括号。

### 定义菜单

可以直接将积木的`inputType`改为`menu`，然后在`value`字段传入一个`Menu`类的实例，框架能够自动识别。
```ts
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
    ]
}
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

### 更灵活的菜单项写法

框架提供了一种更灵活的写法来定义菜单项，可以防止出现轮子屎山。

方式A（如下文`vegetables`菜单）：将项目列表放入一个数组，数组中项可以直接用字符串写**菜单名称**，也可使用等于号`=`连接**菜单项名称**和**对应值**，框架会自动将**菜单项名称**作为菜单项的`name`字段，**对应值**作为菜单项的`value`字段。若没有使用等于号，框架会自动将**菜单项名称**同时作为菜单项的`name`字段和`value`字段。

方式B（如下文`sauces`菜单）：将项目列表放入一个字符串，使用英文逗号`,`分隔，项类型同上，不过在这种写法下无法使用声明对象的方式来指定`name`字段和`value`字段。
```ts
new Menu("vegetables", [
    "土豆=potato",
    "胡萝卜=carrot",
    "Unnamed vegitable",
    {
        name: "Named vegitable of Onion",
        value: "onion"
    },
    "Cabbage白菜"
])
new Menu("sauces", "番茄酱=ketchup,蛋黄酱=mayonnaise,mushroom,辣椒酱=hot sauce")
```
这两段代码等价于：
```ts
new Menu("vegetables", [
    { name: "土豆", value: "potato" },
    { name: "胡萝卜", value: "carrot" },
    { name: "Unnamed vegitable", value: "Unnamed vegitable" },
    {
        name: "Named vegitable of Onion",
        value: "onion"
    }
    { name: "Cabbage白菜", value: "Cabbage白菜" }
])
new Menu("sauces", [
    { name: "番茄酱", value: "ketchup" },
    { name: "蛋黄酱", value: "mayonnaise" },
    { name: "mushroom", value: "mushroom" },
    { name: "辣椒酱", value: "hot sauce" }
])
```
不过这种写法需要堆砌很多`{ name: "xxx", value: "xxx" }`，因此框架省去了此轮子写法。

关于菜单`sauces`，将会被框架生成为TW格式：
```json
{
    "acceptReporters": true,
    "items": [
        {
            "text": "番茄酱",
            "value": "ketchup"
        },
        {
            "text": "蛋黄酱",
            "value": "mayonnaise"
        },
        {
            "text": "mushroom",
            "value": "mushroom"
        },
        {
            "text": "辣椒酱",
            "value": "hot sauce"
        }
    ]
}
```
菜单`vegetables`同理：
```json
{
    "acceptReporters": true,
    "items": [
        {
            "text": "土豆",
            "value": "potato"
        },
        {
            "text": "胡萝卜",
            "value": "carrot"
        },
        {
            "text": "Unnamed vegitable",
            "value": "Unnamed vegitable"
        },
        {
            "text": "Named vegitable of Onion",
            "value": "onion"
        },
        {
            "text": "Cabbage白菜",
            "value": "Cabbage白菜"
        }
    ]
}
```

## 实验中⚠

### 使用TS装饰器特性定义积木

`BlockTypes`命名空间中的所有方法（`BlockTypes.Plain`除外）都是装饰器工厂都可用于定义积木，其中`Command`装饰器可用于定义**无返回值**的`方形`积木，`Reporter`装饰器可用于定义`有返回值`的`圆形`积木，其他类型如`帽子`积木和`布尔`积木等同理。

`Plain`装饰器需要两个参数，第一个参数为积木类型，积木类型为`command`或`reporter`等，后一个参数传入积木上要显示的文字，其中，积木文字上可以使用一种实验性的字符串定义结构，框架能自动解析出参数名称、类型、默认值等。

所有可用的装饰器接受的积木文字均可以使用美元符号`$`和分号`;`配对或一对方括号`[]`来定义参数框，填入参数名称，后接冒号`:`为参数的类型，可选择与上文`Block.create`方法中等价的类型，再后接等于号`=`为默认值，默认值必须为字符串，框架会自动将其转换为对应的类型。
```ts
@BlockTypes.Command("alert [sth:string=hello] with suffix $suffix:menu=suffixes;")
alertTest(args: AnyArg) {
    alert(args.sth + " " + args.suffix);
    dataStore.write("alertedSth", args.sth.toString());
    dataStore.write("lastSuffix", args.suffix.toString());
}
@BlockTypes.Plain("reporter", "get alerted sth")
getAlertedSth() {
    return dataStore.read("alertedSth");
}
```
不过，这种写法目前处于实验阶段，无法使用智能提示，且依赖TS的独有特性，未来可能会出现无法解决的bug或被弃用，因此不推荐使用。

### 自定义参数处理器

框架有一个新的loader系统，类似WebpackLoader。  
在拓展的`loaders`字段中添加一个键，类型为`InputLoader`。对应值中`load`方法为转换器的实现，`format`字段传入一个正则表达式，用于检查输入的参数是否符合格式。框架会将使用此loader的参数生成的TW格式拓展的输入类型永远设为`string`，积木的实现中收到的参数结果将会是对应loader的返回值。

下面是一个例子，自动加载json字符串：
```ts
loaders: Record<string, InputLoader> = {
    json: {
        load(src) {
            return JSON.parse(src);
        },
        format: /\[(.*)\]|\{(.*)\}|"(.*)"/ //允许json对象、数组或字符串类型
    }
};
blocks: Block<MyExtension>[] = [
    Block.create("TestBlock $sth", {
        arguments: [
            {
                name: "$sth",
                inputType: "json", //输入类型填loader的字段名
                value: `{"apple": "苹果"}`
            },
        ]
    }, function (args) {
        console.log(args); //输出{ $sth: { apple: "苹果" } }
    })
];
```
你也可以从`@framework`别名中导入一些已预定义的loader，如`json`、`html`、`vector2`、`vector3`等。只需按照简写写法同上文的格式添加到`loaders`字段中。
```ts
import { html, json, vector2, vector3 } from "@framework/built-ins/loaders";
```
```ts
loaders: Record<string, InputLoader> = {
    html,
    json,
    vector2,
    vector3
};
```
用法同上，无需多言。

## 关于配置文件

### loader.ts

用于配置拓展加载时的行为，`target`字段设置目标加载的拓展，`errorCatches`设置在WaterBox中运行时将会尝试捕获哪些错误，`platform`指定目标加载的平台，`GandiIDE`或`TurboWarp`。

### server.js

用于配置开发服务器的输出和端口等通用信息。`port`指定开发服务器的端口，`output`指定生产模式输出的文件名前缀。

### webpack.js

通用于开发环境和生产环境的webpack配置，包含通用loader（ts-loader等）、导入别名、开发服务器配置等。你可以添加需要的loader来自定义导入内容。

接下来，请查看[拓展开发时的常用工具集](./api/unnecessary)或[已释放的通用API](./api/general)