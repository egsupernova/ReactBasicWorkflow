//Dependencies
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    target:"web",
    context: path.join(__dirname),
    entry:{
        path: path.join(__dirname, 'src/index.js'),
    },
    output:{
        path: path.join(__dirname, 'src/public'),
        filename: '[name].bundle.js'
    },
    module:{
        rules:[{
            test:/\.css$/,
            use: ExtractTextPlugin.extract({
                    use:[{
                            loader: 'css-loader',
                            options:{importLoaders: 1},
                        },
                        'postcss-loader'
                    ]
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('styles.css')
    ]
}
