var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers
//node_modules/bootstrap/scss/bootstrap.scss
/* gulp.task('sass', function() {
    return gulp.src("assets/scss/app.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
}); */


gulp.task('sass', function () {
 return gulp.src('assets/scss/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('assets/css'))
  .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        port: 5000,
        server: "./"  
    });

    gulp.watch(['assets/scss/*.scss'], ['sass']);
    gulp.watch(["*.html","assets/js/*.js"]).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);  