var path = require('path'),
    webpack = require('webpack');


var config = require('./webpack.dev.conf.js');

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.NoErrorsPlugin(),
    function() {
        this.plugin('done', function(stats) {
            var jsonStats = stats.toJson();
            //require('fs').writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(jsonStats.assetsByChunkName));
        });
    }
);

config.watch = false;

config.output.filename = '[name].js';
//config.output.filename = '[name].js?[chunkhash]';

module.exports = config;
