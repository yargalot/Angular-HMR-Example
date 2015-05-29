var path = require('path');

var config = {

    cache: true,
    watch: true,
    useMemoryFs: false,

    entry: {
        main: './src/_entry.js'
    },

    output: {
        publicPath: 'scripts/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },

    module: {
        noParse: [],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules|bower_components/,
            loaders: ['babel-loader?experimental&optional=runtime']
        }, {
          test: /\.html$/,
          loaders: ['html-loader']
        }]
    },

    resolve: {
        alias: {
            'common': path.join(__dirname, '/src/common')
        }
    },
    plugins: []
};


module.exports = config;
