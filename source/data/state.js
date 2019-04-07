const STATE = {
  numberOfSlots: 5,
  dropTargets: [
    `corner-top-left`,
    `corner-top-right`,
    `corner-bottom-left`,
    `corner-bottom-right`,
    `acceptor-top`,
    `acceptor-right`,
    `acceptor-bottom`,
    `acceptor-left`,
    `central`
  ],
  willSlotsText: `Будет разложено карт: `,
  restartText: `Разложить заново`,
  reloadTitle: `Начать повторную раскладку на`,
  reloadSingular: `слот`,
  reloadPlural: `слота`,

  // Данные для генерации карт
  suits: {
    clubs: `Трефы`,
    diamonds: `Бубны`,
    hearts: `Червы`,
    spades: `Пики`
  },
  names: {
    1: `туз`,
    11: `валет`,
    12: `дама`,
    13: `король`
  },
  values: {
    1: `A`,
    11: `J`,
    12: `Q`,
    13: `K`
  }
};
