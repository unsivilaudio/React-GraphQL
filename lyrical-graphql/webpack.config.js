const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    context: __dirname,
    target: 'web',
    entry: {
        main: ['@gatsbyjs/webpack-hot-middleware/client', './client/index.js'],
    },
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                isDevelopment &&
                                    require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        },
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
        ],
    },
    plugins: [
        isDevelopment ? new HotModuleReplacementPlugin() : undefined,
        isDevelopment
            ? new ReactRefreshPlugin({
                  overlay: {
                      sockIntegration: 'whm',
                  },
              })
            : undefined,
        new HtmlWebpackPlugin({
            template: 'client/index.html',
        }),
    ].filter(x => x !== undefined),
};
