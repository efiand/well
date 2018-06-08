'use strict';
var isDevMode = true;
var src;
var stream;

var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var replace = require('gulp-replace-task');
var run = require('run-sequence');
var server = require('browser-sync').create();

gulp.task('html', function () {
  var htmlmin = require('gulp-htmlmin');
  var nunjucks = require('gulp-nunjucks');
  return gulp.src('source/**/*.html')
    .pipe(nunjucks.compile())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('css', function () {
  var autoprefixer = require('autoprefixer');
  var csscomb = require('gulp-csscomb');
  var cssmin = require('gulp-csso');
  var mqpacker = require('css-mqpacker');
  var postcss = require('gulp-postcss');
  var sass = require('gulp-sass');
  src = ['source/sass/style.scss'];
  if (isDevMode) {
    src.push('source/sass/dev.scss');
  }
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(postcss([
      mqpacker(),
      autoprefixer()
    ]))
    .pipe(csscomb())
    .pipe(replace({
      patterns: [{
        match: /}(?=\n[^\n}])/g,
        replacement: '}\n'
      }],
      usePrefix: false
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('js', function () {
  var uglify = require('gulp-uglify');
  src = [
    'node_modules/picturefill/dist/picturefill.min.js',
    'node_modules/svg4everybody/dist/svg4everybody.min.js',
    'source/js/prepare.js',
    'source/js/modules/**/*.js',
    'source/js/final.js'
  ];
  if (isDevMode) {
    src.push('source/js/dev/**/*.js');
  }
  return gulp.src(src)
    .pipe(concat('script.min.js'))
    .pipe(uglify({
      compress: false
    }))
    .pipe(replace({
      patterns: [{
        match: /;"use strict";/g,
        replacement: ';'
      }],
      usePrefix: false
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

gulp.task('sprite', function () {
  var spritesmith = require('gulp.spritesmith');
  stream = gulp.src('source/img/sprite/*.png')
    .pipe(spritesmith({
      padding: 30,
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));
  stream.img.pipe(gulp.dest('build/img'));
  stream.css.pipe(gulp.dest('tmp'));
});

gulp.task('sprite:optim', function () {
  return gulp.src('build/img/sprite.png')
    .pipe(imagemin([
      imagemin.optipng()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite:icons', function () {
  var sprite = require('gulp-svg-sprites');
  return gulp.src('source/img/icons/*.svg')
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('tmp/icons'))
    .pipe(sprite({
      baseSize: 1,
      padding: 50,
      preview: {sprite: ''},
      svg: {sprite: '../build/img/icons.svg'},
      cssFile: 'icons.css',
    }))
    .pipe(gulp.dest('tmp'))
    .pipe(server.stream());
});

gulp.task('sprite:symbols', function () {
  var svgstore = require('gulp-svgstore');
  return gulp.src('source/img/symbols/*.svg')
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('tmp/symbols'))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('img', function () {
  var jpegoptim = require('imagemin-jpegoptim');
  stream = gulp.src('source/img/*.{png,jpg}');
  if (isDevMode) {
    stream
      .pipe(imagemin([
        imagemin.optipng(),
        jpegoptim({
          max: 70,
          progressive: true
        })
      ]));
  }
  return stream
    .pipe(gulp.dest('build/img'))
    .pipe(server.stream());
});

gulp.task('webp', function () {
  var webp = require('gulp-webp');
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(webp({
      quality: 70
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copy', function () {
  src = [
    'source/fonts/**/*.{woff,woff2}'
  ];
  return gulp.src(src, {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('build:del', function () {
  return del('build');
});

gulp.task('build:dev', function (done) {
  src = [
    'copy',
    'html',
    'css',
    'js',
    'img',
    'webp',
    'sprite',
    'sprite:icons',
    'sprite:symbols'
  ];
  run(src, done);
});

gulp.task('build:clean', function () {
  return del('tmp');
});

gulp.task('build', function (done) {
  isDevMode = false;
  run('build:del', 'build:dev', 'sprite:optim', 'build:clean', done);
});

gulp.task('serve', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch('source/sass/**/*.{scss,sass}', ['css']);
  gulp.watch('source/njk/**/*.njk', ['html']);
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/js/**/*.js', ['js']);
});
