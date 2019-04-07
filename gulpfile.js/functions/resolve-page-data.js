'use strict';
// Функция, отправляющая настройки в шаблон текущей страницы при компиляции HTML

const { functions } = require(`../store`);

functions.resolvePageData = (filename, funcs, settings) => {
  return {
    isDev: settings.isDev,
    ...settings.project,
    minSuffix: settings.isDev ? `` : `.min`
  };
};
