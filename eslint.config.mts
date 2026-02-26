import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
    pluginVue.configs["flat/essential"],
    { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/fs-context/**"
        ]
    },
    {
        rules: {
            quotes: ["error", "double"],
            indent: ["error", 4],
            semi: ["error", "always"],
            "vue/multi-word-component-names": "off"
        }
    },
    {
        files: ["webpack.config.js"],
        languageOptions: {
            globals: globals.node
        },
        rules: {
            "@typescript-eslint/no-require-imports": "off"
        }
    }
]);