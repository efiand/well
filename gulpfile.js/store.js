'use strict';

module.exports = {
  gulp: require(`gulp`),

  plugins: {
    ...require(`gulp-load-plugins`)(),
    requireDir: require(`require-dir`),
    del: require(`del`),
    fs: require(`fs`),
    server: require(`browser-sync`).create()
  },

  functions: {},
  filters: {},

  settings: {
    isDev: !process.env.NODE_ENV || process.env.NODE_ENV !== `production`
  }
};
