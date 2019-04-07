'use strict';
// Замена абсолютного пути к корню на путь к хосту публикации

const { filters } = require(`../store`);

filters.manageRoot = (code, host = ``) => {
  if (code && host) {
    return code.replace(/="\//g, `="${host}/`);
  }

  return code;
};
