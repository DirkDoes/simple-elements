# Simple Elements

Framework-free UI components built with standard custom elements, Tailwind CSS, and vanilla JavaScript. Every component supports Flat, Clean, Studio, and Edge visual themes, each with light and dark modes.

## Install

```sh
npm install github:DirkDoes/simple-elements
```

```js
import 'simple-elements';
import 'simple-elements/styles.css';
```

```html
<se-button variant="brand" text="Save changes"></se-button>
```

Set the color mode on `<html>`:

```js
document.documentElement.dataset.theme = 'dark'; // or 'light'
```

Set the primary brand color at runtime; the library derives light and dark role colors in OKLCH:

```js
import { setBrandTheme } from 'simple-elements';

setBrandTheme({ primary: '#7c3aed' });
```

Flat is the default visual theme in both light and dark modes. Select Clean (previously Standard) with the same stylesheet:

```js
document.documentElement.dataset.seTheme = 'clean'; // or 'flat'
```

Clean-only apps can import `simple-elements/themes/clean.css` instead of `styles.css` to omit Flat's styles. See [themes](./docs/theme.md) or the [GitHub wiki](https://github.com/DirkDoes/simple-elements/wiki/theme) for fixed themes, a theme selector, saved preferences, and migration from 0.4.0.

Consumers do not need a build step or Tailwind configuration: the package ships compiled CSS. Tailwind is a development dependency used for the library's theme tokens and CSS build, so it does not reset or couple the host application's styles.

Icons are supplied by the framework-free `lucide` package. The browser bundle embeds only the curated icons exposed through `<se-icon>`.

For a page opened directly from disk, use the browser-ready bundle (CSS files also work over `file://`):

```html
<link rel="stylesheet" href="simple-elements/dist/styles.css">
<script defer src="simple-elements/dist/simple-elements.js"></script>
```

Studio is an optional third visual theme with cool neutrals, fine outlines, and subtle depth. Load `simple-elements/themes/studio.css` after `styles.css` and set `data-se-theme="studio"` on `<html>`. See the [Studio setup](./docs/theme.md#studio-optional).

Edge is another optional theme with neutral surfaces, square controls, and diamond icon holders. Load `simple-elements/themes/edge.css` after your base CSS and select `data-se-theme="edge"`. Studio and Edge are excluded from the default bundle; see [all theme setups](./docs/theme.md#choose-a-stylesheet).

## Development

```sh
npm install
npm run build
npm test
```

Build the showcase after editing `examples/pages/*.html`, then open `examples/index.html` in a browser. The generated index is also the deployed entry point.

The [live showcase](https://dirkdoes.github.io/simple-elements/) demonstrates the components. Concise, AI-friendly API documentation lives in [`docs`](./docs/index.md) and is included when installing directly from GitHub.

Component icon inputs support Lucide names, external SVGs, and foreground-aware light/dark artwork with optional color preservation. See [icons](./docs/icon.md).
