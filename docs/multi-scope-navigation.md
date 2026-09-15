# Multi-scope navigation

Patterns → Multi Scope Navigation demonstrates contextual sidebars, a persistent organization rail, and top navigation. The resolution selector controls isolated desktop, tablet, and phone iframes, matching the Page Layout pattern. Each frame contains mock JavaScript with independent in-memory routing, workspace card selection, parent navigation, route tabs, and a local save confirmation. Nothing is sent to a server.

Applications own routing, authorization, persistence, and context data. The mobile sidebar overlays the content and can be dismissed using its backdrop or Escape. The mobile menu uses a native modal dialog. Switching workspaces means following the link-style `se-button` labeled Back to workspaces and choosing another card on the listing page; application code handles routing. Component APIs are documented in [Button](button.md), [Breadcrumbs](breadcrumbs.md), and [Navigation tabs](nav-tabs.md).

Serve the repository over HTTP and open `test/navigation.html` to run the browser checks. Open `examples/index.html#multi-scope-navigation` for the interactive showcase. No authentication or real tenant data is simulated; all actions are local demonstration state.


The Organization rail example now composes real `se-sidebar` elements with `primary` and `secondary` visual variants. Organization pages show an expanded primary sidebar; repository pages collapse it and add secondary navigation. The application owns that decision, not the visual variant. On mobile, one hamburger opens a native dialog containing both expanded navigation sections. The same elements move back to their desktop positions when the viewport widens. No `se-layout` component is required.

Desktop scope changes animate the primary sidebar width and the secondary navigation space over 220ms. The pattern uses the native Web Animations API because it replaces its mock page DOM on navigation. Reduced-motion preferences skip these transitions; mobile navigation remains immediate.
