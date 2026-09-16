# Empty state

For larger, original SVG artwork that follows the app's brand and theme, use [Empty illustration](empty-illustration.md).

```html
<se-empty-state tone="brand" icon="package" title="No projects yet" text="Create a project to get started.">
  <se-button variant="brand" text="Create project"></se-button>
</se-empty-state>
```

Attributes: `tone` (`gray`, `brand`, `success`, `warning`, `error`, `info`, or `important`), `icon`, `title`, and `text`. Child content is reserved for actions or other use-case-specific controls.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).
