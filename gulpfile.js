var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha'),
  plumber = require('gulp-plumber'),
  runSequence = require('run-sequence');

gulp.task('generate', require('angular-generator').generate);

gulp.task('test:client', require('./build/test').client);
gulp.task('test:server', require('./build/test').server);

gulp.task('build', require('./build/build'));

gulp.task('watch', require('./build/watch'));

gulp.task('serve', require('./build/serve'));

gulp.task('default', ['test:client', 'test:server', 'serve', 'watch']);