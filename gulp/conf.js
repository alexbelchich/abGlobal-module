/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');
var yargs = require('yargs');
var fs = require('fs');

var MODULE_NAME = function() {
    return JSON.parse(fs.readFileSync('./package.json')).name;
}();

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    src: 'src',
    appDev: yargs.argv.appDest || 'appDev',
    appDist: yargs.argv.appDest || 'appDist',
    epubDev: yargs.argv.epubDest || 'epubDev',
    epubDist: yargs.argv.epubDest || 'epubDist',
    epubName: yargs.argv.epubName || MODULE_NAME + '.epub',
    tmp: '.tmp',
    e2e: 'e2e'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
    directory: 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
    'use strict';

    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
