'use strict';
// Путь в функцию нужно передавать от корня проекта

const { functions } = require(`../store`);

functions.smartRequire = (filename, Constructor = Object) => {
  let response = new Constructor();

  try {
    response = require(`../../${filename}`);
  } catch (error) {
    return response;
  }

  return response;
};
