var gulp = require('gulp'),
    browserSync = require('browser-sync').create();
gulp.task('default', function() {
  // Static server
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(['./**/*'], browserSync.reload);
});
