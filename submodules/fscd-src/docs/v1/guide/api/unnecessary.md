# 拓展开发中的工具集

框架中提供了一些工具。

## 调试器...（感觉好鸡肋）

开发拓展总是需要调试的，每次都进入编辑器重载未免显得麻烦。因此框架提供了一个独立调试器，名为`WaterBox`。这是一个基于浏览器的调试器，因此需要浏览器支持。在`WaterBox`中，你可以尽情重载拓展的代码，调试积木逻辑，并且可以查看拓展的输出和积木返回值。

### WaterBox

#### 启动

重建依赖库，在[快速开始](..)处以有，此处不再赘述。

在项目根目录下运行`yarn project dev ui`，即可启动WaterBox。  
WaterBox会自动打开浏览器，并跳转到`http://localhost:25565`，如果浏览器没有自动打开，请手动打开。  
网页下方会有一个方框用于显示拓展积木，上方有一个`canvas`用于预览舞台。点击`重载拓展`按钮可刷新数据库内容。

#### 使用

1. 点击积木的`Run`按钮，可根据输入执行积木函数。
2. 点击积木的`View`按钮，可查看当前积木的opcode、blockType、arguments等信息。
3. 点击积木的`Arg`按钮，可查看当前积木输入的对应参数对象。

## 可能不太必要的

接下来提到的的所有**命名空间**均在`@framework/tools`可以找到。

### ⚠️️过时-全局上下文

**此用法已过时，但暂时没有找到更合适的替代。**

使用`GlobalContext`命名空间的`createDataStore`方法可以创建一个基于全局变量的数据库，将拓展的数据导出便于调试，也可以便于联动其他拓展。  
方法的第一个参数传入一个字符串或拓展派生于`Extension`的类的原型，第二个参数传入一个对象，对象中的字段将会被导出到全局上下文。

```ts
let dataStore = GlobalContext.createDataStore(MyExtension, {
    alertedSth: [] as string[], //类型断言，转换成string[]，否则会被自动推断为never[]
    lastSuffix: ""
});
```

现在修改积木的执行函数，将弹窗的内容添加到数据库中。

```ts
function alertSth(args) {
    alert(args.$sth + " " + args._suffix);
    //数据字段为数组时，能自动判断并且添加元素而不是直接覆盖
    dataStore.write("alertedSth", args.$sth.toString());
    dataStore.write("lastSuffix", args._suffix.toString());
}
```

现在打开浏览器的开发者工具，在控制台中输入`_FSContext.EXPORTED.[拓展ID]`即可查看数据库的内容。

#### 与其他拓展联动

在任意时刻，都可以使用`GlobalContext`命名空间的`getDataStore`方法来获取其他拓展的已导出数据。

```ts
function alertSth(args) {
    alert(args.$sth + " " + args._suffix);
    dataStore.write("alertedSth", args.$sth.toString());
    dataStore.write("lastSuffix", args._suffix.toString());
    //------------------------------------------↓↓↓其他拓展的数据库的类型声明↓↓↓
    let otherDataStore = GlobalContext.getDataStore<{ lastSuffix: string }>("其他拓展ID");
    dataStore.write("alertedSth", otherDataStore.read("alertedSth")[0]); //将其他拓展的数据写入自己的数据库
    otherDataStore.write("lastSuffix", args._suffix.toString()); //将自己的数据写入其他拓展的数据库
}
```

### 链式生成组件树

使用`DOM`命名空间的`elementTree`方法可链式生成组件树，该方法返回一个`ElementContext`接口的实现，该对象具有`child`方法用于添加子组件，`class`方法用于添加类名，`attribute`方法用于添加属性，`style`方法用于添加样式。

```ts
import { DOM } from "@framework/tools";
let tree = DOM.elementTree("div", [
    //子元素
    DOM.elementTree("span")
        .attribute("innerText", "hello")
        .style("color", "orange"),
    DOM.elementTree("span")
        .attribute("innerText", "test")
        .style("color", "green")
])
    .class("my-class", "another-class", "anymore---")
    .attribute("data-attr", "value")
    .style("color", "red");
```

这棵树最终会被渲染成：

```html
<div class="my-class another-class anymore---" data-attr="value" style="color: red;">
    <span style="color: orange;">hello</span>
    <span style="color: green;">test</span>
</div>
```

### 舞台叠加层

在舞台上创建一个叠加层元素，用于放置一些界面。使用`DOM.createStageOverlay`方法并传入一个拓展的实例即可。会返回创建好的叠加层元素，可在第二个参数指定一个具体HTML元素的节点名称。

```ts
import { DOM } from "@framework/tools";
const span = DOM.createStageOverlay(extension, "span"); //HTMLSpanElement
span.innerText = "福瑞占领世界！";
```

### 生成随机数、颜色、字符串等

使用`Random`命名空间的方法生成随机内容，用法无需多言。

```ts
import { Random } from "@framework/tools";
let randomInt = Random.integer(0, 100);
let randomFloat = Random.float(0, 10.0);
let randomColor = Random.color();
let randomString = Random.string(10, "abcdefABCDEF123456");
```

