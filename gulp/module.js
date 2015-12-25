'use strict';

var gulp  = require('gulp');
var fs = require('fs');
var path = require('path');
var build = require('./build');
var archiver = require('archiver');
var seq = require('run-sequence');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync');
var util = require('util');

var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del', 'yargs']
});

var node;
var epubSource;
var epubDest;

gulp.task('module-preprocess', function (cb) {
    modulePreprocess(false);
    cb();
});

gulp.task('module-preprocess:dist', function (cb) {
    modulePreprocess(true);
    cb();
});

var MODULE_NAME = function() {
    return JSON.parse(fs.readFileSync('./package.json')).name;
}();

var config = {
    appDev: $.yargs.argv.appDest || 'appDev',
    appDist: $.yargs.argv.appDest || 'appDist',
    epubDev: $.yargs.argv.epubDest || 'epubDev',
    epubDist: $.yargs.argv.epubDest || 'epubDist',
    epubName: $.yargs.argv.epubName || MODULE_NAME + '.epub'
};

function modulePreprocess(isDist) {
    if (isDist) {
        epubSource = config.appDist;
        epubDest = path.join(config.epubDist, config.epubName);
        createFolderIfNotExist(config.epubDist);
        createTemplate(epubSource);
        conf.paths.appDist = path.join(epubSource, '/OPS');
    }
    else {
        epubSource = config.appDev;
        epubDest = path.join(config.epubDev, config.epubName);
        createFolderIfNotExist(config.epubDev);
        createTemplate(epubSource);
        conf.paths.appDev = path.join(epubSource, '/OPS');
    }
}

gulp.task('epub-archive', function (cb) {
    createArchive(epubSource, epubDest);
    cb();
});

gulp.task('archive', function (cb) {
    seq('module-preprocess', 'build', 'epub-archive', cb);
});

gulp.task('archive:dist', function (cb) {
    seq('module-preprocess:dist', 'build:dist', 'epub-archive', cb);
});

var watch_paths = [
    path.join(conf.paths.src, '/*.html'),
    'bower.json',
    path.join(conf.paths.src, '/app/**/*.*')
];

gulp.task('watch', ['archive'], function () {
    gulp.watch(watch_paths, function() {
        gulp.start('archive');
    });
});

gulp.task('watch:dist', ['archive:dist'], function () {
    gulp.watch(watch_paths, function() {
        gulp.start('archive:dist');
    });
});

gulp.task('dmp', ['watch'], demo);

gulp.task('dmp:dist', ['watch:dist'], demo);

function demo() {
    if (node) node.kill();
    node = spawn('node_modules/.bin/discovery-module-sdk', [epubDest], {stdio: 'inherit'});
    node.on('exit', process.exit);
    process.on('exit', () => {
        if (node) node.kill();
    });
}

function copy_epub_template(dest) {
    var templatePath = 'epub_template';

    createFolderIfNotExist(path.join(dest, '/META-INF'));
    createFolderIfNotExist(path.join(dest, '/OPS'));

    fs.createReadStream(path.join(templatePath, '/mimetype')).pipe(fs.createWriteStream(path.join(dest, '/mimetype')));
    fs.createReadStream(path.join(templatePath, '/META-INF/container.xml')).pipe(fs.createWriteStream(path.join(dest, '/META-INF/container.xml')));
    fs.createReadStream(path.join(templatePath, '/OPS/nav.html')).pipe(fs.createWriteStream(path.join(dest, '/OPS/nav.html')));
    fs.createReadStream(path.join(templatePath, '/OPS/package.opf')).pipe(fs.createWriteStream(path.join(dest, '/OPS/package.opf')));
}

function createFolderIfNotExist(dirPath) {
    try {
        fs.statSync(dirPath);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            fs.mkdirSync(dirPath);
        }
        else {
            throw error;
        }
    }
}

function createTemplate(appDest) {
    $.del.sync([path.join(appDest, '/')], {force: true});
    createFolderIfNotExist(appDest);

    copy_epub_template(appDest);
}

function createArchive(source, dest) {
    var file = fs.createWriteStream(dest);
    var archive = archiver('zip');
    archive.pipe(file);
    archive
        .bulk([{
            expand: true,
            cwd: source,
            src: ['**/*'],
            dot: true
        }]);
    archive.finalize();
}

gulp.task('reload-epub', ['archive'], function (cb) {
    browserSync.reload();
    cb();
});

gulp.task('reload-epub:dist', ['archive:dist'], function (cb) {
    browserSync.reload();
    cb();
});

gulp.task('serve', ['archive'], function () {
    gulp.watch([
        path.join(conf.paths.src, '/*.html'),
        'bower.json',
        path.join(conf.paths.src, '/app/**/*.*')
    ], ['reload-epub']);

    browserSyncInit(conf.paths.appDev, undefined, 2000);
});

gulp.task('serve:dist', ['archive:dist'], function () {
    gulp.watch([
        path.join(conf.paths.src, '/*.html'),
        'bower.json',
        path.join(conf.paths.src, '/app/**/*.*')
    ], ['reload-epub:dist']);

    browserSyncInit(conf.paths.appDist, undefined, 10000);
});

function browserSyncInit(baseDir, browser, timeout) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    reloadDelay: timeout ? timeout : 0
  });
}
