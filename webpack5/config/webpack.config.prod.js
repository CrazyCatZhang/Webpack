const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    output: {
        filename: 'js/[name].[contenthash].js',
        publicPath: '/'
    },

    mode: 'production',

    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ],
    },
    performance: {
        hints: false
    }
}