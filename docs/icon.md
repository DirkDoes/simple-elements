# Icon

```html
<se-icon name="settings"></se-icon>
```

`name` accepts the names displayed on the live Icon page, including component-specific aliases such as `badge`, `blockquote`, `calendar-clock`, `card`, `checkbox`, `list-header`, `list-row`, `message-help`, `panel-right`, `radio`, `range`, `text-input`, and `wysiwyg`. Size and color follow CSS `font-size` and `color`.

`<se-icon>` reads its icon data directly from the framework-free [Lucide](https://lucide.dev/) package (ISC). The browser bundle embeds only the names listed above, so it remains self-contained. For a custom icon, use a normal SVG file:

```html
<img src="./my-icon.svg" alt="My icon">
```
