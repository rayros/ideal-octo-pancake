"use strict";
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    ghPages = require('gulp-gh-pages');
gulp.task('default', function() {
  // Static server
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(['./*.js', './*.html', './*.css'], browserSync.reload);
});
gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages());
});
