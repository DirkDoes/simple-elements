# Migration to v0.18.0

This release adds composable avatars and media components, replaces the navigation tab bar with individual controls, and removes the Studio theme. It contains breaking changes from v0.17.0.

Install the tagged release:

```sh
npm install github:DirkDoes/simple-elements#v0.18.0
```

## Navigation

Replace `se-nav-tabs` with an application-owned `nav` containing one `se-nav-tab` per destination. Move each option's `label`, `href`, `icon`, and `disabled` onto its control. Rename `count` to `badge`, which accepts text. Set `active` on the current destination instead of setting the bar's `value`. Put `variant` on each control. Move adjacent actions outside the nav and define spacing, scrolling, and dividers in application CSS.

Replace direct imports of `components/nav-tabs.js` with `components/nav-tab.js`. See [Navigation tab](nav-tab.md) for examples and badge tones. These are navigation links/buttons; applications own routing and any tab-panel keyboard behavior.

## Identity pictures

Profile, Comment, and Chat Message no longer generate identity pictures from their own attributes. Supply an explicit avatar region:

```html
<se-profile name="Sarah Jenkins" subtitle="Designer" clickable>
  <se-avatar data-se-region="avatar" name="Sarah Jenkins" image="/people/sarah.jpg"></se-avatar>
</se-profile>
```

Move picture attributes such as `image`, `initials`, `icon`, and `tone` onto `se-avatar` as applicable. Remove Chat Message's old `profile` toggle. Without an avatar region there is no picture. A clickable Profile still wraps the picture and text in one button; do not put interactive content inside its avatar region.

Avatar supports circle/square shapes, image fallbacks, sizes, and optional standalone button behavior. Square is rounded in Flat/Clean and sharp in Edge. See [Avatar](avatar.md).

Chat avatars and their bubble corners align at the top. Comment reply guides align with the parent avatar when present. Repeated singleton avatar/trigger regions use the last supplied element; repeatable regions keep their supported children.

## Themes

Studio and its stylesheet/export are removed without compatibility aliases. Remove Studio imports and switch stored theme preferences to Flat, Clean, or Edge. Edge remains an optional stylesheet; Flat remains the default.

## New media components

- [Media Player](media-player.md): a YouTube embed frame with an optional label and subtitle. Timeline composition and synchronization belong to the application.
- [Playing Card](playing-card.md): front/back image artwork, optional label, selection and click behavior, configurable proportions, and `flip-mode="none|button|switch"`. None is the default. With a flip mode enabled, F flips the hovered card, independently of selection.
- [Timeline](timeline.md): seeking, stable-width timestamps, layered ranges, chapters, and marker previews.
- [Timeline Range](timeline-range.md): bars, areas, and chapters. Timeline and Range alone support the vibrant red tone.
- [Timeline Marker](timeline-marker.md): timestamp markers with arbitrary preview content and proximity expansion.

Ranges and markers are ordinary timeline children, not named regions. See [timeline examples](timelines.md).

## Showcase and fixes

The showcase reorganizes categories, puts component-title search and brand color controls in the header, and distinguishes named regions from ordinary children in its Regions & children table. Preview controls reflect their initial markup and allow repeated additions. Color-picker popups use the shared overlay behavior and close with their enclosing overlays.
