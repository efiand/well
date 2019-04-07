// Вычисление координат дропзон
const getDropCoords = () => {
  for (let i = 0; i < STATE.dropTargets.length; i++) {
    const node = table.querySelector(`.card--${STATE.dropTargets[i]}`);
    dropTargetOptions[STATE.dropTargets[i]] = {
      left: baseLeft + node.offsetLeft,
      top: node.offsetTop
    };
  }
};
