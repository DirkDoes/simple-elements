# Sidebar button

```html
<se-sidebar-button label="Dashboard" icon="dashboard" href="/dashboard" active></se-sidebar-button>
```

Attributes: `label`, `icon`, `href`, `active`, and `disabled`. With `href` it renders a link; without it, it renders a button.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

When the containing sidebar is collapsed, the icon shows its label in a tooltip on hover or keyboard focus. Escape dismisses it. Expanded sidebars keep the normal visible label.
