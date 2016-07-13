/*jshint esversion: 6 */
'use strict';
const gulp = require('gulp'),
   nodemon = require('gulp-nodemon'),
   notify = require('gulp-notify'),
   jshint = require('gulp-jshint');

gulp.task('lint', function () {
  gulp.src('./server/**/*.js')
    .pipe(jshint())
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }));
});

gulp.task('run', function () {
  nodemon({ script: 'app.js',
           ext: 'html js',
//           ignore: ['ignored.js'],
           tasks: ['lint'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});
