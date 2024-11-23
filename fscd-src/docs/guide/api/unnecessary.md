# 拓展开发中的工具集

框架中提供了一些工具集，随意用。

## 可能必要的...

1. 开发拓展总是需要调试的，每次都进入编辑器重载未免显得麻烦。
2. 框架提供了一个独立调试器，名为`WaterBox`。
3. `WaterBox`是一个基于浏览器的调试器，因此需要浏览器支持。
4. 在`WaterBox`中，你可以尽情重载拓展的代码，调试积木逻辑，并且可以查看拓展的输出。

### WaterBox

#### 启动

安装依赖库，在[快速开始](..)处以有，此处不再赘述。

在项目根目录下运行`npm run dev`，即可启动WaterBox。  
WaterBox会自动打开浏览器，并跳转到`http://localhost:25565`，如果浏览器没有自动打开，请手动打开。  
网页下方会有一个方框用于显示拓展积木，上方有一个`canvas`用于预览舞台。点击`重载拓展`按钮可刷新数据库内容。

#### 使用

1. 点击积木的`Run`按钮，可根据输入执行积木函数。
2. 点击积木的`View`按钮，可查看当前积木的opcode、blockType、arguments等信息。
3. 点击积木的`Arg`按钮，可查看当前积木输入的对应参数对象。

## 可能不太必要的...

### 全局上下文

使用`GlobalContext`命名空间的`createDataStore`方法可以创建一个基于全局变量的数据库，将拓展的数据导出便于调试，也可以便于联动其他拓展。  
方法的第一个参数传入拓展派生于`Extension`的类的原型，第二个参数传入一个对象，对象中的字段将会被导出到全局。
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

使用`Unnecessary`命名空间的`elementTree`方法可链式生成组件树，该方法返回一个`ElementContext`接口的实现，该对象具有`child`方法用于添加子组件，`class`方法用于添加类名，`attribute`方法用于添加属性，`style`方法用于添加样式。
```ts
import { Unnecessary } from "@framework/tools";
var tree = Unnecessary.elementTree("div",[
    //子元素
    Unnecessary.elementTree("span")
        .attribute("innerText", "hello")
        .style("color", "orange"),
    Unnecessary.elementTree("span")
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

### 生成随机数、颜色、字符串等

使用`Unnecessary`命名空间的以`random`作前缀的方法可生成随机内容。此处不过多赘述
```ts
import { Unnecessary } from "@framework/tools";
let randomInt = Unnecessary.randomInt(0, 100);
let randomFloat = Unnecessary.randomFloat(0, 10.0);
let randomColor = Unnecessary.randomColor();
let randomString = Unnecessary.randomString(10, "abcdefABCDEF123456");
```

### UUID自增器

使用`Unnecessary`命名空间的`UUIDAutoscalator`类可生成自增的UUID，每次调用都会返回一个不同的UUID。
```ts
import { Unnecessary } from "@framework/tools";
let machine = new Unnecessary.UUIDAutoscalator();
let uuid = machine.next();
console.log(uuid); //输出类似"XXXX-XXXX-XXXX-XXXX"的字符串
```

### 处理积木文字

#### 切割得到参数框

使用`Unnecessary.splitArgBoxPart`方法，切割传入积木文字，得到每个参数框按照对应位置排序的名称数组。
```ts
import { Unnecessary } from "@framework/tools";
let args = Unnecessary.splitArgBoxPart("alert $sth $sth $sth to window with _suffix", ["$sth", "_suffix"]);
console.log(args); //输出["$sth", "$sth", "$sth", "_suffix"]
```

#### 切割得到参数框外的文字

使用`Unnecessary.splitTextPart`方法，切割传入积木文字，得到参数框外的文字数组。
```ts
import { Unnecessary } from "@framework/tools";
let args = Unnecessary.splitTextPart("alert $sth $sth $sth to window with _suffix", ["$sth", "_suffix"]);
console.log(args); //输出["alert ", " to window with ", ""]
```

### 处理颜色

#### HEX转RGB数组

使用`Unnecessary.hexToRgb`方法，将传入的HEX颜色值转换成RGB数组。无需多言。
```ts
import { Unnecessary } from "@framework/tools";
let rgb = Unnecessary.hexToRGB("#FF00FF");
console.log(rgb); //输出[255, 0, 255]
```

#### 使颜色加深（混入黑色）

使用`Unnecessary.darken`方法来加深颜色，即降低HSL亮度。首先传入一个HEX颜色，再传入加深的比例。
```ts
import { Unnecessary } from "@framework/tools";
let hex = Unnecessary.darken("#FF00FF", 0.5);
console.log(hex); //输出"#800080"
```

#### 使颜色变浅（混入白色）

使用`Unnecessary.lighten`方法来变浅颜色，即提高HSL亮度。首先传入一个HEX颜色，再传入变浅的比例。
```ts
import { Unnecessary } from "@framework/tools";
let hex = Unnecessary.lighten("#FF00FF", 0.5);
console.log(hex); //输出"#FF80FF"
```

#### 定义的积木参数输入类型投射到TW类型

使用`Unnecessary.castInputType`方法，将传入的积木参数类型投射到TW类型。
```ts
import { Unnecessary } from "@framework/tools";
let type = Unnecessary.castInputType("string");
console.log(type); //输出"string"
let type = Unnecessary.castInputType("bool");
console.log(type); //输出"Boolean"
let type = Unnecessary.castInputType("hat-parameter");
console.log(type); //输出"ccw_hat_parameter"
```