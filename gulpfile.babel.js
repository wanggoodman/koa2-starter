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
const Cache = require('gulp-file-cache')

var babel = require('gulp-babel');

var cache = new Cache();
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', function() {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/public/css'))
    .pipe(browserSync.stream());
});

//gulp.task('scripts', () => {
//  return gulp.src('app/scripts/**/*.js')
  /*  .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});*/


//gulp.task('scripts', function () {
    //return gulp.src('app/scripts/**/*.js')
  /*      .pipe($.browserify())
        .pipe($.babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('app/public/scripts'))
        //.pipe(reload({stream: true}));
        //.pipe(browserSync.stream());
});*/

function bundle (bundler) {
  bundler
    .bundle()
    .pipe(source('app/scripts/main.js'))
    .pipe(buffer())
    .pipe($.rename('bundle.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('app/public/scripts'))
    .pipe(browserSync.stream());
}

gulp.task('scripts', function () {
    var bundler = browserify('app/scripts/main.js')
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
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/views/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app/views/', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
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
  return gulp.src('app/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
  return gulp.src(['dist/*.js', 'dist/lib/**/*.js'])
    .pipe(babel({
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-async-to-generator']
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('nodemon', function(){
  nodemon({
    script: 'app/server.js',
    ext: 'hbs js',
    watch: [
      'app/server.js',
      'app/views/',
    ],
    ignore: 'app/public'
  })
  .on('start', () =>
    setTimeout(() => reload(), 2000)
  )
  .on('crash', () => {
    console.log(color.red('Stopping server due to an error'));
  })
  .on('exit', function () {
        console.info(color.cyan('Shutting down'));
  });
});

gulp.task('serve', () => {

  runSequence(['clean'], [/*'scripts',*/ 'styles', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      proxy: 'http://localhost:3000/',
      /*server: {
        baseDir: ['.tmp', 'app/views'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }*/
    });

    gulp.watch([
      'app/scripts/*.js',
      'app/views/*.html',
      'app/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    //gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});





gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
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

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean'], 'build', resolve);
  });
});
