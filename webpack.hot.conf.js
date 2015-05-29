var path = require("path"),
    webpack = require("webpack"),
    host = require('./webpack-host.js');

var config = require('./webpack.dev.conf.js');


for (e in config.entry) {
    if (e !== 'vendor') {
        config.entry[e] = ['webpack-dev-server/client?http://' + host + ':8090', 'webpack/hot/dev-server'].concat(config.entry[e]);
        console.log(config.entry);
    }
}

config.devtool = '#eval';

config.module.loaders[0].loaders = ['angular-hmr'].concat(config.module.loaders[0].loaders);

console.log(config.module.loaders[0].loaders);

config.output.path = path.join(__dirname, "./public/scripts");
config.output.publicPath = 'http://' + host + ':8090/';

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());

module.exports = config;
