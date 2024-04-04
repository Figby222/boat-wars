const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./src",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            title: "Template",
            inject: "head",
            scriptLoading: "defer",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [
                      ["@babel/preset-env", { targets: "defaults" }]
                    ]
                  }
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: "single",
    },
};
    