import { html } from "#common/utils/mark-template.js";

export const RULES_TEMPLATE = html`
	<section class="rules">
		<div class="rules__inner">
			<h1 class="rules__header">Пасьянс «Колодец»</h1>
			<p class="rules__win" hidden>Вы победили!</p>
			<div class="rules__group">
				<button class="rules__button rules__closer" type="button" hidden>Вернуться к игре</button>
				<button class="rules__button rules__restart" type="button">Разложить</button>
				<a class="rules__button rules__telegram" href="https://t.me/WellCardGameBot" target="_blank">
					Играть в Telegram
				</a>
			</div>
			<p class="rules__text">
				Цель игры — собрать 104 карты (2 колоды) в четырёх угловых слотах, повёрнутых на 45°. На каждый слот кладутся карты одной масти в порядке уменьшения достоинства — от короля до туза, затем король и так далее до второго туза.
			</p>
			<p class="rules__text">
				Изначально карты повёрнуты к игроку рубашкой и находятся в пяти колодах: четыре верхних (по 11 карт) — по сторонам от центрального слота, пятая — в левом нижнем углу.
			</p>
			<p class="rules__text">
				В каждой верхней колоде открывается (клик по рубашке) одна карта. С нижней колоды после клика карты снимаются на расположенные в этом же ряду слоты: сначала на все 5, потом, когда колода закончится, кликом по её слоту (обозначенному кружком), она вновь собирается и раскладывается уже по 4 карты, потом по 3, потом по 2, потом по 1.
			</p>
			<p class="rules__text">
				Все открываемые карты независимо от колоды можно складывать не только на угловые слоты, но и на любые слоты, расположенные около верхних колод (в порядке возрастания начиная с любой карты), или на центральный слот (в порядке возрастания начиная с туза).
			</p>
			<p class="rules__text">В один слот нельзя складывать карты разных мастей.</p>
			<p class="rules__text">Кнопка входа в данное меню находится в нижнем ряду справа.</p>

			<p class="rules__copy">
				© Разработка — <a href="https://efiand.ru">efiand</a>, иллюстрации — <a href="https://ru.freepik.com">freepik</a>.
			</p>
		</div>
	</section>
`;
