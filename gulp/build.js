'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'yargs']
});

gulp.task('partials', function () {
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
    .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'abGlobalModule',
        root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html', { restore: true });
    var jsFilter = $.filter('**/*.js', { restore: true });
    var cssFilter = $.filter('**/*.css', { restore: true });
    var assets;

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.appDist, '/')))
    .pipe($.size({ title: path.join(conf.paths.appDist, '/'), showFiles: true }));
});

gulp.task('html-dev', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var jsFilter = $.filter('**/*.js', { restore: true });
    var assets;

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe(jsFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(path.join(conf.paths.appDev, '/')))
    .pipe($.size({ title: path.join(conf.paths.appDev, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
    return fonts().pipe(gulp.dest(path.join(conf.paths.appDist, '/fonts/')));
});

gulp.task('fonts-dev', function () {
    return fonts().pipe(gulp.dest(path.join(conf.paths.appDev, '/fonts/')));
});


function fonts() {
    return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
}

gulp.task('other', function () {
    return other().pipe(gulp.dest(path.join(conf.paths.appDist, '/')));
});

gulp.task('other-dev', function () {
    return other().pipe(gulp.dest(path.join(conf.paths.appDev, '/')));
});

function other() {
    var fileFilter = $.filter(function (file) {
        return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
    ])
    .pipe(fileFilter);
}

gulp.task('clean', function () {
    return $.del([path.join(conf.paths.appDist, '/'), path.join(conf.paths.appDev, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build:dist', ['html', 'fonts', 'other']);

gulp.task('build', ['html-dev', 'fonts-dev', 'other-dev']);
