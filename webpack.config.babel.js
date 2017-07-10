//Dependencies
import path from 'path';
import webpack, {optimize , HotModuleReplacementPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cleanWebpackPlugin from 'clean-webpack-plugin';


const prod = process.env.NODE_ENV === 'production';
function getDevtool() {
    let devtool;
    prod ? devtool = false : devtool = 'cheap-module-eval-source-map';
    return devtool;
}
function getPlugins() {
    let plugins=[]
    plugins.push(new ExtractTextPlugin('styles.css'),
                 new HtmlWebpackPlugin({
                    title: 'My-Workspace',
                    template:"src/index.ejs",
                    minify:{caseSensitive:true,/*collapseWhitespace:true*/}
                 }),
                 new webpack.DefinePlugin({
                     'process.env': {
                       'NODE_ENV': JSON.stringify('production')
                     }
                 }),
                 new optimize.CommonsChunkPlugin({
                     name: 'common'
                 })

            );
    if(prod){
        plugins.push(
            new optimize.UglifyJsPlugin({comments:false}),
            new cleanWebpackPlugin(['src/public/*.*'] , {verbose: true,})
        );
    }else{
        plugins.push(new HotModuleReplacementPlugin());
    }
    return plugins;
}

module.exports =  {

        target:"web",
        context: path.join(__dirname),
        devtool: getDevtool(),
        entry:[
            'react-hot-loader/patch',
            './src/index.js'
        ],
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
                                options:{
                                    importLoaders: 1,
                                    sourceMap:true
                                },
                            },
                            'postcss-loader'
                        ]
                    })
                },
                {
                    test: /\.js$/,
                    loaders:['babel-loader','eslint-loader'],
                    include: path.join(__dirname,'src'),
                    exclude: path.join(__dirname,'node_modules')
                }
            ]
        },
        plugins:getPlugins(),
        devServer:{
            contentBase: path.join(__dirname,"public"),
            port:9000,
            hot:true,
            historyApiFallback: true,
            overlay:true,
            stats: {
                colors: true
            }
        }
};