### ⚠️过时-处理积木文字

#### ⚠️-切割得到参数框

**此用法已过时，请改用下文[TextParser](#积木文字解析器)**

使用`LegacyParser.splitArgBoxPart`方法，切割传入积木文字，得到每个参数框按照对应位置排序的名称数组。

```ts
import { LegacyParser } from "@framework/tools";
let args = LegacyParser.splitArgBoxPart("alert $sth $sth $sth to window with _suffix", ["$sth", "_suffix"]);
console.log(args); //输出["$sth", "$sth", "$sth", "_suffix"]
```

#### ⚠️-切割得到参数框外的文字

**此用法已过时，请改用下文[TextParser](#积木文字解析器)**

使用`LegacyParser.splitTextPart`方法，切割传入积木文字，得到参数框外的文字数组。

```ts
import { LegacyParser } from "@framework/tools";
let args = LegacyParser.splitTextPart("alert $sth $sth $sth to window with _suffix", ["$sth", "_suffix"]);
console.log(args); //输出["alert ", " to window with ", ""]
```

### 处理颜色

#### HEX转RGB数组

使用`Color.hexToRgb`方法，将传入的HEX颜色值转换成RGB数组。无需多言。

```ts
import { Color } from "@framework/tools";
let rgb = Color.hexToRGB("#FF00FF");
console.log(rgb); //输出[255, 0, 255]
```

#### 使颜色加深（混入黑色）

使用`Color.darken`方法来加深颜色，即降低HSL亮度。首先传入一个HEX颜色，再传入加深的比例。

```ts
import { Color } from "@framework/tools";
let hex = Color.darken("#FF00FF", 0.5);
console.log(hex); //输出"#800080"
```

#### 使颜色变浅（混入白色）

使用`Color.lighten`方法来变浅颜色，即提高HSL亮度。首先传入一个HEX颜色，再传入变浅的比例。

```ts
import { Color } from "@framework/tools";
let hex = Color.lighten("#FF00FF", 0.5);
console.log(hex); //输出"#FF80FF"
```

### 定义的积木参数输入类型投射到TW类型

使用`Cast.castInputType`方法，将传入的积木参数类型投射到TW类型。

```ts
import { Cast } from "@framework/tools";
let type = Cast.castInputType("string");
console.log(type); //输出"string"
let type = Cast.castInputType("bool");
console.log(type); //输出"Boolean"
let type = Cast.castInputType("hat-parameter");
console.log(type); //输出"ccw_hat_parameter"
```

### 一些新写法的解析器

#### 菜单解析器

`MenuParser`命名空间提供了一个用来解析新写法菜单的工具集。新菜单的写法请前往[快速开始](../#更灵活的菜单项写法)查看。

解析器的核心方法为`normalize`，可将新写法自动解析为完全机器可读的对象。只需传入按照新写法编写的菜单项列表即可。
::: details TS

```ts
import { MenuParser } from "@framework/tools";
MenuParser.normalize("苹果=apple,梨子=pear,香蕉=banana");
//返回↓
/*
[
    {
        name: "苹果",
        value: "apple"
    },
    {
        name: "梨子",
        value: "pear"
    },
    {
        name: "香蕉",
        value: "banana"
    }
]
*/
MenuParser.normalize("苹果,梨子,香蕉");
//返回↓
/*
[
    {
        name: "苹果",
        value: "苹果"
    },
    {
        name: "梨子",
        value: "梨子"
    },
    {
        name: "香蕉",
        value: "香蕉"
    }
]
*/
MenuParser.normalize([
    "苹果",
    "梨子=pear",
    {
        name: "香蕉",
        value: "banana"
    }
]);
//返回↓
/*
[
    {
        name: "苹果",
        value: "苹果"
    },
    {
        name: "梨子",
        value: "pear"
    },
    {
        name: "香蕉",
        value: "banana"
    }
]
*/
```

:::

使用`trimSpace`可去除内容两边空格，会自动判断是否传入了字符串，若不是字符串则无需去除，直接返回自身。
::: details TS

```ts
import { MenuParser } from "@framework/tools";
MenuParser.trimSpace("  苹果  "); //"苹果"
MenuParser.trimSpace("  梨子 = pear  "); //"梨子 = pear"
MenuParser.trimSpace({
    name: "香蕉",
    value: "banana"
});
/*
{
    name: "香蕉",
    value: "banana"
}
*/
```

:::

使用`trimSpaceMenuItem`可去除可读对象两边的空格，只会返回`name`和`value`两个字段。
::: details TS

```ts
import { MenuParser } from "@framework/tools";
MenuParser.trimSpaceMenuItem({
    name: "  香蕉  ",
    value: " banana "
});
/*
{
    name: "香蕉",
    value: "banana"
}
*/
```

:::

使用`parseKeyValue`来解析一个使用等于号连接的键值对字符串。会自动去除两头空格。
::: details TS

```ts
import { MenuParser } from "@framework/tools";
MenuParser.parseKeyValue("苹果=apple");
/*
{
    name: "苹果",
    value: "apple"
}
*/
MenuParser.parseKeyValue("梨子 = pear");
/*
{
    name: "梨子",
    value: "pear"
}
*/
```

:::

使用`splitStringArray`来切割字符串数组，会自动去除两头空格。
::: details TS

```ts
import { MenuParser } from "@framework/tools";
MenuParser.splitStringArray("苹果,梨子,香蕉");
/*
[
    "苹果",
    "梨子",
    "香蕉"
]
*/
```

:::

使用`isStringArray`和`isKeyValueString`来分别判断传入的参数是否为字符串数组或键值对字符串。
::: details TS

```ts
import { MenuParser } from "@framework/tools";
MenuParser.isStringArray("苹果,梨子,香蕉"); //true
MenuParser.isStringArray("苹果梨子香蕉"); //false
MenuParser.isKeyValueString("苹果=apple,梨子=pear,香蕉=banana"); //false，已经是字符串数组了
MenuParser.isKeyValueString("苹果=apple"); //true
```

:::

#### 积木文字解析器

`TextParser`命名空间提供了一个用来解析新写法（实验性）积木文字的工具集。新积木文字的写法请前往[快速开始](../#使用TS装饰器特性定义积木)查看。

解析器的核心方法为`parsePart`，可将新写法自动解析为完全机器可读的对象。只需传入按照新写法编写的积木文字的字符串即可。
::: details TS

```ts
import { TextParser } from "@framework/tools";
TextParser.parsePart("text1 [argA] text2");
//返回↓
/*
[
    ArgumentPart("text1", "text"),
    ArgumentPart("argA", "input", "", "string"),
    ArgumentPart("text2", "text")
]
*/
TextParser.parsePart("text1 [argA:bool] text2");
//返回↓
/*
[
    ArgumentPart("text1", "text"),
    ArgumentPart("argA", "input", false, "bool"),
    ArgumentPart("text2", "text")
]
*/
TextParser.parsePart("text1 [argA=福瑞占领世界] text2");
//返回↓
/*
[
    ArgumentPart("text1", "text"),
    ArgumentPart("argA", "input", "福瑞占领世界", "string"),
    ArgumentPart("text2", "text")
]
*/
TextParser.parsePart("text1 [argA:number=114514] text2");
//返回↓
/*
[
    ArgumentPart("text1", "text"),
    ArgumentPart("argA", "input", 114514, "number"),
    ArgumentPart("text2", "text")
]
*/
```

:::

使用`split`方法来切割文字和参数框部分，会保留空字符串，用于分别处理后合并。不会自动解析对应的参数框部分，需要手动调用解析方法或进行一些其他处理。

返回值有两个字段：`text`和`arg`，分别为文字部分和参数框部分。
::: details TS

```ts
import { TextParser } from "@framework/tools";
TextParser.split("text1 [argA] text2 [argB:bool=true]");
//返回↓
/*
{
    text: ["text1 ", " text2"],
    arg: ["argA", "argB:bool=true"]
}
*/
```

:::

以`parse`为名称前缀的方法均为解析参数属性的函数。

| 名称              | 参数   | 返回值 | 说明     |
|-------------------|--------|--------|----------|
| parseName         | 字符串 | 字符串 | 名称     |
| parseType         | 字符串 | 字符串 | 输入类型 |
| parseDefaultValue | 字符串 | 字符串 | 默认值   |

::: details TS

```ts
import { TextParser } from "@framework/tools";
const arg = "argA:bool=true";
TextParser.parseName(arg); //"argA"
TextParser.parseType(arg); //"bool"
TextParser.parseDefaultValue(arg); //Boolean(true)
```

:::

以`has`为名称前缀的方法同理，不过参数必须有名称，所以也就不存在`hasName`这一说了。

| 名称            | 参数   | 返回值 | 说明         |
|-----------------|--------|--------|--------------|
| hasType         | 字符串 | 布尔值 | 是否有类型   |
| hasDefaultValue | 字符串 | 布尔值 | 是否有默认值 |

::: details TS

```ts
import { TextParser } from "@framework/tools";
const arg = "argA:bool=true";
TextParser.hasType(arg); //true
TextParser.hasDefaultValue(arg); //true
const arg2 = "argB";
TextParser.hasType(arg2); //false
TextParser.hasDefaultValue(arg2); //false
const arg3 = "argC:bool";
TextParser.hasType(arg3); //true
TextParser.hasDefaultValue(arg3); //false
```

:::

若需要动态调用判断方法，为了防止出现报错，尝试调用`TextParser.hasName`时不会出现报错，但不管传入什么参数，都会永远返回`true`。
::: details TS

```ts
import { TextParser } from "@framework/tools";
TextParser.hasName("argA:bool=true"); //true
TextParser.hasName("argB"); //true
TextParser.hasName("argC:bool"); //true
```

:::

[已释放的通用API](./general)
