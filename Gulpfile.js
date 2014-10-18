/**
 * Gulpfile
 */
var gulp = require("gulp"),
    package = require('./package.json'),
    prefix = require("gulp-autoprefixer"),
    change = require("gulp-changed"),
    cssmin = require("gulp-cssmin"),
    plumber = require("gulp-plumber"),
    stylus = require("gulp-stylus"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    header = require("gulp-header"),
    es = require("event-stream"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var jsFiles = './main.min.js',
    cssFiles = './main.css';

/*-------------------------------------------------------------------

  Banner using meta data from package.json

-------------------------------------------------------------------*/

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.description %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('style', function() {
  gulp.src('./style/main.styl')
    .pipe(stylus())
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(concat('main.min.css'))
    .pipe(reload({
      stream: true
    }))
    .pipe(header(banner, {
      package: package
    }))
    .pipe(gulp.dest('./'));
});

// Concatinate and minify Javascript
gulp.task('js', function() {
  gulp.src('./js/*.js')
    .pipe(uglify({ mangle: false }))
    .pipe(concat('main.min.js'))
    .pipe(reload({
      stream: true
    }))
    .pipe(header(banner, {
      package: package
    }))
    .pipe(gulp.dest('./'));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    notify: false
  });
});

// Browser sync reload
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Watch task with Browsersync
gulp.task('default', ['style', 'js', 'browser-sync', 'bs-reload'], function() {
  gulp.watch(['./style/*.styl'], ['style', 'bs-reload']);
  gulp.watch(['./js/*.js'], ['js', 'bs-reload']);
  gulp.watch(['./index.html'], ['bs-reload']);
});
