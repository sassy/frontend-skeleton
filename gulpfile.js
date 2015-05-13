var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var mocha = require('gulp-mocha');
var espower = require('gulp-espower');
var istanbul = require('gulp-istanbul');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
    return gulp.src(['src/*.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task('build', function() {
    return browserify({
      entries: ['./src/index.js', './src/calc.js']
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dest'));
});

gulp.task('power-assert', function() {
    return gulp.src('test/*.js')
      .pipe(espower())
      .pipe(gulp.dest('espowered'))
});

gulp.task('test', ['power-assert'], function() {
    return  gulp.src(['espowered/*.js'], {read:false})
      .pipe(mocha({reporter: 'list'}));
});

gulp.task('cover', ['power-assert'], function() {
    return gulp.src(['src/*.js'])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
      .on('end', function() {
          return gulp.src(['espowered/*.js'])
            .pipe(mocha())
            .pipe(istanbul.writeReports('coverage'));
      });
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: ['.']
    },
    notify : false
  });
  gulp.watch('./src/*.js', ['build'], browserSync.reload);
});
