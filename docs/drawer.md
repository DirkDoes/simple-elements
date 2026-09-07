# Drawer

```html
<se-drawer id="notifications" title="Notifications" mode="overlay">Drawer content</se-drawer>
<script>document.querySelector('#notifications').open()</script>
```

Methods: `open()` and `close()`. `mode` accepts blurred `overlay` (default), `overlay-clear`, or `push`. The drawer emits `close`; Escape and backdrop clicks close it.
