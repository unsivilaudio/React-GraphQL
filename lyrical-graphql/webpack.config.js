const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

let config = {
    mode: 'production',
    target: 'web',
    entry: {
        main: [path.join(__dirname, 'client', 'index.js')],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[contenthash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                    },
                ],
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html',
        }),
    ],
};

if (isDevelopment) {
    config.mode = 'development';
    config.entry.main.push('@gatsbyjs/webpack-hot-middleware/client');
    // Babel config
    config.module.rules[0].use[0].options = {
        plugins: [require.resolve('react-refresh/babel')],
    };
    config.plugins = [
        new HotModuleReplacementPlugin(),
        new ReactRefreshPlugin({
            overlay: {
                sockIntegration: 'whm',
            },
        }),
        ...config.plugins,
    ];
}

module.exports = config;
