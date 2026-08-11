module.exports = {
    hooks: {
        readPackage(pkg) {
            // vue-server-renderer 未声明 vue 依赖，合并到 workspace 共享 store 后
            // 其 require("vue") 会向上回退到根项目的 vue@3.5.28 导致版本不匹配。
            // 在解析阶段注入 vue@2.7.16，让 pnpm 为其生成正确的依赖链接。
            if (pkg.name === "vue-server-renderer") {
                pkg.dependencies = pkg.dependencies || {};
                pkg.dependencies.vue = "2.7.16";
            }
            return pkg;
        }
    }
};
