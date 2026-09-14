# Themes and brand colors

Import the setter alongside the components and provide the primary brand color. The library derives the light and dark role colors in OKLCH, so controls, focus states, badges, avatars, pickers, and other brand treatments update together.

```js
import { setBrandTheme } from 'simple-elements';

setBrandTheme({ primary: '#7c3aed' });
```

The theme object intentionally uses a `primary` key so a secondary brand family can be added later. The current release only applies `primary`.

Both visual themes share the light and dark color palettes. Dark mode uses charcoal surfaces and off-white text. Clean adds subtle elevation shadows; Flat removes them. Brand hue stays consistent across modes: the dark palette raises accent lightness and limits saturation so links, selected controls, and button labels remain readable, including for very dark or bright custom brand colors. Soft brand and status backgrounds are restrained, opaque tints.

Filled brand buttons, switches, and calendar selections carry the accent. Content-heavy areas such as sent chat bubbles and project banners use neutral surfaces; selection chips and decorative dashboard icons are neutral too. Active navigation keeps a subtle brand tint. Keyboard focus uses a visible brand outline.

`npm test` checks text contrast (4.5:1), control outlines (3:1), surface ordering, and brand foreground/background pairs across 216 sampled colors. It also checks that the default CSS palette matches the runtime setter.

Design references: [Atlassian elevation](https://atlassian.design/foundations/elevation/) explains lighter elevated surfaces and shadows in dark themes; [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) defines text contrast requirements.

When using the browser bundle directly, call the same API through `SimpleElements.setBrandTheme({ primary: '#7c3aed' })`.


## Visual themes and color modes

Flat, Clean (previously Standard), Studio, and Edge are **visual themes**. Light and dark are independent **color modes**.

Flat is the default: no theme attribute or additional stylesheet is needed.

```js
import 'simple-elements';
import 'simple-elements/styles.css';

document.documentElement.dataset.theme = 'dark'; // or 'light'
document.documentElement.dataset.seTheme = 'clean'; // or 'flat'; omit for Flat
```

The default stylesheet supports switching between both themes. Clean-only applications can import `simple-elements/themes/clean.css` **instead of** `styles.css`; it contains the complete base styles without Flat overrides. No theme CSS is embedded in JavaScript.

For direct browser use, load `dist/styles.css` and `dist/simple-elements.js`. Set `data-se-theme="clean"` on `<html>` to select Clean, or omit the attribute for Flat. A Clean-only page can use `dist/themes/clean.css` instead. Keep per-user preferences in the application's existing settings store. Theme attributes are document-wide; use an iframe for independently themed documents.

Both themes use `setBrandTheme({ primary: '#7c3aed' })`. Flat keeps Clean's palette, spacing, typography, and radii. It removes decorative outlines and shadows, uses filled controls with an underline, and retains keyboard focus, selection markers, error colors, and overlay boundaries. Both support light and dark modes with identical component behavior.

## Choose a stylesheet

| App setup | Import | Root attribute |
| --- | --- | --- |
| Flat only (default) | `simple-elements/styles.css` | Omit `data-se-theme`, or use `flat` |
| Clean only | `simple-elements/themes/clean.css` | `data-se-theme="clean"` |
| Studio only | `themes/clean.css` then `themes/studio.css` | `data-se-theme="studio"` |
| Edge only | `themes/clean.css` then `themes/edge.css` | `data-se-theme="edge"` |
| All four selectable | `styles.css` then `themes/studio.css` and `themes/edge.css` | `flat`, `clean`, `studio`, or `edge` |
| Flat and Clean selectable | `simple-elements/styles.css` | Switch between `flat` and `clean` |

All import paths in this table are relative to `simple-elements/`. Load one complete base stylesheet, followed by only the optional theme sheets you need. `themes/flat.css` is an override-only compatibility entry, not a standalone stylesheet; it is already included in `styles.css`. Do not load it again with the default stylesheet. Clean-only builds omit those overrides. Flat reuses the shared component rules rather than duplicating a full theme.

Set theme and color mode on the app's `<html>` element, preferably in the initial server-rendered HTML or an early startup script to avoid a flash of the wrong theme:

```html
<html data-se-theme="clean" data-theme="dark">
```

For a fixed Clean app:

```js
import 'simple-elements';
import 'simple-elements/themes/clean.css';
// Set data-se-theme="clean" in the initial HTML.
```

## Let users choose in the app

Load `styles.css` for both themes. Put the theme selector in your app's settings or top bar. Theme family and light/dark mode are independent settings; `se-theme-switch` emits changes but does not apply them to the document automatically.

This example uses native selects for a complete, framework-free settings UI:

```html
<label>Theme
  <select id="visual-theme">
    <option value="flat">Flat</option>
    <option value="clean">Clean</option>
  </select>
</label>
<label>Color mode
  <select id="color-mode">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</label>
```

Run this after the controls exist:

```js
const root = document.documentElement;
for (const [id, key, allowed, fallback] of [
  ['visual-theme', 'seTheme', ['flat', 'clean'], 'flat'],
  ['color-mode', 'theme', ['light', 'dark'], 'light'],
]) {
  const control = document.getElementById(id);
  let saved;
  try { saved = localStorage.getItem(key); } catch { /* Storage may be blocked. */ }
  const initial = saved ?? root.dataset[key];
  control.value = root.dataset[key] = allowed.includes(initial) ? initial : fallback;
  control.addEventListener('change', () => {
    root.dataset[key] = control.value;
    try { localStorage.setItem(key, control.value); } catch { /* Keep the session choice. */ }
  });
}
```

For account preferences, store these same values in your existing user settings and render them on `<html>` at startup. Changing a theme does not reset the brand color or component values. With `se-select` or `se-theme-switch`, use `event.detail.value` in the `change` listener to update the corresponding root dataset property. System color preference must be resolved to `light` or `dark` using `matchMedia('(prefers-color-scheme: dark)')`; `data-theme="system"` is not a CSS mode.

## Migrating from 0.4.0

Version 0.5.0 changes the default appearance to Flat. To keep the previous Standard appearance, select `clean` and optionally use the Clean-only stylesheet. Rename saved `standard` preferences to `clean`; absent theme preferences now mean Flat. Component APIs and brand-color configuration are unchanged.

## Showcase source

Edit `examples/pages/shell.html` for navigation and the top bar, `examples/pages/dashboard.html` for the dashboard, and `examples/pages/input.html` for the custom input reference. `npm run build` assembles `examples/index.html`; do not edit that generated file directly. The deployment remains one static entry point, with no runtime HTML fetches.

The other component pages already share the renderer in `examples/example.js` and definitions in `examples/catalog.js`. A new component page normally needs one catalog entry, not copied HTML or a separate template. The showcase uses the default stylesheet and provides its own theme selector; embedded layout previews follow the selected theme, color mode, and brand color.

Run `npm test` for build, packaging, and palette checks. Open `test/select-layout.html` in a browser for selection-layout regressions in all four themes and both color modes.

## Studio (optional)

Studio adds cool neutral surfaces, fine outlines, compact corners, and restrained elevation for professional workspaces. It supports light and dark modes and the existing brand-color API. Flat remains the default; Flat and Clean retain their appearance.

```js
import 'simple-elements';
import 'simple-elements/styles.css';
import 'simple-elements/themes/studio.css'; // after the default stylesheet

document.documentElement.dataset.seTheme = 'studio';
document.documentElement.dataset.theme = 'dark'; // or 'light'
```

For a Studio-only app, use `themes/clean.css` as the base instead of `styles.css`, then load `themes/studio.css`. To offer Flat, Clean, and Studio, load `styles.css` and `themes/studio.css` once, add Studio to your theme selector, and allow `studio` in your saved-preference validation. The optional sheet has no effect unless `data-se-theme="studio"` is set on `<html>`. Browser script users can load `dist/themes/studio.css` after their base CSS. Component APIs and values do not change when switching themes.

## Edge (optional)

Edge uses square panels, 2px control corners, neutral white and charcoal surfaces, and crisp offset overlay shadows. Light and dark modes share the brand-color API. Switches, radio indicators, segmented selections, and range tracks use square corners. Range handles are solid 45-degree diamonds.

```js
import 'simple-elements/styles.css';
import 'simple-elements/themes/edge.css';
document.documentElement.dataset.seTheme = 'edge';
```

For Edge-only apps, use `themes/clean.css` as the base instead of `styles.css`. Add `edge` to your theme selector and saved-preference allowlist to offer it alongside other themes. The optional stylesheet only applies when Edge is selected.

Edge uses square upload areas and checkboxes. Decorative upload, modal, and empty-state icon holders form 45-degree diamonds while their icons stay upright; profile avatars are not rotated.

## Offering all four themes

```js
import 'simple-elements';
import 'simple-elements/styles.css';
import 'simple-elements/themes/studio.css';
import 'simple-elements/themes/edge.css';
```

Add Studio and Edge options to the app selector above, and extend its allowed values to `['flat', 'clean', 'studio', 'edge']`. Apply the choice to `document.documentElement.dataset.seTheme`. Loading either optional stylesheet alone does not activate it: its matching root attribute is required. Flat remains the default. Studio and Edge are not embedded in the default CSS or JavaScript bundle.

Version 0.6.0 adds Studio and Edge without changing the default theme or requiring existing Flat/Clean apps to import anything new. The showcase loads both optional stylesheets so visitors can select all four themes.
