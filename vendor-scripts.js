/*
    This file will become deprecated when vendors use UMD properly.
 */

const bowerDir = __dirname + '/public/bower_components';

module.exports = {
    getScripts: function() {
        return [
            bowerDir + '/jquery/dist/jquery.js',
            bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.js',

            bowerDir + '/angular/angular.js',
            bowerDir + '/ui-router/release/angular-ui-router.js',
            bowerDir + '/baobab/build/baobab.min.js'
        ];
    }
};
