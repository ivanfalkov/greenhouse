# Migration Notes: Stable Move to v2

Goal: migrate `index.html` toward `C:/Users/iampr/Desktop/v2/index.html` step-by-step without breaking site availability.

## Why this process exists

- The site had intermittent opening issues in the user environment.
- Full replacement with the heavy v2 variant caused instability before.
- We now migrate in small, verifiable steps with strict rollback safety.

## Current status (DONE — целевое состояние v2-light достигнуто)

1. Restored known-good baseline from `Downloads/index (3).html`.
2. Applied safe head improvements:
   - updated viewport to `width=device-width, initial-scale=1, viewport-fit=cover`
   - added `theme-color`
   - added `format-detection`
   - added FAQ JSON-LD
3. Performance-safe cleanup:
   - removed external hero Unsplash background
   - removed preload image block and related preload JS
   - switched from remote Google Fonts to system fonts (faster first paint)
   - removed remote Font Awesome dependency; иконки — inline-спрайт в `index.html` (`<use href="#i-…">`), дубликат символов в `icons.svg` для удобства правок (Font Awesome 6 solid, CC BY 4.0)
   - hardened JS init with null-guards to avoid partial UI break on unstable loads
4. Header visual refresh (v2-like, light version):
   - chip-style nav buttons
   - телефон: круглая иконка отдельной ссылкой + номер второй ссылкой на ПК (на мобиле только иконка в шапке, полный номер в выезжающем меню)
   - кнопка меню с `z-index` и `touch-action`, чтобы не перехватывалась соседними зонами
   - adjusted main offset for fixed header
5. Hero moved to v2-like light structure:
   - `hero-bento` + блок **Доставка** (плитки Волхов / район / область, якорь на контакты-карту) без внешних картинок
   - полоса доверия с подписью «Нам доверяют»
   - gradient-only hero main (no heavy remote images)
   - preserved `reviewCount` ID and counter behavior
6. Catalog + services blocks aligned closer to v2 (light):
   - product cards: intro, price toggle, mini-calculator, CTA unchanged; в карточках с файлами — фото из `images/`
   - polycarbonate: featured card + UV title
   - additional services: `services-grid--four` + `service-card-prices` layout
7. Aligned with v2: no separate «Отзывы» section (only hero trust strip with `reviewCount` + stars); nav matches v2 flow + `#steps` (Этапы / моб. «Как мы работаем»).
8. Step 6 (v2 header & hero brand): `header-bar` карточка, логотип со знаком `sym-brand-greenhouse` + вордмарк; герой: kicker + знак в правой колонке.
9. Step 7: футер — знак + вордмарк ЛЕН/ОБЛ/ТЕПЛИЦЫ как в v2; якорь `#contact` на `<footer>`; копирайт «ЛЕНОБЛТЕПЛИЦЫ».

## Constraints to keep

- Do NOT add forced domain redirects in HTML (`window.location.replace`, meta refresh).
- Avoid heavy external dependencies where possible.
- Keep compatibility-first CSS and simple JS.
- After each step:
  - verify page opens
  - do hard refresh (`Ctrl+F5`)
  - only then continue.

## Completed migration steps (reference)

Step 3:
- [DONE] Start migrating catalog/cards toward v2 layout in two sub-steps:
  1) [DONE] visual markup/CSS only
  2) [DONE] calculator/interactive behavior (lightweight version)
     - [DONE] safe interactive reveal for prices in product cards
     - [DONE] lightweight calculator logic
- [DONE] Kept existing phone CTA behavior intact.

Step 4:
- [DONE] Migrate service sections toward v2 light visuals (CSS/markup only).
- [DONE] Polycarbonate block visual refresh:
  - highlighted featured default material card (`Green Stone 4 мм`)
  - added compact badge + footnote style
  - updated section title to include UV mention
- [DONE] Additional services block: `services-grid--four`, `service-card-prices`, equal-height cards, full-width CTA (behavior unchanged).

Step 5:
- [DONE] «Как мы работаем»: разметка `steps-track` + `role="list"`, 4 шага, подзаголовок «4 простых шага»; адаптив 2 колонки ≤992px, 1 колонка ≤768px.
- [DONE] Отзывы как в v2: отдельный блок карточек убран; соцдоказательство только в герое (рейтинг + счётчик отзывов); пункты «Отзывы» убраны из меню.

Step 6:
- [DONE] Шапка и бренд ближе к v2: `sym-brand-greenhouse`, `header-bar`, телефон с иконкой; пункт `#steps`; герой: kicker + знак в правой колонке.

Step 7:
- [DONE] Герой: блок «Доставка» с плитками (Волхов / район / область), кнопка-якорь на `#contact`.
- [DONE] Футер: логотип-знак + вордмарк в стиле v2.
- [DONE] Задачи из `README.md`: моб. меню vs звонок (слой кнопки + раздельные ссылки телефона); ПК — номер отдельно от круглой иконки; фото теплиц в каталоге где есть файлы в `images/`.

## Fast rollback strategy

- If a new step breaks opening, immediately restore `index.html` from the last known good local copy before retrying.
