'use strict';

const { gulp, plugins, settings } = require(`../store`);
const { scripts, common } = settings.tasks;

gulp.task(`scripts:compile`, () => {
  return gulp.src(scripts.src.compile)
    .pipe(plugins.plumber())
    .pipe(plugins.include())
    .pipe(plugins.replace(/\s'use strict';/g, ``))
    .pipe(plugins.replace(/const.*?= require.*?;/g, ``))
    .pipe(plugins.replace(/\/\/=/g, `// (Not found!)`))
    .pipe(plugins.beautify())
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.babel())
    .pipe(plugins.beautify())
    .pipe(gulp.dest(scripts.dest))
    .pipe(plugins.if(!settings.isDev, plugins.uglify()))
    .pipe(plugins.if(!settings.isDev, plugins.rename(common.rename)))
    .pipe(plugins.if(!settings.isDev, gulp.dest(scripts.dest)));
});

gulp.task(`scripts:eslint`, () => {
  return gulp.src(scripts.src.eslint)
    .pipe(plugins.plumber())
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task(`scripts:lintspaces`, () => {
  return gulp.src(scripts.src.lintspaces)
    .pipe(plugins.plumber())
    .pipe(plugins.lintspaces(common.lintspaces))
    .pipe(plugins.lintspaces.reporter());
});

gulp.task(`scripts`, gulp.parallel(`scripts:compile`, `scripts:eslint`, `scripts:lintspaces`));
