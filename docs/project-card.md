# Project card

```html
<se-project-card
  title="Northstar"
  subtitle="Customer portal redesign"
  metadata="Updated today"
  banner-color="#2563eb"
  href="#northstar">
</se-project-card>
```

Set `title`, `subtitle`, and `metadata` for the project details. The banner uses `icon` and an optional CSS `banner-color`; `banner-image` replaces both with an image URL. Add `href` for a native link, or omit it for a native button. `disabled` disables button behavior.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

Hover treatment matches file and folder cards in each theme: title color, border, background, and shadow are consistent, with no vertical lift. Disabled cards do not receive the hover effect.

Direct children marked `data-se-region="banner-start"` or `banner-end` sit in the banner corners. `data-se-region="details-end"` sits to the right of the title and subtitle. Interactive children remain outside the card link or button.
