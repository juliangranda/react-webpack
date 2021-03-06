const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMiniminizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js', //El archivo fuente que se va ir a produccion
    output: {
        path: path.resolve(__dirname, "dist"), //como vamos a enviar nuestro recurso a produccion
        filename: 'bundle.js',
        publicPath:"/",
    },
    resolve: {
        extensions: ['.js', '.jsx'], //las extensiones que vamos a trabajar
        alias:{
            '@components': path.resolve(__dirname, 'src/components/'),
            '@styles':path.resolve(__dirname, 'src/styles/'),
        }
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use:[
                    {loader: 'html-loader'}
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new CssMiniminizerPlugin(),
            new TerserPlugin(),
        ]
    }

}