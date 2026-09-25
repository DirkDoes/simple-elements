# Simple Elements

Install directly from GitHub:

```sh
npm install github:DirkDoes/simple-elements
```

Then import `simple-elements` and its precompiled `simple-elements/styles.css`, and use the elements in ordinary HTML. The CSS is built with Tailwind, but consuming applications need no Tailwind configuration. Set `data-theme="light"` or `data-theme="dark"` on `<html>`.

Flat is the default visual theme. Use `data-se-theme="clean"` for Clean, or follow the theme guide for a Clean-only stylesheet and user preferences.

Studio and Edge are optional visual themes, each with light and dark modes. Import only the optional theme stylesheets your app uses; see the guide below for single-theme and all-four setups.

## Theming

- [Visual themes, color modes, and brand colors](theme.md)

Icon inputs accept Lucide names, asset URLs, or a shared light/dark foreground configuration with color-preservation flags. See [Icons](icon.md) for HTML, JavaScript, and option-array examples; [Layout brand](layout-brand.md) uses the same icon object for full and compact artwork.

Upgrading from v0.14.6? Read the [v0.15.0 migration guide](migration-0.15.0.md) for renamed attributes and the new child regions.

## Foundations

- [Icon](icon.md)
- [Text](text.md)
- [Theme switch](theme-switch.md)
- [Title](title.md)
- [Card](card.md)
- [Project card](project-card.md)
- [Workspace card](workspace-card.md)
- [Folder card](folder-card.md)
- [Code](code.md)
- [Blockquote](blockquote.md)
- [Markdown](markdown.md)

## Forms

- [Input](input.md)
- [Checkbox](checkbox.md)
- [Radio](radio.md)
- [Range](range.md)
- [Segmented control](segmented-control.md)
- [Select](select.md)
- [Phone input](phone-input.md)
- [File upload](file-upload.md)
- [Code editor](code-editor.md)
- [WYSIWYG](wysiwyg.md)
- [Color picker](color-picker.md)
- [Date picker](date-picker.md)
- [Date and time picker](datetime-picker.md)
- [Time picker](time-picker.md)

## Actions and feedback

- [Spinner](spinner.md)
- [Progress ring](progress-ring.md)

- [Button](button.md)
- [Split button](split-button.md)
- [File card](file-card.md)
- [Tooltip](tooltip.md)
- [Menu](menu.md)
- [Popover](popover.md)
- [Profile](profile.md)
- [Modal](modal.md)
- [Drawer](drawer.md)
- [Toast](toast.md)
- [Chat message](chat-message.md)
- [Chat context](chat-context.md)
- [Thought train](thought-train.md)
- [Badge](badge.md)
- [Empty state](empty-state.md)
- [Empty illustration](empty-illustration.md)

## Navigation

- [Pagination](pagination.md)

- [Sidebar](sidebar.md)
- [Sidebar toggle](sidebar-toggle.md)
- [Layout brand](layout-brand.md)
- [Sidebar chapter](sidebar-chapter.md)
- [Sidebar button](sidebar-button.md)
- [Sidebar group](sidebar-group.md)
- [Top bar](topbar.md)

## Patterns

- [Page layout](page-layout.md)
- [Workspaces](workspaces.md)
- [Chats](chats.md)
- [File system](file-system.md)
- [Forms](forms.md)

## Data display

- [Collection](collection.md)
- [Collapsible](collapsible.md)
- [List header](list-header.md)
- [List row](list-row.md)
- [Tree item](tree-item.md)

Browse the page-like component sections in [`examples/index.html`](../examples/index.html).

The showcase’s **Patterns → Icon gallery** lists the 147 default icon names with tooltips and click-to-copy. The [icon guide](icon.md#default-and-full-lucide-sets) explains optional full-pack loading and individual registration. [Profiles](profile.md) support circular image avatars as well as initials.

- [Breadcrumbs](breadcrumbs.md)
- [Navigation tabs](nav-tabs.md)
- [Multi-scope navigation pattern](multi-scope-navigation.md)

- [Comment](comment.md)
- [Reactions](reactions.md)
- [Comments pattern](comments.md)
