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
yarn project dev ui
```

### 使用编辑器调试

对于功能较复杂的拓展，可载入编辑器进行调试。

```bash
yarn project dev extension
```

## 配置加载目标和平台

你可以选择让框架加载一个**范例拓展**，也可以使框架加载你的**自定义拓展**。修改`config/loader.ts`中的配置项即可实现。

### 使用范例拓展

```ts
import { ExtensionLoadError } from "@framework/exceptions";
import type { LoaderConfig } from "@framework/internal";
import Extension from "@samples/read-file/extension"; //从范例加载拓展
const config: LoaderConfig = {
    target: Extension,
    errorCatches: [ExtensionLoadError], //编译拓展加载流程中发生的错误
    platform: ["TurboWarp"], //加载到TurboWarp平台
    mode: "debug" //调试模式，会自动输出一些信息
};
export default config;
```

### 使用自定义拓展

```ts
import { ExtensionLoadError } from "@framework/exceptions";
import type { LoaderConfig } from "@framework/internal";
import Extension from "@src/extension"; //从源代码目录加载拓展
const config: LoaderConfig = {
    target: Extension,
    errorCatches: [ExtensionLoadError],
    platform: ["GandiIDE"], //加载到GandiIDE平台
    mode: "release" //生产模式，不会输出其他信息
};
export default config;
```

## 基本代码结构

拓展的主要代码入口点位于`extension.ts`

## 部署翻译器

在Gandi中使用`translate.setup`有一个致命问题，后加载的拓展将会**全量覆盖**先加载的拓展的翻译库，因此可以使用一个重新制作的翻译器来解决这个问题。对于将会使用`Transifex`平台且部署于`TurboWarp拓展库`的拓展，**这个东西是没必要的**。

### 创建翻译器

翻译器需要配置基本语言及其翻译库，并使用`Translator.create`方法进行创建。不要直接new，会失去类型检查。翻译器实例的`useLegacyMode`方法将让这个翻译器自动使用runtime自带的翻译机制。记得传入一个拓展实例来让编译器能获取到runtime。

```ts
let translator = Translator.create("zh-cn", {
    name: "我的拓展",
    des: "这是我的第一个拓展"
});
// translator.useLegacyMode(MyExtension.onlyInstance);
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

此功能可能不太必要，若想要匿名发布拓展**可跳过此章节**。  
反之可以覆盖`Extension`基类的`collaborators`字段，类型为`Collaborator[]`。

```ts
export default class MyExtension extends Extension {
    collaborators: Collaborator[] = [
        new Collaborator("FallingShrimp", "https://fshrimp.fun") //名称+链接
    ];
}
```

### 定义积木【A计划】

`BlockType`命名空间中的所有方法（`BlockType.Plain`除外）都是装饰器工厂都可用于定义积木，例如其中`Command`装饰器可用于定义**无返回值**的`方形`积木，`Reporter`装饰器可用于定义`有返回值`的`圆形`积木，其他类型如`帽子`积木和`布尔`积木等同理。

`Plain`装饰器需要两个参数，第一个参数为积木类型，积木类型为`command`或`reporter`等，后一个参数传入积木上要显示的文字，其中，积木文字上可以使用一种实验性的字符串定义结构，框架能自动解析出参数名称、类型、默认值等。

所有可用的装饰器接受的积木文字均可以使用美元符号`$`和分号`;`配对或一对方括号`[]`来定义参数框，填入参数名称，后接冒号`:`为参数的类型，可选择与上文`Block.create`方法中等价的类型，再后接等于号`=`为默认值，默认值必须为字符串，框架会自动将其转换为对应的类型。

```ts
@BlockType.Command("alert [sth:string=hello] with suffix $suffix:menu=suffixes;")
alertTest(args: { sth: string, suffix: string }) {
    alert(args.sth + " " + args.suffix);
}
```

这种方式下的写法和下文的「重载」功能相同，在本应传入文字的地方传入一个字符串数据即可。

`BlockMode`命名空间下的方法可以用于声明积木的一些非必要的配置。但是用于声明积木类型（也就是`BlockType`命名空间）的装饰器必须紧挨积木的实现，也就是非必要配置项的装饰器必须在积木类型配置之上。

- **UseMonitor** 对能返回的积木使用监视器，只能用在`Reporter`或`Boolean`上。
- **ThreadRestartable** 设置事件积木的回调如果有正在运行的实例，那么允许打断它重启新的实例，只能用在`Hat`或`Event`上。
- **ActiveEdge** 强制每一帧舞台更新时都会自动执行这个事件积木的实现，如果返回了**真**则开始执行其下回调，请注意性能问题。如果不使用这个功能则需要手动写一个原生事件侦听器并在积木可执行的时机使用`runtime.startHats`来启动。只能用在`Hat`上。
- **Filt** 指定积木是用在角色上还是舞台上。

