'use strict';

const { gulp, plugins, settings } = require(`../store`);

// Очистка каталога билда перед сборкой
gulp.task(`clean`, () => {
  return plugins.del(settings.tasks.del.src);
});
