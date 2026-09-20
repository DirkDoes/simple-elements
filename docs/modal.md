# Modal

```html
<se-modal id="confirm" title="Delete project?" subtitle="This cannot be undone." icon="alert" tone="error" size="small" confirm-label="Delete" confirm-variant="danger">
  <se-text muted>This cannot be undone.</se-text>
</se-modal>
<script>document.querySelector('#confirm').open()</script>
```

Methods: `open()` and `close()`. Attributes: `title`, `subtitle`, `icon`, `tone`, `size` (`small`, `medium`, or `large`), `confirm-label`, `confirm-variant`, and `cancel-label`. Small modals always use the centered empty-state composition. Medium and large modals place the optional icon beside the title. Events: `confirm` and `close`. Escape and backdrop clicks close it.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

Select lists (single and multiple) and action menus appear above modal footers and scrolling containers using the browser top layer. They flip upward when needed and stay within the viewport; long lists retain their own scrolling. Escape dismisses an open list before the modal.

The visible modal title and accessible dialog name are retained without inheriting a native browser hover tooltip inside the overlay.
