# Sidebar group

```html
<se-sidebar-group label="Dossiers" icon="folder" href="/dossiers" subtext="Recent" variant="recent">
  <se-sidebar-button label="Project Atlas" href="/dossiers/atlas"></se-sidebar-button>
</se-sidebar-group>
```

Attributes: `label`, `icon`, `href`, `subtext`, `variant` (`default` or `recent`), and `collapsed`. When `href` is present, the label navigates while the separate chevron toggles the nested buttons.
