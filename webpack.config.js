const CopyPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const {CleanWebpackPlugin: CleanPlugin} = require('clean-webpack-plugin');
const path = require("path")

module.exports = {
    devtool: false,
    entry: {content: "./src/content.ts", background: "./src/background.ts", worker: './src/worker.ts'},
    output: {path: path.join(__dirname, "dist")},
    resolve: {extensions: ['.js', '.ts']},
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
            {
                test: /fuse.basic.esm.js$/,
                loader: 'string-replace-loader',
                options: {search: /charAt/g,  replace: 'charCodeAt',}
            },
        ],

    },
    plugins: [
        new CleanPlugin(),
        new CopyPlugin({
            patterns: [{from: "./assets"}]
        }),


    ]
}
