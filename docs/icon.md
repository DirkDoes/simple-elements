# Icon

```html
<se-icon name="settings"></se-icon>
```

`name` accepts: `activity`, `alert`, `bell`, `check`, `chevron`, `copy`, `crown`, `dashboard`, `database`, `edit`, `eye`, `eye-off`, `file`, `file-up`, `list`, `lock`, `mail`, `menu`, `message-square`, `moon`, `more`, `mouse-pointer`, `package`, `panel-left-close`, `panel-left-open`, `search`, `send`, `settings`, `shield-alert`, `sun`, `toggle-left`, `trash`, `type`, `upload`, `user`, `users`, `x`, or `zap`. Size and color follow CSS `font-size` and `color`.

`<se-icon>` reads its icon data directly from the framework-free [Lucide](https://lucide.dev/) package (ISC). The browser bundle embeds only the names listed above, so it remains self-contained. For a custom icon, use a normal SVG file:

```html
<img src="./my-icon.svg" alt="My icon">
```
