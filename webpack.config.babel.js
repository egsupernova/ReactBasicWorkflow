//Dependencies
import path from 'path';
import webpack, {optimize , HotModuleReplacementPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cleanWebpackPlugin from 'clean-webpack-plugin';


const prod = process.env.NODE_ENV === 'production';
const getDevtool = () => {
    let devtool;
    prod ? devtool = false : devtool = 'cheap-module-eval-source-map';
    return devtool;
};
const getLoaders = () =>({
        rules:[
            {
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
                use:['babel-loader',
                    {
                        loader: 'eslint-loader',
                        options:{
                            format:"html",
                            fix:true
                        }
                    }
                ],
                include: path.join(__dirname,'src'),
                exclude: path.join(__dirname,'node_modules')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype:'image/svg+xml'
                        }
                    }
                ]
            }

        ]
});
const getPlugins = () => {
    let plugins=[];
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
            new optimize.UglifyJsPlugin ({comments:false}),
            new cleanWebpackPlugin(['src/public/*.*'] , {verbose: true,})
        );
    }else{
        plugins.push(new HotModuleReplacementPlugin());
    }
    return plugins;
};
const getDevServer = () =>({
    contentBase: path.join(__dirname,"public"),
    port:9000,
    hot:true,
    historyApiFallback: true,
    overlay:true,
    compress:true,
    stats: {
        colors: true
    }
});
const getOutput = () =>({
	path: path.join(__dirname, 'src/public'),
    filename: '[name].bundle.js'
});

module.exports =  {

        target:"web",
        context: path.join(__dirname),
        devtool: getDevtool(),
        entry:['react-hot-loader/patch','./src/index.js'],
        output: getOutput(),
        module: getLoaders(),
        plugins: getPlugins(),
        devServer: getDevServer()
};
