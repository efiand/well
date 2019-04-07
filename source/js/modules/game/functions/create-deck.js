// Генерация разметки карт
const createDeck = () => {

  // Тасуем удвоенную колоду
  const cards = shuffleArray(deckComponents.concat(deckComponents));
  const deck = document.createDocumentFragment();
  for (let i = 0; i < cards.length; i++) {
    const options = cards[i].split(`-`);
    const btn = document.createElement(`div`);

    // Раскладываем по 11 карт по стенкам колодца, остальные в колоду
    let suffix = `control card--run`;
    if (i < 11) {
      suffix = `donor-top`;
    } else if (i < 22) {
      suffix = `donor-left`;
    } else if (i < 33) {
      suffix = `donor-right`;
    } else if (i < 44) {
      suffix = `donor-bottom`;
    }

    // Классы и дата-атрибуты карт (IE-совместимый синтаксис)
    btn.setAttribute(`class`, `card card--${suffix} card--shirt card--${options[0]}`);
    btn.setAttribute(`data-card`, cards[i]);

    // Центральный контейнер
    let SVG = createSVG(cards[i]);
    SVG.setAttribute(`class`, `card__info card__svg`);
    SVG.setAttribute(`title`, `${STATE.suits[options[0]]}: ${STATE.names[options[1]] || options[1]}`);
    btn.appendChild(SVG);

    // Контейнер в левом верхнем углу
    const block = document.createElement(`span`);
    block.classList.add(`card__corner`);
    block.classList.add(`card__corner--` + options[0]);
    block.textContent = STATE.values[options[1]] || options[1];

    // Левый верхний угол
    SVG = createSVG(options[0]);
    SVG.setAttribute(`class`, `card__icon card__svg`);
    block.appendChild(SVG);
    btn.appendChild(block);

    // Правый нижний угол
    const blockCopy = block.cloneNode(true);
    block.classList.add(`card__corner--bottom`);
    btn.appendChild(blockCopy);

    // Для крайней карты или карты по углам
    if (i === 103) {
      btn.addEventListener(`click`, currentClickHandler);
      btn.setAttribute(`title`, `${STATE.willSlotsText}${numberOfSlots}`);
    } else if (i < 44) {
      btn.addEventListener(`click`, donorClickHandler);
    } else {
      addDragHandlers(btn);
    }

    // Добавление к колоде
    deck.appendChild(btn);
  }

  table.appendChild(deck);
};
