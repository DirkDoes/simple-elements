# Tree item

```html
<div>
  <se-tree-item type="folder" label="Source" open>
    <se-tree-item type="file" label="index.js" meta="4 KB" href="#index"></se-tree-item>
  </se-tree-item>
</div>
```

Place top-level items in any suitable application container. Set `type` to `folder` or `file`, then use `label`, `icon`, and optional `meta`. Folder content may contain nested items and uses native disclosure behavior; `open` expands it initially. File items use a native link when `href` is present and a button otherwise. `selected` marks the current item and `disabled` prevents interaction.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

Folder content animates open and closed with a brief native disclosure transition. Reduced motion disables the animation; browsers without support for animating native details fall back to immediate disclosure.
