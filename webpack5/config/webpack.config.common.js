const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');
const path = require("path");

module.exports = {
    entry: {
        // index: './src/js/index.js',
        // another: './src/js/another-module.js',
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        assetModuleFilename: 'images/[contenthash][ext]',
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[contenthash][ext]',
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
            {
                test: /\.txt$/,
                type: 'asset/source',
            },
            {
                test: /\.jpg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'media/[contenthash][ext]',
                }
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader',
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader',
                ]
            },
            {
                test: /\.toml$/,
                type: 'json',
                parser: {
                    parse: toml.parse.bind(toml),
                }
            },
            {
                test: /\.yaml$/,
                type: 'json',
                parser: {
                    parse: yaml.parse.bind(yaml),
                }
            },
            {
                test: /\.json5$/,
                type: 'json',
                parser: {
                    parse: json5.parse.bind(json5),
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: {version: 3.21, proposals: true}
                                }
                            ],
                            plugins: [
                                [
                                    '@babel/plugin-transform-runtime',
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash].css',
        })
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        },
        usedExports: true,
    }
}