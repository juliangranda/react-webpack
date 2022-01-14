const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', //El archivo fuente que se va ir a produccion
    output: {
        path: path.resolve(__dirname, "dist"), //como vamos a enviar nuestro recurso a produccion
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'] //las extensiones que vamos a trabajar
    },
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ],
    //servidor local para desarrollo
    devServer: {
        static: {
        directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        open: true,
    }
}