const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const CopyPlugin = require("copy-webpack-plugin");
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
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
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
        }
    }
};