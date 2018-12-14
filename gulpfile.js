const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS & auto-inject into browsers
//node_modules/bootstrap/scss/bootstrap.scss


gulp.task('sass', function () {
 return gulp.src('assets/scss/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
   }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('assets/css'))
  .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['assets/scss/*.scss'], ['sass']);
    gulp.watch(["*.html","assets/js/*.js"]).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);  