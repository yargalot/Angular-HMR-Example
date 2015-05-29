var path = require('path'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),

    webpack = require('webpack'),
    webpackGulp = require('gulp-webpack'),
    webpackDev = require('webpack-dev-server'),

    connect = require('gulp-connect-multi')();


// MAIN TASKS

gulp.task('default', [
    'connect',
    'clean-babel-cache',
    'styles', 'vendor-styles-concat',
    'vendor-concat',
    'webpack',
    'watch'
]);


gulp.task('hot', [
    'connect',
    'clean-babel-cache',
    'styles', 'vendor-styles-concat',
    'vendor-concat',
    'webpack-hmr',
    'watch'
]);

gulp.task('dist', [
    'clean-babel-cache',
    'styles', 'vendor-styles-compress',
    'vendor-compress',
    'webpack-dist'
]);


gulp.task('clean-babel-cache', function() {
    return gulp.src('.babel-cache/*.json.gzip', {
            read: false
        })
        .pipe(clean());
});


gulp.task('connect', connect.server({
    root: [path.resolve('./public/')],
    port: 1337,
    livereload: false,
    open: {
        browser: 'Google Chrome'
    }
}));


/*

    WATCH

 */

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch('./public/index.html', ['reload']);

    gulp.watch('./vendor-scripts.js', ['vendor-concat', 'reload']);
    gulp.watch('./vendor-styles.js', ['vendor-styles-concat']);
});


gulp.task('reload', function() {
    livereload.reload();
});


var destStyles = './public/styles/';
var destScripts = './public/scripts/';


/*

    SASS

 */

gulp.task('vendor-styles-concat', function() {
    var vendorFiles = require('./vendor-styles.js').getStyles();
    return gulp.src(vendorFiles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(destStyles))
        .pipe(livereload());
});



gulp.task('vendor-styles-compress', ['vendor-styles-concat'], function() {
    return gulp.src('./public/styles/vendor.css')
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(destStyles));
});

gulp.task('styles', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['./public/bower_components/'],
            errLogToConsole: false,
            onError: function(err) {
                return notify.onError({
                    title: 'Sass error',
                    subtitle: '',
                    message: err.message + ' on line ' + err.line + ' in ' + err.file,
                    sound: 'Frog'
                })(err);
            }
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destStyles))
        .pipe(livereload());
});


/*
    CONCAT
 */


gulp.task('vendor-concat', function() {
    var vendorFiles = require('./vendor-scripts.js').getScripts();
    return gulp.src(vendorFiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(destScripts));
});





gulp.task('vendor-compress', ['vendor-concat'], function() {
    return gulp.src('./public/scripts/vendor.js')
        .pipe(uglify())
        .pipe(gulp.dest(destScripts));
});


/*

    WEBPACK;

 */



var CONFIG_DEV_WEBPACK = require('./webpack.dev.conf.js');


gulp.task('webpack', [], function() {
    return gulp.src('.')
        .pipe(webpackGulp(CONFIG_DEV_WEBPACK))
        .pipe(gulp.dest(destScripts));
});

gulp.task('webpack-dist', [], function() {
    var CONFIG_DIST_WEBPACK = require('./webpack.dist.conf.js');

    return gulp.src('.')
        .pipe(webpackGulp(CONFIG_DIST_WEBPACK))
        .pipe(gulp.dest(destScripts));
});


gulp.task('webpack-hmr', [], function() {


    var CONFIG_HOT_WEBPACK = require('./webpack.hot.conf.js');

    var server = new webpackDev(webpack(CONFIG_HOT_WEBPACK), {
        contentBase: path.join(__dirname, destScripts),
        inline: true,
        hot: true,
        stats: {
            colors: true,
            progress: true
        }
    });

    server.listen(8090, function(err, result) {
        if (err) {
            console.log(err);
        }
    });

});
