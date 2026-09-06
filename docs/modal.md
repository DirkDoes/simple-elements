# Modal

```html
<se-modal id="confirm" title="Delete project?" icon="alert" centered confirm-label="Delete" confirm-variant="danger">
  <se-text muted>This cannot be undone.</se-text>
</se-modal>
<script>document.querySelector('#confirm').open()</script>
```

Methods: `open()` and `close()`. Attributes: `title`, `subtitle`, `icon`, `large`, `centered`, `confirm-label`, `confirm-variant`, and `cancel-label`. Large modals use a separate header, inset content card, and footer. Events: `confirm` and `close`. Escape and backdrop clicks close it.
