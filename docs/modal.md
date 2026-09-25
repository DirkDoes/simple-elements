# Modal

```html
<se-modal id="confirm" title="Delete project?" subtitle="This cannot be undone."
  icon="alert" tone="error" size="small">
  <se-text muted>This cannot be undone.</se-text>
  <se-button data-se-region="footer" data-modal-action="cancel"
    variant="secondary" text="Cancel"></se-button>
  <se-button data-se-region="footer" data-modal-action="confirm"
    variant="danger" text="Delete"></se-button>
</se-modal>
<script>document.querySelector('#confirm').open()</script>
```

Methods: `open()` and `close()`. Attributes: `title`, `subtitle`, `icon`, `tone`, `size` (`small`, `medium`, or `large`), and optional `dismissible`. Ordinary children form the body. `data-se-region="footer"` places any number of controls in the footer; without one there is no footer. `data-se-region="header-end"` places content to the right of the medium/large heading or at the top-left of a small dialog. The medium/large heading stays compact with a subtitle.

Footer controls with `data-modal-action="cancel"` close the dialog. A footer control with `data-modal-action="confirm"` dispatches a bubbling, cancelable `confirm` event and closes only if it was not prevented. `close()` emits `close`. Escape and the close button dismiss it; backdrop clicks require `dismissible`, which is off by default.

For an asynchronous action, prevent the automatic close synchronously and call `close()` after success:

```js
const modal = document.querySelector('#confirm');
modal.addEventListener('confirm', async (event) => {
  event.preventDefault();
  await saveChanges();
  modal.close();
});
```

Icon inputs accept Lucide names, asset URLs, and the shared [icon configuration object](icon.md). Select and menu popups appear above the modal footer and scroll area. The visible title does not create a native browser hover tooltip.
