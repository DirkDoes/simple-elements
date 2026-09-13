# Brand theme

Import the setter alongside the components and provide the primary brand color. The library derives the light and dark role colors in OKLCH, so controls, focus states, badges, avatars, pickers, and other brand treatments update together.

```js
import { setBrandTheme } from 'simple-elements';

setBrandTheme({ primary: '#7c3aed' });
```

The theme object intentionally uses a `primary` key so a secondary brand family can be added later. The current release only applies `primary`.

The light theme is unchanged. Dark mode uses charcoal surfaces, off-white text, and lighter elevated panels with subtle shadows. Brand hue stays consistent across modes: the dark palette raises accent lightness and limits saturation so links, selected controls, and button labels remain readable, including for very dark or bright custom brand colors. Soft brand and status backgrounds are restrained, opaque tints.

Filled brand buttons, switches, and calendar selections carry the accent. Content-heavy areas such as sent chat bubbles and project banners use neutral surfaces; selection chips and decorative dashboard icons are neutral too. Active navigation keeps a subtle brand tint and an accent edge. Keyboard focus uses a visible brand outline.

`npm test` checks text contrast (4.5:1), control outlines (3:1), surface ordering, and brand foreground/background pairs across 216 sampled colors. It also checks that the default CSS palette matches the runtime setter.

Design references: [Atlassian elevation](https://atlassian.design/foundations/elevation/) explains lighter elevated surfaces and shadows in dark themes; [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) defines text contrast requirements.

When using the browser bundle directly, call the same API through `SimpleElements.setBrandTheme({ primary: '#7c3aed' })`.
