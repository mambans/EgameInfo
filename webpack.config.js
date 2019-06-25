const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PROJECT_ROOT = __dirname;
const DIST_FOLDER = path.join(PROJECT_ROOT, "www");
const SOURCE_FOLDER = path.join(PROJECT_ROOT, "src/js");
const STATIC_FOLDER = path.join(PROJECT_ROOT, "static");

const ASSET_DIR_IMAGES = "img";
const ASSET_DIR_JS = "js";
const ASSET_DIR_CSS = "css";

module.exports = {
    mode: "development", //production development

    entry: {
        app: path.join(SOURCE_FOLDER, "index.js"),
    },

    output: {
        path: DIST_FOLDER,
        filename: path.join(ASSET_DIR_JS, "[name].js"),
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: ASSET_DIR_IMAGES,
                            publicPath: `/${ASSET_DIR_IMAGES}`,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(PROJECT_ROOT, "src/html/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: path.join(ASSET_DIR_CSS, "[name].css"),
        }),
        new CopyPlugin([{ from: STATIC_FOLDER, to: DIST_FOLDER }]),
    ],

    devServer: {
        contentBase: DIST_FOLDER,
        compress: true,
        port: 9999,
    },
};
