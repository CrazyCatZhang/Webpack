const EslintWebpackPlugin = require('eslint-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    output: {
        filename: 'js/[name].js',
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: require('path').resolve(__dirname, '../dist'),
        compress: true,
        port: 3000,
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://localhost:9000',
        },
        historyApiFallback: true,
        hot: true,
        // livereload: true,
    },
    plugins: [
        new EslintWebpackPlugin({
            files: ['./src/**/*.js'],
            fix: true,
            cache: true,
            emitWarning: true,
            failOnError: false,
        }),
        // new BundleAnalyzerPlugin()
    ],
}