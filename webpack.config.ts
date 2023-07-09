import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';
import fs from 'fs';


const pagesDir = './src/pages/';
const entryFiles = fs.readdirSync(path.resolve(__dirname, pagesDir))
  .filter(file => path.extname(file) === '.tsx')
  .reduce<{ [key: string]: string }>((entries, file) => {
    const fileName = path.parse(file).name;
    entries[fileName] = path.resolve(__dirname, pagesDir, file);
    return entries;
  }, {});
  
const config: webpack.Configuration = {
    mode: 'production',
    entry: entryFiles,
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
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
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
