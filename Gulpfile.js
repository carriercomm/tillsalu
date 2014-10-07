/**
 * Gulpfile
 */
var gulp = require("gulp"),
    prefix = require("gulp-autoprefixer"),
    change = require("gulp-changed"),
    cssmin = require("gulp-cssmin"),
    plumber = require("gulp-plumber"),
    stylus = require("gulp-stylus"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    es = require("event-stream"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var jsFiles = './main.min.js',
    cssFiles = './main.css';

gulp.task('style', function() {
  gulp.src('./style/main.styl')
    .pipe(stylus())
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(reload({
      stream: true
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
