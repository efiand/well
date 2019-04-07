'use strict';
// Запуск сервера browsersync

const { gulp, plugins, settings } = require(`../store`);
const { common } = settings.tasks;

gulp.task(`server`, () => {
  plugins.server.init(common.server);

  // Система слежения, полностью настраиваемая в /source/data/server.json
  settings.project.watchers.forEach((watcher) => {
    gulp.watch(watcher[0], gulp.series(...watcher[1], `server:reload`));
  });
});

gulp.task(`server:reload`, (done) => {
  plugins.server.reload();
  done();
});
