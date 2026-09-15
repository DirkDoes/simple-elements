# Multi-scope navigation

Patterns → Multi Scope Navigation demonstrates contextual sidebars, a persistent organization rail, and top navigation. The resolution selector controls isolated desktop, tablet, and phone iframes, matching the Page Layout pattern. Each frame contains mock JavaScript with independent in-memory routing, workspace selection, parent navigation, and route tabs. Nothing is sent to a server.

Applications own routing, authorization, persistence, and context data. Mobile navigation uses the existing top-opening responsive sidebar and its toggle. Switching workspaces means following the organization breadcrumb and choosing another project card on the listing page; application code handles routing. Component APIs are documented in [Button](button.md), [Breadcrumbs](breadcrumbs.md), and [Navigation tabs](nav-tabs.md).

Serve the repository over HTTP and open `test/navigation.html` to run the browser checks. Open `examples/index.html#multi-scope-navigation` for the interactive showcase. No authentication or real tenant data is simulated; all actions are local demonstration state.


The Organization rail example now composes real `se-sidebar` elements with `primary` and `secondary` visual variants. Organization pages show an expanded primary sidebar; repository pages collapse it and add secondary navigation. The application owns that decision, not the visual variant. On mobile, one `se-sidebar-toggle` opens a responsive sidebar containing organization and repository chapters. Desktop sidebars use `layout-mode="desktop-only"`. No `se-layout` component is required.

Desktop scope changes animate the primary sidebar width and the secondary navigation space over 220ms. The pattern uses the native Web Animations API because it replaces its mock page DOM on navigation. Reduced-motion preferences skip these transitions; mobile navigation remains immediate.

These layouts are optional compositions: an application can use one sidebar plus navigation tabs instead of two sidebars. The example uses the existing responsive sidebar behavior; applications can choose other mobile presentations.

Preview pages intentionally contain only navigation, project cards, and a page label. Dashboard statistics, sample lists, profiles, settings forms, and fake save actions are omitted.

Breadcrumbs in this pattern represent scopes only (`Acme / Website`), never the selected navigation page. They are hidden at the organization level, where only one scope exists. These are application conventions, not restrictions of `se-breadcrumbs`.
