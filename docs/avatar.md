# Avatar

`se-avatar` owns the shared identity picture for profiles, comments, and chat messages. It also works independently.

```html
<se-avatar name="Sarah Jenkins" image="/people/sarah.jpg"></se-avatar>
```

Image takes priority, with `object-fit: cover`. If it fails to load, the avatar uses explicit `initials` (also suitable for a short alias), then initials generated from `name`, then `icon` (default: user). Use `aria-label` to override the accessible name.

Attributes: `name`, `image`, `initials`, `icon`, `tone`, `size`, `shape`, `clickable`, `aria-label`.

- `tone`: brand (default), gray, success, warning, error, info, important.
- `size`: medium (40px default), small (32px), large (48px). Parent regions may supply a smaller default through `--se-avatar-size`.
- `shape`: circle (default), square. Square has rounded corners in Flat/Clean and sharp corners in Edge.
- With renders a link. With `clickable`, renders a button. Otherwise it is a non-interactive image representation. The application handles click events and any profile popup; the avatar never opens one automatically.

Image, identity, and interaction attributes update when changed. Style attributes respond through CSS. An empty image uses the fallback directly.

## Composition

```html
<se-chat-message title="Sarah">
  <se-avatar data-se-region="avatar" name="Sarah Jenkins" size="small"></se-avatar>
  Here is the answer.
</se-chat-message>
```

Profile, Comment, and Chat Message accept one direct child with `data-se-region="avatar"`. Omit it to omit the picture. The region may contain any custom element or HTML, not just `se-avatar`. Parent components move the supplied node without cloning it or replacing its event listeners.

Inside an interactive Profile, the avatar is decorative and the enclosing profile button owns the click target. Do not put other interactive elements inside that profile’s avatar region.

When multiple direct children use the `avatar` region, only the last one is displayed. Earlier avatar regions are not rendered as body content.
