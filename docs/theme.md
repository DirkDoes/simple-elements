# Brand theme

Import the setter alongside the components and provide the primary brand color. The library derives the light and dark role colors in OKLCH, so controls, focus states, badges, avatars, pickers, and other brand treatments update together.

```js
import { setBrandTheme } from 'simple-elements';

setBrandTheme({ primary: '#7c3aed' });
```

The theme object intentionally uses a `primary` key so a secondary brand family can be added later. The current release only applies `primary`.

The light theme keeps its original cool-white palette. The dark theme uses neutral black and gray surfaces, creates hierarchy with progressively lighter surfaces and borders instead of elevation shadows, and reserves brighter brand and semantic colors for interaction, status, and attention. Normal text maintains at least WCAG AA contrast against the standard dark surfaces.

When using the browser bundle directly, call the same API through `SimpleElements.setBrandTheme({ primary: '#7c3aed' })`.
