# Navigation tab

`se-nav-tab` is one navigation link or button. The application owns the bar, spacing, scrolling, routing, and adjacent actions.

```html
<div class="project-navigation">
  <nav aria-label="Project" class="project-links">
    <se-nav-tab label="Overview" href="/overview" active></se-nav-tab>
    <se-nav-tab label="Issues" href="/issues" icon="circle-check" badge="New"></se-nav-tab>
  </nav>
  <se-button text="New issue" icon="plus"></se-button>
</div>
<style>
  .project-navigation { display: flex; align-items: flex-end; gap: 20px; border-bottom: 1px solid var(--se-border); }
  .project-links { display: flex; gap: 20px; flex: 1; min-width: 0; overflow-x: auto; }
  .project-navigation > se-button { flex: none; margin-block: 5px; }
</style>
```

Attributes: `label`, `href`, `icon`, `badge`, `badge-tone`, `active`, `disabled`, and `variant="underline|pill|plain"` (default: underline). Without `href`, it renders a native button. Disabled controls are native disabled buttons, including when a destination is supplied. Optional non-interactive content uses `data-se-region="end"`; do not nest buttons or links inside the control.

Set `active` from your router. Changing it updates `aria-current="page"` without replacing the focused link. Like `se-nav-item`, content attributes are read on connection; render a new instance when changing the label, icon, or destination. Variants can change through CSS attributes at any time.

These are page-navigation controls with normal link/button keyboard behavior, not an ARIA tablist. For switching tab panels, the application must supply the appropriate tab/panel relationships and keyboard behavior.

## Migrating from se-nav-tabs

- Replace the bar with a labelled native `nav`, one `se-nav-tab` per option.
- Move each option's `label`, `href`, `icon`, and `disabled` onto that instance. Rename its old `count` field to `badge`; the badge accepts arbitrary text.
- Replace the bar's `value` with `active` on the matching instance; the application updates it on navigation.
- Put `variant` on each instance.
- Move `data-actions` content alongside the `nav` in application HTML. No component-specific actions slot remains.
- Define the bar's display, gap, divider, and scrolling in application CSS. Keep popup actions outside the scrolling container.
- Replace imports of `components/nav-tabs.js` with `components/nav-tab.js`.

This replaces the old API and is a breaking change from v0.17.0. See Page Layout for complete application compositions.

## Badge tones

Omit `badge-tone` for a neutral badge whose background disappears on an active pill. Explicit tones (`gray`, `brand`, `success`, `warning`, `error`, `info`, `important`) retain their styling regardless of selection. `brand` uses a prominent brand fill for indicators such as New.

```html
<se-nav-tab label="Discover" href="/discover" variant="pill" badge="New" badge-tone="brand"></se-nav-tab>
```

The application can call `tab.removeAttribute('badge-tone')` after the user visits. `active`, `badge`, and `badge-tone` update in place without replacing the focused control. Removing `badge` removes the badge entirely; setting it accepts arbitrary text.
