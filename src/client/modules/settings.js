import { NonNull } from "#common/utils/non-null.js";

/**
 * Поле игры
 *
 * @type {HTMLElement}
 */
export const tableElement = NonNull(document.querySelector(".table"));

/**
 * Модальное окно с правилами
 *
 * @type {HTMLElement}
 */
export const rulesElement = NonNull(document.querySelector(".rules"));

/**
 * Кнопка закрытия правил
 *
 * @type {HTMLElement}
 */
export const closeButtonElement = NonNull(rulesElement.querySelector(".rules__closer"));

/**
 * Кнопка перезапуска
 *
 * @type {HTMLElement}
 */
export const restartButtonElement = NonNull(rulesElement.querySelector(".rules__restart"));

/**
 * Сообщение о выигрыше
 *
 * @type {HTMLElement}
 */
export const winMessageElement = NonNull(rulesElement.querySelector(".rules__win"));

/**
 * Кнопка сдачи карт
 *
 * @type {HTMLElement}
 */
export const reloadButttonElement = NonNull(tableElement.querySelector(".card--reload"));

/**
 * Кнопка открытия модального окна
 *
 * @type {HTMLElement}
 */
export const rulesOpenerElement = NonNull(tableElement.querySelector(".table__rules-opener"));

/**
 * Величина отступа от края браузера до края стола
 *
 * @type {number}
 */
export const baseLeft = (document.body.clientWidth - tableElement.clientWidth) / 2;

/**
 * Карты в колодах
 *
 * @type {string[]}
 */
export const deckComponents = [];

/**
 * Хранилище данных о дропзонах
 *
 * @type {Record<string, { left: number; top: number }>}
 */
export const dropTargetOptions = {};
