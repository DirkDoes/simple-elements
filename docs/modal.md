# Modal

```html
<se-modal id="confirm" title="Delete project?" icon="alert" variant="error" size="small" centered confirm-label="Delete" confirm-variant="danger">
  <se-text muted>This cannot be undone.</se-text>
</se-modal>
<script>document.querySelector('#confirm').open()</script>
```

Methods: `open()` and `close()`. Attributes: `title`, `subtitle`, `icon`, `variant`, `size` (`small`, `medium`, or `large`), `centered`, `confirm-label`, `confirm-variant`, and `cancel-label`. Medium and large modals place the optional icon beside the title. Events: `confirm` and `close`. Escape and backdrop clicks close it.
