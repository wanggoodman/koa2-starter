import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const browserSync = require('browser-sync').create();
import del from 'del';
import runSequence from 'run-sequence';

import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import color from 'cli-color';
import nodemon from 'gulp-nodemon';
import Cache from 'gulp-file-cache';
import babel from 'gulp-babel';

var cache = new Cache();
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', function() {
  return gulp.src('src/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('src/public/css'))
    .pipe(browserSync.stream());
});

function bundle (bundler) {
  bundler
    .bundle()
    .pipe(source('src/scripts/main.js'))
    .pipe(buffer())
    .pipe($.rename('bundle.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/public/scripts'))
    .pipe(browserSync.stream());
}

gulp.task('scripts', function () {
    var bundler = browserify('src/scripts/main.js')
      .transform(babelify, {
        presets : [ 'es2015', 'stage-0'],
      });

    bundle(bundler);  // Chain other options -- sourcemaps, rename, etc.
})

function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('src/scripts/**/*.js')
    .pipe(gulp.dest('src/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('src/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/views/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));


// server
gulp.task('copy', ['clean'], function () {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});


gulp.task('serve', () => {

  runSequence(['clean'], [ 'styles', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      proxy: 'http://localhost:3000/',
    });

    gulp.watch([
      'src/scripts/*.js',
      'src/views/**/*.hbs',
      'src/images/**/*'
    ]).on('change', reload);

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/fonts/**/*', ['fonts']);
  });
});


gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});


gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean'], 'build', resolve);
  });
});
