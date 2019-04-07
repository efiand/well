'use strict';
// Замена пути к корню в инлайновом CSS, сделанном из обычного для AMP-страниц

const { filters } = require(`../store`);

filters.prepareInlineCss = (code) => {
  return code.replace(/^\s*@charset "UTF-8";/, ``);
};
