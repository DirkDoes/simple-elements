# Navigation section

```html
<se-nav-section title="Resources" collapsible>
  <se-nav-item label="Documents" icon="file"></se-nav-item>
</se-nav-section>
```

Named grouping of arbitrary child content. Attributes: `title`, `collapsible`, `collapsed`. With `collapsible`, a native heading button controls this section's content. The collapsed property/attribute means hidden content, with synchronized expanded state and inert descendants. Nested sections retain their own state. Existing child nodes and listeners are preserved.

The section itself has no minimized behavior; its child components can inherit a minimized context. Applications decide whether headings should remain visible in a compact rail. Use native labelled `nav` around navigation destinations.