```ts
@BlockMode.Filt("sprite")
@BlockMode.UseMonitor
@BlockMode.ThreadRestartable
@BlockMode.ActiveEdge
@BlockType.Reporter([
    "计算[num1:number=114]+[num2:number=514]",
    "计算[num1:number=114]-[num2:number=514]",
    "计算[num1:number=114]*[num2:number=514]",
    "计算[num1:number=114]/[num2:number=514]"
]) calc({ num1, num2 }: { num1: number; num2: number }, overloadIndex: number) {
    const overloadMap = [
        (a: number, b: number) => a + b,
        (a: number, b: number) => a - b,
        (a: number, b: number) => a * b,
        (a: number, b: number) => a / b
    ];
    return overloadMap[overloadIndex](num1, num2);
}
```

### 定义积木【B计划】

使用`Block`类的静态方法`create`创建积木，参数依次为积木**名称**、**参数**、**执行的方法**。  

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

| 字段      | 是否必填 | 默认值   | 类型                  |
|-----------|----------|----------|-----------------------|
| name      | 是       | 无       | 字符串                |
| value     | 否       | 空字符串 | 任意                  |
| inputType | 否       | `string` | `keyof InputTypeCast` |

#### 重载

`Block.create`方法的第一个参数可以传入一个字符串数组，框架会自动将积木转换为可重载的积木按钮。

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
            value: new Menu([
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
        new Menu([
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
::: details TS

```ts
vegetables = new Menu([
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

:::

这两段代码等价于：
::: details TS

```ts
vegetables = new Menu([
    { name: "土豆", value: "potato" },
    { name: "胡萝卜", value: "carrot" },
    { name: "Unnamed vegitable", value: "Unnamed vegitable" },
    {
        name: "Named vegitable of Onion",
        value: "onion"
    }
    { name: "Cabbage白菜", value: "Cabbage白菜" }
])
sauces = new Menu([
    { name: "番茄酱", value: "ketchup" },
    { name: "蛋黄酱", value: "mayonnaise" },
    { name: "mushroom", value: "mushroom" },
    { name: "辣椒酱", value: "hot sauce" }
])
```

:::

不过这种写法需要堆砌很多`{ name: "xxx", value: "xxx" }`，因此框架省去了此轮子写法。

关于菜单`sauces`，将会被框架生成为TW格式：
::: details JSON

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

:::

菜单`vegetables`同理：
::: details JSON

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

:::

## 实验中⚠

### 自定义参数处理器

框架有一个新的loader系统，类似WebpackLoader。  
在拓展的`loaders`字段中添加一个键，类型为`InputLoader`。对应值中`load`方法为转换器的实现，`format`字段传入一个正则表达式，用于检查输入的参数是否符合格式。框架会将使用此loader的参数生成的TW格式拓展的输入类型永远设为`string`，积木的实现中收到的参数结果将会是对应loader的返回值。

如果输入的内容不符合设定的格式，或loader运行过程中报错，那么参数的对应字段将会得到`null`，你可以通过设置loader的可选字段`defaultValue`属性来设置默认值。

下面是一个例子，自动加载json字符串：

```ts
loaders: Record<string, InputLoader> = {
    json: {
        load(src) {
            return JSON.parse(src);
        },
        format: /\[(.*)\]|\{(.*)\}|"(.*)"/, //允许json对象、数组或字符串类型
        defaultValue: {}
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

### 动态调用Loader和积木方法

在积木的实现中，可以使用this.call为前缀的方法来动态调用参数loader和已实现的积木方法（出于安全性考虑，只能调用本拓展的内容），不过这个方法下请小心会发生未预料的递归爆栈。用法无需多言。

```ts
this.callLoader("json" /* 加载器的字段名 */, `{"apple":"苹果"}`) //{ apple: "苹果" }
this.callBlock("add" /* 积木的opcode */, { a: 114, b: 514 }) //628
```

### 内联菜单/响应式菜单和动态回读

#### 响应式菜单

响应式，即数据更新后自动更新界面。显然原版动态菜单不需要手动设置值，直接让函数返回一个即可。所以FSC进行了一个包装。直接修改菜单的值即可刷新，重新赋值拓展实例的字段/设置菜单实例的items值/往items里增减内容都能自动刷新编辑器内容。  
使用`MenuMode`下的`Reactive`装饰器来指定一个参数是否是响应式。

```ts
@MenuMode.Reactive(true)
appleNames = new Menu("苹果,智慧果,超凡子,Apple,林檎");
```

#### 内联状态菜单

在定义积木参数时直接给定一个菜单和其选项列表。用于不需要复用且仅仅只是为了区分一些模式的菜单参数。将参数类型设为`menu(option,option,option,...)`即可，不需要设置键值对，框架会自动处理值并在输入字段返回用户选择的菜单项的索引。

```ts
@BlockType.Reporter("苹果的索引值[appleNames:menu(智慧果,超凡子,林檎)]")
appleValues({ appleNames }: { appleNames: number }) {
    return appleNames;
}
```

#### 动态回读

使用`MenuMode.Readback`装饰器给菜单加动态回读。只有响应式菜单的动态回读才有效，每个响应式菜单都有一个默认的回读也就是返回这个菜单的所有选项，使用这个装饰器可以修改一下选项内容或者仅仅只是从其他数据里返回内容。  
回读函数可以接收两个参数，第一个参数是一个菜单实例，可能会被修改所以并不会直接返回字段初始化时设置的菜单实例，第二个参数是当前拓展实例。

```ts
/* 每次回读时对菜单项进行随机排序 */
MenuMode.Readback((menu) => menu.generated.sort(() => Random.float(-1, 1)))
MenuMode.Reactive(true)
appleNames = new Menu("苹果,智慧果,超凡子,Apple,林檎");
```

### 使用类似Rest的积木动态参数

在积木参数的配置对象中添加一个名为`rest`的字段，其内容实现`DynamicArgConfigDefine`接口，即可将这个参数转换为动态参数。每个积木只能使用一个动态参数，且因为实现原因，只能使用`string`、`number`、`bool`类型或者任意的loader，其他类型不行。当使用了loader时将会收到每个动态参数经过loader转换的结果。在积木的实现方法中收到的对应的参数字段将直接得到处理过的数组。

使用装饰器来定义积木时暂时不能用这种方法。

配置项：

**defaultValues**  
类型：字符串或其数组或一个返回字符串的函数  
作用：动态参数的默认值  
写法：

- 当填字符串时，所有动态参数都使用这个默认值
- 当填字符串数组时，动态参数在数组项足够时按顺序分配默认值，数量超出数组长度了就把数组最后一项末尾加超出的数字
- 当填函数时，接收当前正在生成的参数框的序数，可以按照序数来随便计算并且返回默认值

**joinCh**  
类型：字符串或一个返回字符串的函数  
作用：每个框中间间隔的内容  
写法：

- 当填字符串时，直接用
- 当填函数时，接收当前正在生成的参数框的序数，可以按照序数来随便计算并且返回间隔符

**preText**  
类型：同上  
作用：第一个参数框之前的文本  
写法：

- 当填字符串时，直接用
- 当填函数时，接收当前已生成的参数框的数量，可以按照数量来随便计算并且返回

**endText**  
类型：同上  
作用：最后一个参数框之后的文本  
写法：

- 当填字符串时，直接用
- 当填函数时，接收当前已生成的参数框的数量，可以按照数量来随便计算并且返回

**paramsIncrement**  
类型：整数或其数组  
作用：每次点击添加参数框时，添加的框数量  
写法：

- 当填整数时，直接用
- 当填数组时，每次一点添加框就按照数组顺序来获得对应数量，但是能添加的框数量不能超过数组长度

示例用法：

```ts
/**
 * 一个支持动态框的字符串参数，前两个框默认值分别是Hello World，之后就是World1、World2、World3...
 * 每个框之间用逗号隔开。
 */
arguments: [
    {
        name: "$array",
        inputType: "string",
        rest: {
            defaultValues: ["Hello", "World"],
            joinCh: ","
        }
    }
]
// 生成积木 => [arg1=Hello] [arg2=World] [arg3=World1] [arg4=World2] [arg5=World3] [,argX...=World(X-2)]

// 积木实现中得到的参数对象：
arg = {
    $array: ["Hello", "World", "World1", ...]
}
```

动态框模块出处与致谢：

```ts
/**
 * @description 使拓展积木支持动态参数，基于Blockly注入
 * 
 * @author Nights        - 原作者
 * @author FurryR        - 原作者
 * @author zxq           - 原作者
 * @author FallingShrimp - 优化&整合
 */
```

## 关于配置文件

### loader.ts

用于配置拓展加载时的行为，`target`字段设置目标加载的拓展，`errorCatches`设置在WaterBox中运行时将会尝试捕获哪些错误，`platform`指定目标加载的平台，`GandiIDE`或`TurboWarp`。

### server.js

用于配置开发服务器的输出和端口等通用信息。`port`指定开发服务器的端口，`output`指定生产模式输出的文件名前缀。

### webpack.js

通用于开发环境和生产环境的webpack配置，包含通用loader（ts-loader等）、导入别名、开发服务器配置等。你可以添加需要的loader来自定义导入内容。

接下来，请查看[拓展开发时的常用工具集](./api/unnecessary)、[编写无入口的独立模块](./standalone)或[已释放的通用API](./api/general)。
