var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var mocha = require('gulp-mocha');
var espower = require('gulp-mocha');

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
