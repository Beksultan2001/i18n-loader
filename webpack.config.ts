import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        main: './src/pages/root.tsx',
        secondary: './src/pages/root2.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true, // Clean the output directory before emit.
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // updated with '.tsx'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // updated to include '.tsx' files
                use: [
                    {
                        loader: 'ts-loader', // added 'ts-loader'
                    },
                    {
                        loader: path.resolve(__dirname, 'loaders/i18n-loader.cjs'),
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolveLoader: {
        alias: {
            'i18n-loader': path.resolve(__dirname, 'loaders/i18n-loader.cjs'),
        },
    },
};

export default config;
