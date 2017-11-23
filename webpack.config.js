//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
var webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractApp = new ExtractTextPlugin({
    filename: 'assets/[name].[contenthash:8].css',
});

const extractAntd = new ExtractTextPlugin({
    filename: 'assets/antd.[contenthash:8].css',
});


module.exports = {//注意这里是exports不是export
    devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map
    entry: ['webpack/hot/dev-server',__dirname + "/app/main.jsx"],//唯一入口文件，就像Java中的main方法
    output: {//输出目录
        path: __dirname + "/build",//打包后的js文件存放的地方
        filename: "bundle.js"//打包后的js文件名
    },
    module: {
        rules: [
            {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader:'babel-loader',
            //use: ['happypack/loader?id=js'],
            //include: [APP_PATH]
            },
            {
                test: /\.js?$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                //use: ['happypack/loader?id=js'],
                //include: [APP_PATH]
            },
            {
            //正则匹配后缀.css文件;
            test: /\.css$/,
            exclude: [/node_modules/],
            //使用html-webpack-plugin插件独立css到一个文件;
            use:[
                {
                    loader:'style-loader'
                },
                {
                 loader:"css-loader",
                    options:{
                         modules:true
                    }
                }
                ]
            },
            {
                test: /\.css$/,
                exclude: [/app/],
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: "css-loader",
                    }
            ]
            },

            ]},

// {
//     //正则匹配后缀.css文件;
//     test: /\.css$/,
//         exclude: /node_modules\/antd/,
//     //使用html-webpack-plugin插件独立css到一个文件;
//     use:[
//     {
//         loader:'style-loader'
//     },
//     {
//         loader:"css-loader",
//         options:{
//             modules:true
//         }
//     }
// ]
// },
// {
//     test: /\.css$/,
//         include: /node_modules\/antd/,
//     use:[
//     'style-loader',
//     {
//         loader: "css-loader",
//         options:{
//             modules: false
//         }
//     }
// ]
// }
    //
    //
    // module: {
    //     loaders: [
    //         {
    //             test: /\.jsx?$/,
    //             exclude: /node_modules/,
    //             loader: 'babel-loader',
    //             query: {
    //                 presets: ['react','es2015'],
    //
    //             }
    //         },
    //         {
    //             test: /\.css$/,
    //             exclude: [/app/],
    //             include: /node_modules\/antd/,
    //             loader: "style-loader!css-loader?importLoaders=1"
    //         },
    //         {
    //             test: /\.css$/,
    //             exclude: [/node_modules\/antd/],
    //             loader: "style-loader!css-loader?modules"
    //         },
    //     ]
    // },

    //webpack-dev-server配置
    devServer: {
        contentBase:(__dirname, "build"),
        compress: true,
        port: 8080,//设置默认监听端口，如果省略，默认为"8080"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        extractAntd,
        extractApp,
    ],
};
