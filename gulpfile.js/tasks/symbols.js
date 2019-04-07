'use strict';
// Создание символьного векторного спрайта

const { gulp, plugins, settings } = require(`../store`);
const { symbols, svgo } = settings.tasks;

gulp.task(`symbols`, () => {
  return gulp.src(symbols.src)
    .pipe(plugins.imagemin([plugins.imagemin.svgo(svgo)]))
    .pipe(gulp.dest(symbols.dest.icons))
    .pipe(plugins.svgstore(symbols.options))
    .pipe(plugins.rename(symbols.filename))
    .pipe(gulp.dest(symbols.dest.sprite));
});
