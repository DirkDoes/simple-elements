# Comment

```html
<se-comment author="Sarah Jenkins" timestamp="Just now">
  <se-avatar data-se-region="avatar" name="Sarah Jenkins" tone="gray"></se-avatar>
  <p>A comment starts a conversation.</p>
  <se-reactions data-se-region="reactions"></se-reactions>
  <se-comment author="Alex"><p>A nested reply.</p></se-comment>
</se-comment>
```

Attributes: `author` (default Anonymous) and `timestamp`. Body content is trusted child HTML. Direct nested `se-comment` elements become replies; the `replies` getter exposes their container. Reply emits a `reply` event with the author; the application owns the reply editor.

Regions: `avatar` for an optional top-aligned identity element, and `reactions` for controls beside Reply. Avatar content may be [Avatar](avatar.md) or custom HTML. Supplied nodes and listeners are preserved. Omitting the avatar removes its column.

Migration: move `initials`, `image`, and `tone` to a child `se-avatar data-se-region="avatar"`. The comment no longer generates a profile component or a picture automatically.

When multiple direct children use the `avatar` region, only the last one is displayed. Earlier avatar regions are not rendered as body content.

The showcase **Regions & children** table distinguishes named avatar/reactions regions (`data-se-region`) from nested comments (ordinary child elements). Both can be appended repeatedly with Add.
