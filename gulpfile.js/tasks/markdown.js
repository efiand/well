'use strict';

const { gulp, plugins, settings } = require(`../store`);
const { markdown, common } = settings.tasks;

// Линтинг markdown-файлов
gulp.task(`markdown:lint`, () => {
  return gulp.src(markdown.src)
    .pipe(plugins.remarkLintDko(markdown.lint))
    .pipe(plugins.remarkLintDko.report())
    .pipe(plugins.lintspaces(common.lintspaces))
    .pipe(plugins.lintspaces.reporter());
});
