const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const fs = require('fs');

// Look for .html files
var htmlFiles = [];
var directories = ['src'];
while (directories.length > 0) {
    var directory = directories.pop();
    var dirContents = fs
        .readdirSync(directory)
        .map((file) => path.join(directory, file));

    htmlFiles.push(...dirContents.filter((file) => file.endsWith('.html')));
    directories.push(
        ...dirContents.filter((file) => fs.statSync(file).isDirectory())
    );
}

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        // filename: '[name].[contenthash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer()],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                    publicPath: 'images',
                    emitFile: true,
                    esModule: false,
                },
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
    plugins: [
        // Build a new plugin instance for each .html file found
        ...htmlFiles.map(
            (htmlFile) =>
                new HtmlWebpackPlugin({
                    template: htmlFile,
                    filename: htmlFile.replace(path.normalize('src/'), ''),
                    // inject: false,
                })
        ),
        // new HtmlWebpackPlugin({
        //     title: 'TEST',
        //     filename: 'index.html',
        //     template: 'src/index.html',
        // }),
        new MiniCssExtractPlugin({
            // filename: 'styles.[contenthash].css',
            filename: 'styles.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
};
