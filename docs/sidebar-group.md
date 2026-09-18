# Sidebar group

```html
<se-sidebar-group variant="page" label="Dossiers" icon="folder" href="/dossiers" subtext="Recent" active>
  <se-sidebar-button label="Project Atlas" href="/dossiers/atlas"></se-sidebar-button>
</se-sidebar-group>
```

Attributes: `variant` (`group` or `page`), `label`, `icon`, `href`, `subtext`, `active`, and `collapsed`. `group` is a disclosure only. With `page`, the label navigates through `href` while a separate chevron toggles the nested buttons. Omit `href` to render a native button for application-managed navigation, without changing the URL. Supporting `subtext` is shown only while the nested items are open.

Set the boolean `active` attribute on a page group to match the selected appearance of `se-sidebar-button` in every theme. It also sets `aria-current="page"` on the heading. Update it with `group.toggleAttribute('active', selected)`; selection is controlled by the app, independently of `collapsed`. Selecting a nested item does not set its parent’s `active` attribute. The disclosure-only `group` variant ignores `active`.

When either variant is `collapsed` and contains an active sidebar button or active page group, its heading automatically uses the selected appearance. Expanding it removes this indirect highlight so the selected child is visible. This also works through nested groups and updates when the active child changes. It is a visual indication only: the parent does not gain `active` or `aria-current`. A page group whose own page is active stays highlighted when expanded.

The Application sidebar example in the Page Layout pattern switches selection locally between Dossiers, its projects, and Settings. Its chevron only toggles the nested items.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

When the containing sidebar is collapsed, the icon shows its label in a tooltip on hover or keyboard focus. Escape dismisses it. Expanded sidebars keep the normal visible label.
