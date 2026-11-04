# Chat message

```html
<se-chat-message mode="received" title="Sarah" timestamp="10:42">
  <se-avatar data-se-region="avatar" name="Sarah Jenkins"></se-avatar>
  <p>Here is a helpful response.</p>
</se-chat-message>
```

`mode` is received (default) or sent. `title` labels the message, `timestamp` adds a time, and `timestamp-position="start"` moves the time before the title. Supply trusted body HTML as children or through `content` (which takes precedence for the body).

The optional `avatar` region sits at the top beside the message, on the appropriate side for its mode. It accepts [Avatar](avatar.md) or custom HTML and preserves the supplied node and handlers. Without a region no picture or empty gutter is generated.

Migration: remove the `profile` toggle. Move `initials`, `icon`, and image/appearance configuration onto a child `se-avatar data-se-region="avatar"`. Appearance and click behavior belong to the avatar.

When multiple direct children use the `avatar` region, only the last one is displayed. Earlier avatar regions are not rendered as body content.
