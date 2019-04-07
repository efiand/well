'use strict';
// Создание каталога /tmp для спрайтов, favicons и т.п.

const { gulp } = require(`../store`);

gulp.task(`tmp`, () => {
  return gulp.src(`package.json`, { read: false })
    .pipe(gulp.dest(`tmp`));
});
