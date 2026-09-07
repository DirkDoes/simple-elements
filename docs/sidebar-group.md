# Sidebar group

```html
<se-sidebar-group variant="page" label="Dossiers" icon="folder" href="/dossiers" subtext="Recent">
  <se-sidebar-button label="Project Atlas" href="/dossiers/atlas"></se-sidebar-button>
</se-sidebar-group>
```

Attributes: `variant` (`group` or `page`), `label`, `icon`, `href`, `subtext`, and `collapsed`. `group` is a disclosure only. With `page`, the label navigates through `href` while a separate chevron toggles the nested buttons. Supporting `subtext` is shown only while the nested items are open.
