//Dependencies
import path from 'path';
import webpack, {optimize} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const env = process.env.NODE_ENV === 'production';

function getDevtool() {
    let devtool;
    env ? devtool = false : devtool = 'cheap-module-eval-source-map';
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
                 })
            );
    if(env){
        plugins.push(new optimize.UglifyJsPlugin({
            comments:false
        }));
    }
    return plugins;
}

module.exports =  {

    /*const ifDev = then => (env === 'dev' ? then : null);
    const ifProd = then => (env === 'prod' ? then : null);*/

        target:"web",
        context: path.join(__dirname),
        devtool: getDevtool(),
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
                    loaders:['babel-loader'],
                    include: path.join(__dirname,'src'),
                    exclude: path.join(__dirname,'node_modules')
                }
            ]
        },
        plugins:getPlugins(),
        devServer:{
            contentBase: path.join(__dirname,"public"),
            compress:true,
            port:9000
        }
}
