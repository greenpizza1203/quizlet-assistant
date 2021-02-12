const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require("path")

module.exports = {
    devtool: false,
    entry: {content: "./src/content.ts", background: "./src/background.ts", worker: './src/worker.ts'},
    output: {path: path.join(__dirname, "dist")},
    resolve: {extensions: ['.js', '.ts']},
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{from: "./assets"},]
        })
    ]
}
