'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});

gulp.task('sass:watch', function () {
    livereload.listen();
    gulp.watch('./src/**/*.scss', ['sass']);
});
