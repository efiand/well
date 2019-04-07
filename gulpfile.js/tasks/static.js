'use strict';
// Копирование не нуждающихся в обработке исходников в билд

const { gulp, plugins, settings } = require(`../store`);
const { tasks } = settings;

gulp.task(`static:copy`, () => {
  return gulp.src(tasks.static.src.copy)
    .pipe(gulp.dest(tasks.common.dest));
});

gulp.task(`static:lintspaces`, () => {
  return gulp.src(tasks.static.src.lintspaces)
    .pipe(plugins.plumber())
    .pipe(plugins.lintspaces(tasks.common.lintspaces))
    .pipe(plugins.lintspaces.reporter());
});

gulp.task(`static`, gulp.parallel(`static:copy`, `static:lintspaces`));
