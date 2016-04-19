'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var uncss = require('gulp-uncss');


gulp.task('default',['imagemin','htmlmin','scripts','styles','browser-sync'],function() {
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('jshint',function() {
    gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('imagemin',function() {
    var imgSrc = './src/images/**/* ',
        imgDst = './build/images';
    gulp.src(imgSrc)
          .pipe(changed(imgDst))
          .pipe(imagemin())
          .pipe(gulp.dest(imgDst));
});

gulp.task('htmlmin',function() {
    var htmlSrc = './src/*.html',
        htmlDsc = './build';
    gulp.src(htmlSrc)
          .pipe(changed(htmlDsc))
          .pipe(minifyHTML())
          .pipe(gulp.dest(htmlDsc));
});

gulp.task('scripts',function() {
    gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
          .pipe(concat('scripts.js'))
          .pipe(stripDebug())
          .pipe(uglify())
          .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('styles',function(){
    gulp.src(['./src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(uncss({
        html: ['./build/*.html']
      }))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});
