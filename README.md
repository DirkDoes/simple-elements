# Simple Elements

Framework-free UI components built with standard custom elements, Tailwind CSS, and vanilla JavaScript. Every component supports light and dark themes.

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

Set the theme on any ancestor (normally `<html>`):

```js
document.documentElement.dataset.theme = 'dark'; // or 'light'
```

Consumers do not need a build step or Tailwind configuration: the package ships compiled CSS. Tailwind is a development dependency used for the library's theme tokens and CSS build, so it does not reset or couple the host application's styles.

Icons are supplied by the framework-free `lucide` package. The browser bundle embeds only the curated icons exposed through `<se-icon>`.

For a page opened directly from disk, use the browser-ready bundle (CSS files also work over `file://`):

```html
<link rel="stylesheet" href="simple-elements/dist/styles.css">
<script defer src="simple-elements/dist/simple-elements.js"></script>
```

## Development

```sh
npm install
npm run build
npm test
```

Open `examples/index.html` directly in a browser; no server is needed.

The [live showcase](https://dirkdoes.github.io/simple-elements/) demonstrates the components. Concise, AI-friendly API documentation lives in [`docs`](./docs/index.md) and is included when installing directly from GitHub.
