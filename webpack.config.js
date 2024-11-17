const path = require("path");
module.exports = {
    entry: {
        script: "./script/src/script.js",
        passage: "./script/src/passage.js"
    },
    output: {
        filename: "[name].dist.js",
        path: path.join(__dirname, "script/dist"),
        clean: true
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};