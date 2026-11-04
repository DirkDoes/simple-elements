# Application-owned layouts

The library supplies visual components and focused interactions. Applications own page structure, CSS grid/flex, widths, scrolling, positioning, breakpoints, routing, and mobile presentation. There is no sidebar or topbar shell component.

Use native `header`, labelled `nav`, `aside`, `main`, `section`, and `div` containers. Put `se-nav-item`, `se-nav-group`, `se-nav-section`, `se-brand`, and `se-nav-tab` wherever needed, including nested panels or modal content. Navigation links stay native links; do not use ARIA menu roles for ordinary site navigation.

## State vocabulary

- Expanded: full content and labels.
- Minimized: `data-se-minimized="true"` on any parent gives participating components an icon-focused presentation. It does not hide the panel, resize it, or collapse groups. Application CSS chooses the compact width.
- Collapsed: the controlled content is hidden. `se-panel-toggle mode="collapse"` toggles native `hidden`; group/section disclosures hide their own content and remove it from keyboard navigation.

The nearest explicit `data-se-minimized` context wins. Use `data-se-minimized="false"` to reset nested content. `minimized` on a participating component forces its own compact presentation. Labels remain visible on navigation items without icons. A minimized navigation group still has a working disclosure; the application can instead use a flat list of destinations for a narrow rail.

## Composition contract

| Input | Purpose |
| --- | --- |
| Attributes | Local configuration: `active`, `icon`, `minimized`, `mode`, `for`, `axis` |
| Context | Parent presentation: `data-se-minimized="true"` or `"false"`, theme and brand tokens |
| Regions | Named child content: `data-se-region="end"` on a nav item's badge, existing modal/card regions |
| Content | Ordinary child nodes, preserved when navigation sections and groups initialize |

```html
<style>
  .workspace { display: flex; min-height: 0; }
  .navigation { position: relative; width: var(--se-resize-size, 240px); flex: none; }
  .navigation[data-se-minimized="true"] { width: 72px; }
  .content { flex: 1; min-width: 0; overflow: auto; }
</style>
<div class="workspace">
  <nav id="project-nav" class="navigation" aria-label="Project">
    <se-panel-toggle for="project-nav" mode="minimize" variant="edge" placement="edge-end" label="Minimize navigation"></se-panel-toggle>
    <se-nav-item label="Overview" icon="dashboard" active></se-nav-item>
    <se-nav-item label="Files" icon="folder"></se-nav-item>
  </nav>
  <se-resize-handle for="project-nav" min="180" max="400" label="Navigation width"></se-resize-handle>
  <main class="content">Your content</main>
</div>
```

Page Layout includes seven application recipes: full-width tabs, centered tabs, nested navigation, split panes, contextual navigation, an organization rail, and top navigation. The standalone Workspaces pattern has been removed; scope examples now live on this page. Every snippet includes its application CSS and behavior.

On phones the application uses an animated top-opening navigation overlay and blurred backdrop, closes it on Escape or navigation, and restores focus to the trigger. Global and local navigation are combined in that overlay. Split panes become stacked content with resize handles hidden. Desktop minimized widths transition in application CSS, with reduced-motion support and transitions suppressed during dragging.

See [layout migration](layout-migration.md), [panel toggle](panel-toggle.md), and [resize handle](resize-handle.md).

Design references: [Radix layout responsibilities](https://www.radix-ui.com/themes/docs/overview/layout), [WAI disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [WAI window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/). The splitter pattern is work in progress; this implementation uses its separator semantics and directional keyboard interaction.
