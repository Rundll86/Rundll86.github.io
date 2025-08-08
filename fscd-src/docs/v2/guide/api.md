# API 指南

## extension

`extension(id: string)`

创建一个新的扩展构建器。

### 参数

- `id`: 扩展的唯一标识符

### 返回值

扩展构建器对象，可以链式调用其他方法。

## blockType

`blockType[类型](opcode: string)`

创建一个新的积木构建器。

### 参数

- `opcode`: 积木的操作码

### 返回值

积木构建器对象，可以链式调用其他方法。

### 支持的类型

- `command`: 命令类型
- `reporter`: 报告者类型
- `boolean`: 布尔类型

## menu

`menu(name: string)`

创建一个新的菜单构建器。

### 参数

- `name`: 菜单的名称

### 返回值

菜单构建器对象，可以链式调用其他方法。