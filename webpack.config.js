var webpack = require('webpack');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test:/\.css$/,loader:'style-loader!css-loader'},
            {test:/\.less$/,loader:'style-loader!css-loader!less-loader'},
            {test:/\.js$/,loader:'babel-loader',exclude: /node_modules/},
            {test:/\.html/, loader: 'html-loader' },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'},
        ]
    },
    plugins:[
    ],
};