# Drawer

```html
<se-drawer id="notifications" title="Notifications" mode="overlay">Drawer content</se-drawer>
<script>document.querySelector('#notifications').open()</script>
```

Methods: `open()` and `close()`. Add `open` to show the drawer initially. `mode` accepts blurred `overlay` (default), `overlay-clear`, or `push`. Set `width` to any valid CSS width; it defaults to `24rem`. Push mode reserves the configured drawer width so the page stays visible beside it. `overlay-clear` leaves the uncovered page interactive and does not close on outside clicks. The drawer emits `close`; Escape closes it, and the blurred overlay also closes on backdrop clicks.
