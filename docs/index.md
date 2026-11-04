# Simple Elements

Install directly from GitHub:

```sh
npm install github:DirkDoes/simple-elements
```

Then import `simple-elements` and its precompiled `simple-elements/styles.css`, and use the elements in ordinary HTML. The CSS is built with Tailwind, but consuming applications need no Tailwind configuration. Set `data-theme="light"` or `data-theme="dark"` on `<html>`.

Flat is the default visual theme. Use `data-se-theme="clean"` for Clean, or follow the theme guide for a Clean-only stylesheet and user preferences.

Edge is an optional visual theme with light and dark modes. Import its stylesheet if your app uses it; see the guide below for single-theme and all-three setups.

v0.17.0 moves application layout into native HTML and CSS, with reusable navigation, panel toggles, and resize handles. This is a breaking change: read the [v0.17.0 migration guide](layout-migration.md) and the seven [Page Layout examples](page-layout.md) before upgrading.

## Theming

- [Visual themes, color modes, and brand colors](theme.md)

Icon inputs accept Lucide names, asset URLs, or a shared light/dark foreground configuration with color-preservation flags. See [Icons](icon.md) for HTML, JavaScript, and option-array examples; [Brand](brand.md) uses the same icon object for full and compact artwork.

Upgrading from v0.14.6? Read the [v0.15.0 migration guide](migration-0.15.0.md) for renamed attributes and the new child regions.

## Actions & controls

- [Button](button.md)
- [Split Button](split-button.md)
- [Segmented Control](segmented-control.md)
- [Theme Switch](theme-switch.md)

## Navigation

- [Breadcrumbs](breadcrumbs.md)
- [Nav Item](nav-item.md)
- [Nav Tab](nav-tab.md)
- [Nav Section](nav-section.md)
- [Nav Group](nav-group.md)
- [Pagination](pagination.md)

## Identity

- [Avatar](avatar.md)
- [Profile](profile.md)
- [Brand](brand.md)

## Inputs & editors

- [Input](input.md)
- [Checkbox](checkbox.md)
- [Radio](radio.md)
- [Select](select.md)
- [Range](range.md)
- [Phone Input](phone-input.md)
- [Color Picker](color-picker.md)
- [Date Picker](date-picker.md)
- [Time Picker](time-picker.md)
- [Datetime Picker](datetime-picker.md)
- [File Upload](file-upload.md)
- [Code Editor](code-editor.md)
- [WYSIWYG](wysiwyg.md)

## Content & typography

- [Title](title.md)
- [Text](text.md)
- [Icon](icon.md)
- [Markdown](markdown.md)
- [Blockquote](blockquote.md)
- [Code](code.md)
- [Diff](diff.md)
- [Diff Value](diff-value.md)

## Containers & collections

- [Card](card.md)
- [Collapsible](collapsible.md)
- [Collection](collection.md)
- [List Header](list-header.md)
- [List Row](list-row.md)
- [Tree Item](tree-item.md)
- [File Card](file-card.md)
- [Folder Card](folder-card.md)
- [Project Card](project-card.md)
- [Workspace Card](workspace-card.md)

## Panels & overlays

- [Panel Toggle](panel-toggle.md)
- [Resize Handle](resize-handle.md)
- [Drawer](drawer.md)
- [Modal](modal.md)
- [Popover](popover.md)
- [Menu](menu.md)
- [Tooltip](tooltip.md)

## Status & feedback

- [Badge](badge.md)
- [Spinner](spinner.md)
- [Progress Ring](progress-ring.md)
- [Toast](toast.md)
- [Empty State](empty-state.md)
- [Empty Illustration](empty-illustration.md)

## Conversation

- [Comment](comment.md)
- [Reactions](reactions.md)
- [Chat Message](chat-message.md)
- [Chat Context](chat-context.md)
- [Thought Train](thought-train.md)

## Patterns

- [Complex input and completions](complex-input.md)
- [Page layout](page-layout.md)
- [v0.17.0 layout migration](layout-migration.md)
- [Comments](comments.md)
- [Chats](chats.md)
- [File system](file-system.md)
- [Forms](forms.md)
- [Diff designs](diffs.md)

Browse the page-like component sections in [`examples/index.html`](../examples/index.html).

The showcase’s **Patterns → Icon gallery** lists the 147 default icon names with tooltips and click-to-copy. The [icon guide](icon.md#default-and-full-lucide-sets) explains optional full-pack loading and individual registration. [Avatars](avatar.md) provide shared identity pictures for profiles, comments, and messages.
