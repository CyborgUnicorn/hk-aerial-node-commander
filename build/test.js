var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  mochaPhantom = require('gulp-mocha-phantomjs'),
  plumber = require('gulp-plumber'),
  runSequence = require('run-sequence');

gulp.task('jshint:client', function () {
  return gulp.src(['src/**/*.js', 'test/client/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha:client', function () {
  return gulp.src('test/client/**/*.html')
    .pipe(plumber())
    .pipe(mochaPhantom({reporter: 'spec'}));
});

gulp.task('jshint:server', function () {
  return gulp.src(['gulpfile.js', 'build/**/*.js', 'lib/**/*.js', 'test/server/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha:server', function () {
  return gulp.src('test/server/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}));
});

module.exports = {
  client: function (cb) {
    runSequence('jshint:client', 'mocha:client', cb);
  },
  server: function (cb) {
    runSequence('jshint:server', 'mocha:server', cb);
  }
};