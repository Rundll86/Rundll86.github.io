[项目仓库](https://github.com/Rundll86/Electron-Onefile-Packager)在此。

安装编译器：
```
npm init -y
npm install electron-ofp -g
```

编译：
```
eop init [,--skip [,electron] [,profile]] [,--use-preset <name>]
eop build
```

输出于dist/[appname]-[version].exe