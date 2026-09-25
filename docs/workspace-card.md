# Workspace card

A top-level tenant entry with a monogram and a horizontal identity panel. Projects use their own banner cards beneath a workspace.

```html
<se-workspace-card title="Acme Studio" initials="AS"
  subtitle="A shared home for your teams and projects."
  metadata="3 projects · 12 members · Owner" href="/workspaces/acme">
</se-workspace-card>
```

Set `title`, `subtitle`, and `metadata` for the workspace details. `initials` defaults to the first two title characters. Add `href` for a native link, or omit it for a native button. `disabled` renders a disabled button even when `href` is present. Like project cards, attributes are read on first connection.


Set `image="/images/workspace.jpg"` for an image avatar. The image takes priority over initials and fills a circular crop using `object-fit: cover`, with a subtle theme border. Without an image, the existing monogram is unchanged.

Hover treatment matches file and folder cards in each theme: title color, border, background, and shadow are consistent, with no vertical lift. Disabled cards do not receive the hover effect.
