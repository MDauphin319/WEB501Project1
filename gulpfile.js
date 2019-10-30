const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const del = require('delete');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const typescript = require('gulp-typescript');

function css() {
  return src('source/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('prod/ui/'));
}

function html() {
  return src('source/**/*.html').pipe(dest('prod/'));
}

function js() {
  return src(['source/js/*.js', 'source/js/*.ts'])
	.pipe(typescript({ target: 'ES6', allowJs: true}))
	.pipe(terser())
	.pipe(concat('main.js'))
	.pipe(dest('prod/ui/'));
}

function picture() {
  return src('source/**/*.jpg').pipe(dest('prod/'));
}

function watch_task() {
  watch('source/scss/**/*.scss', series(css, reload));
  watch('source/**/*.html', series(html, reload));
  watch('source/js/**/*.js', series(js, reload));
  watch('source/**/*.jpg', series(picture, reload));
}

function sync(cb) {
  browserSync.init({
    server: { baseDir: 'prod/' }
  });
  cb();
}

function reload(cb) {
  browserSync.reload();
  cb();
}

function clean(cb){
	del('prod/**/*', cb);
}

exports.clean = clean;
exports.build = series(clean, parallel(css, html, js, picture));
exports.default = series(exports.build, sync, watch_task);