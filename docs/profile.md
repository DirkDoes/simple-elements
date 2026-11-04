# Profile

```html
<se-profile name="Sarah Jenkins" subtitle="Lead Designer">
  <se-avatar data-se-region="avatar" name="Sarah Jenkins" image="/people/sarah.jpg"></se-avatar>
</se-profile>
```

Profile owns the name, subtitle, compact presentation, and optional account menu. The optional `avatar` region owns the identity picture; use [Avatar](avatar.md) or custom HTML.

Attributes: `name`, `title` (name alias), `subtitle`, `clickable`, `options`, `compact`, and `minimized`. Name takes priority over title.

`clickable` makes the entire profile, including its avatar, one button. An `options` JSON array enables a menu and takes priority over clickable; selecting an option emits `select`. The avatar region is inside that button. Use non-interactive custom region content; `se-avatar` automatically defers clicks to its enclosing profile button.

`compact` or a minimized context hides the text. The avatar remains inside the full profile click target; the chevron is hidden. Without an avatar region there is no generated picture.

Migration: move `image`, `initials`, and `tone` onto an explicit `se-avatar data-se-region="avatar"` child. There are no legacy attribute aliases.

When multiple direct children use the `avatar` region, only the last one is displayed. Earlier avatar regions are not rendered as body content.
