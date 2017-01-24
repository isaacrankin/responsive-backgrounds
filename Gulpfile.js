const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function () {
  return gulp.src('./ResponsiveBackgrounds.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('./ResponsiveBackgrounds.js', ['js']);
});

gulp.task('default', ['js']);
