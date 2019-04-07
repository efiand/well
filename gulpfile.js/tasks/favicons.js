'use strict';
// Генерация иконок с помощью RealFaviconGenerator

const { gulp, plugins, functions, settings } = require(`../store`);
const { favicons, common } = settings.tasks;

gulp.task(`favicons`, (done) => {
  favicons.dest = common.dest;
  favicons.design.ios.appName = settings.project.siteName;
  favicons.design.windows.appName = settings.project.siteName;
  favicons.design.androidChrome.manifest.name = settings.project.siteName;

  plugins.realFavicon.generateFavicon(favicons, () => {
    const faviconsConfig = functions.smartRequire(favicons.markupFile);
    settings.project.faviconsCode = faviconsConfig.favicon.html_code;

    plugins.realFavicon.checkForUpdates(faviconsConfig.version, (error) => {
      if (error) {
        throw error;
      }
    });
    return done();
  });
});
