const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");

process.env.NODE_ENV = "production";

const commonCssLoader = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {publicPath: '../'}
    },
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [require('postcss-preset-env')]
        }
    }
];


module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[contenthash:10].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }]
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'thread-loader',
                                options: {
                                    workers: require('os').cpus().length - 1
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                useBuiltIns: 'usage',
                                                corejs: {version: 3},
                                                targets: {
                                                    chrome: '60',
                                                    firefox: '50'
                                                }
                                            }
                                        ]
                                    ],
                                    cacheDirectory: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 8 * 1024,
                                name: '[hash:10].[ext]',
                                outputPath: 'imgs/',
                                esModule: false
                            }
                        }]
                    },
                    {
                        test: /\.html$/,
                        use: ['html-loader']
                    },
                    {
                        test: /\.(eot|ttf|svg|woff|woff2)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[hash:10].[ext]',
                                outputPath: 'fonts/'
                            }
                        }]
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dll/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, 'dll/jquery.js'),
        }),
        // new WorkboxWebpackPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    mode: 'production',
    // externals: {
    //     jquery: 'jQuery'
    // }
}