# Icons

Every existing component icon attribute accepts a built-in Lucide name, an asset path/URL, or a JSON object. The same object works in the `icon` field of menu, select, profile-menu, split-button, and segmented-control options.

```html
<se-button icon="download" text="Download"></se-button>
<se-button icon="/assets/github.svg" text="GitHub"></se-button>
<se-button icon='{"light":"/assets/github-white.svg","dark":"/assets/github-black.svg","preserveLightColors":true,"preserveDarkColors":true}' text="GitHub"></se-button>
```

| Key | Meaning |
| --- | --- |
| `light` | Lucide name or asset URL to use when the icon's inherited foreground is light. |
| `dark` | Optional Lucide name or asset URL to use when its foreground is dark; falls back to `light`. |
| `preserveLightColors` | Keep the light source's original artwork colors (default `true`). `false` renders the silhouette in `currentColor`. |
| `preserveDarkColors` | Same choice for the dark foreground; defaults to `preserveLightColors`. |

**Light and dark describe the foreground, not the page mode.** A light-mode brand button with white text uses `light`; a dark-mode button with dark text uses `dark`. The shared renderer measures the inherited CSS foreground's relative luminance (threshold 0.179), and refreshes after theme/style changes, interaction, and color transitions. This follows the component's icon color, including places that intentionally use muted icons.

Built-in names always use `currentColor`. External files preserve their own colors by default. Setting a preserve flag to `false` uses a CSS mask: SVG colors are ignored, and the silhouette takes the design-system color. No arbitrary color override is exposed. Host SVG markup is never injected into the page. Use same-origin HTTP(S) assets for masks; cross-origin masks need CORS, and browsers restrict masks on `file://` pages.

In JavaScript, serialize objects when setting HTML attributes; option arrays can contain objects directly:

```js
const github = {
  light: '/assets/github-white.svg',
  dark: '/assets/github-black.svg',
  preserveLightColors: true,
  preserveDarkColors: true,
};
const button = document.createElement('se-button');
button.setAttribute('icon', JSON.stringify(github));
button.setAttribute('text', 'GitHub');
document.body.append(button);

select.options = [{ id: 'github', label: 'GitHub', icon: github }];
```

Set component attributes before mounting, as with their other initial configuration. On a standalone `<se-icon>`, the `name` attribute accepts the same inputs; its `icon` property also accepts an object and updates an already-mounted icon:

```js
iconElement.icon = github;
```

Supply `aria-label` on icon-only buttons. Icons are decorative; their source paths/configuration are not accessible labels.

Existing Lucide names and aliases continue to work, with size and color controlled by CSS. Unknown names and malformed configurations fall back to the alert icon. URLs resolve relative to the document, not the component source file. The dashboard uses the supplied GitHub assets: the file named `GitHub_dark.svg` contains white artwork, so it is mapped to `light` foreground.

Run the build/smoke checks with `npm test`, and open `test/icons.html` for browser coverage of assets, recoloring, foreground selection, option objects, and legacy Layout Brand assets.

Built-in icon data comes from [Lucide](https://lucide.dev/) (ISC); the browser bundle includes the library's curated icon names.

The preservation flags are JSON booleans (`true`/`false`), not strings. Omitting `dark` reuses `light`; omitting `preserveDarkColors` inherits the light preservation setting. Plain filenames with image extensions and relative or absolute URLs are supported. A missing/unloadable image remains a browser image-loading failure; fallback to the alert icon applies to unknown names or invalid configuration, not network failures.
