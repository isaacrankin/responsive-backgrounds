var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('js', function () {
    return gulp.src('responsive-backgrounds.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['js']);
