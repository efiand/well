'use strict';

const { gulp, plugins, functions, filters, settings } = require(`../store`);
const { html, common } = settings.tasks;

// Фильтры шаблонизатора
plugins.requireDir(`filters`);

// Добавляется к ресурсам для использования в похожих задачах (AMP)
functions.html = () => {
  return gulp.src(html.src.compile)
    .pipe(plugins.plumber())
    .pipe(plugins.data((filename) => {
      return functions.resolvePageData(filename, functions, settings);
    }))
    .pipe(plugins.nunjucksRender({
      manageEnv: (env) => {
        env.opts.autoescape = false;

        Object.keys(filters).forEach((filter) => {
          env.addFilter(filter, filters[filter]);
        });
      }
    }))
    .pipe(plugins.if(settings.isDev, plugins.htmlBeautify(), plugins.htmlmin(html.min)))
    .pipe(plugins.if(settings.isDev, plugins.replace(/="(.+?)"/gs, (match, pattern) => {
      return `="${pattern.trim().replace(/\s+/gs, ` `)}"`;
    })))
    .pipe(plugins.if(settings.isDev, plugins.replace(/<(p|li)([^>]*?)> /g, `<$1$2>`)));
};

gulp.task(`html:compile`, () => {
  return functions.html()
    .pipe(gulp.dest(common.dest));
});

gulp.task(`html:lintspaces`, () => {
  return gulp.src(html.src.lintspaces)
    .pipe(plugins.plumber())
    .pipe(plugins.lintspaces(common.lintspaces))
    .pipe(plugins.lintspaces.reporter());
});

gulp.task(`html`, gulp.parallel(`html:compile`, `html:lintspaces`));
