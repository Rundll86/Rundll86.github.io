const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const CopyPlugin = require("copy-webpack-plugin");
const TSCONFIG = require("./tsconfig.json");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
        clean: false
    },
    module: {
        rules: [
            {
                test: /\.vue$/i,
                loader: "vue-loader"
            },
            {
                test: /\.ts$/i,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        appendTsSuffixTo: [/\.vue$/i]
                    }
                },
            },
            {
                test: /\.css$/i,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "[name].[hash][ext]",
                    publicPath: ""
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: Object.fromEntries(Object.entries(TSCONFIG.compilerOptions.paths).map(
            ([key, value]) => [path.dirname(key), path.resolve(path.dirname(value[0]))]
        ))
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "index.html"
        }),
        new WebpackBar({
            name: "Live",
            color: "green"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                    to: ".",
                    globOptions: {
                        ignore: ["public/index.html"]
                    }
                }
            ]
        })
    ],
    stats: "errors-warnings",
    devServer: {
        port: 25565,
        setupExitSignals: false,
        client: {
            logging: "none"
        },
        static: ["dist", "public"]
    }
};