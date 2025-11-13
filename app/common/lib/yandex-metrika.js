import { html } from "#common/utils/mark-template.js";

export const YANDEX_METRIKA_TEMPLATE = html`
	<!-- Yandex.Metrika counter -->
	<script>
		setTimeout(() => {
			(function (m, e, t, r, i, k, a) {
				m[i] =
					m[i] ||
					(function () {
						(m[i].a = m[i].a || []).push(arguments);
					});
				m[i].l = 1 * new Date();
				for (var j = 0; j < document.scripts.length; j++) {
					if (document.scripts[j].src === r) {
						return;
					}
				}
				(k = e.createElement(t)),
					(a = e.getElementsByTagName(t)[0]),
					(k.async = 1),
					(k.src = r),
					a.parentNode.insertBefore(k, a);
			})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

			ym(99938263, "init", {
				accurateTrackBounce: true,
				clickmap: true,
				trackLinks: true,
				webvisor: true,
			});
		}, 3000);
	</script>
	<noscript>
		<img class="_visually-hidden" src="https://mc.yandex.ru/watch/99938263" alt="">
	</noscript>
	<!-- /Yandex.Metrika counter -->
`;
