const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Webpackbar = require("webpackbar");
/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
    entry: {
        script: "./script/src/script.js",
        passage: "./script/src/passage.js"
    },
    output: {
        filename: "[name].dist.js",
        path: path.resolve(__dirname, "script/dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    /**
     * @type {import("webpack-dev-server").Configuration}
     */
    devServer: {
        static: "./",
        port: 22102,
        client: {
            logging: "none"
        },
        setupExitSignals: false
    },
    plugins: [
        new Webpackbar({
            name: "Live",
            color: "green"
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            chunks: ["script"],
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            template: "./passage.html",
            filename: "passage.html",
            chunks: ["passage"],
            inject: "body"
        })
    ],
    stats: "errors-warnings",
};