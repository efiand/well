'use strict';

const { gulp, plugins, settings } = require(`../store`);
const { css, common } = settings.tasks;

const sass = plugins.sass(require(`sass`));

gulp.task(`css:compile`, () => {
  return gulp.src(css.src.compile)
    .pipe(plugins.plumber())
    .pipe(plugins.include())
    .pipe(plugins.if(settings.isDev, plugins.sourcemaps.init()))
    .pipe(sass())
    .pipe(plugins.postcss([
      require(`postcss-sort-media-queries`)(),
      require(`autoprefixer`)()
    ]))
    .pipe(plugins.csscomb())
    .pipe(plugins.if(settings.isDev, plugins.sourcemaps.write(`.`)))
    .pipe(gulp.dest(css.dest))
    .pipe(plugins.if(!settings.isDev, plugins.csso()))
    .pipe(plugins.if(!settings.isDev, plugins.rename(common.rename)))
    .pipe(plugins.if(!settings.isDev, gulp.dest(css.dest)));
});

gulp.task(`css:lint`, () => {
  return gulp.src(css.src.lint)
    .pipe(plugins.plumber())
    .pipe(plugins.stylelint(css.stylelint))
    .pipe(plugins.lintspaces(common.lintspaces))
    .pipe(plugins.lintspaces.reporter());
});

gulp.task(`css`, gulp.parallel(`css:compile`, `css:lint`));
