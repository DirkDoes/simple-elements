# Profile

```html
<se-profile name="Sarah Jenkins" subtitle="Lead Designer" initials="SJ" tone="brand" clickable></se-profile>
```

Use `tone` for the avatar color (`gray`, `brand`, `success`, `warning`, `error`, `info`, or `important`). Add `compact` to show only the avatar; the same presentation is applied automatically inside a collapsed sidebar. Add `clickable` for a normal button, or provide an `options` JSON array or property for a context menu; `options` takes priority when both are present. The component emits `select` with the chosen option.

The profile stays within its container. Inside a collapsed `se-sidebar`, it reduces to its avatar; at narrower expanded widths, names and subtitles truncate with an ellipsis. Context menus prefer opening down and right, then flip toward available viewport space.

Attributes: `tone`, `name`, `title`, `subtitle`, `initials`, `image`, `clickable`, `options`, and `compact`.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).


Set `image` to an image URL to display a circular, center-cropped avatar in every theme. When both `image` and `initials` are provided, the image takes priority. Omitting `image` keeps the initials avatar. Images use empty alt text because the adjacent profile name identifies the person.

```html
<se-profile name="Sarah Jenkins" initials="SJ" image="/images/sarah.jpg"></se-profile>
```

Image avatars use `object-fit: cover`: the shorter image side fills the circle and excess on the longer side is cropped centrally, without stretching. Their border uses the theme’s subtle border color in both light and dark modes. Initials-only avatars keep their existing theme styling.

`name` and `title` both set the primary profile label. If both are present, `name` takes priority.
