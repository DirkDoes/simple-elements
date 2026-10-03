# Navigation tabs

Route links, not an ARIA tab widget. Set `options` as JSON or an array property of `{ id, label, href, icon, count, disabled }`. `value` selects the active route with aria-current="page". `variant` is underline (default) or pill. `label` names the navigation landmark. Links use native browser navigation and keyboard behavior; disabled items are not links. The row scrolls horizontally on narrow screens.

```html
<se-nav-tabs value="overview" options='[{"id":"overview","label":"Overview","href":"/overview"},{"id":"issues","label":"Issues","href":"/issues","count":12}]'></se-nav-tabs>
```

## Trailing actions

Place a child wrapper with `data-actions` inside `se-nav-tabs` to align buttons at the right end of the tab line. Actions retain their DOM nodes and listeners when the active tab changes. On narrow screens only the tab links scroll horizontally; trailing controls stay outside the scroller so their menus, date pickers, and tooltips can open without adding scrollbars.

```html
<se-nav-tabs value="files" options='[{"id":"files","label":"Files","href":"#files"}]'>
  <span data-actions><se-button text="Upload" icon="plus" variant="secondary"></se-button></span>
</se-nav-tabs>
```

For a split-button action:

```html
<se-nav-tabs value="issues" options='[{"id":"issues","label":"Issues"}]'>
  <span data-actions>
    <se-split-button direct variant="secondary" text="New issue" icon="plus"
      options='[{"id":"issue","label":"Create issue"},{"id":"draft","label":"Save draft"}]'>
    </se-split-button>
  </span>
</se-nav-tabs>
```
