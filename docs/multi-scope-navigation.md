# Multi-scope navigation

These examples are now part of the **Page Layout** pattern. Three isolated examples show contextual navigation, a global organization rail beside project navigation, and top-only navigation. Each uses native nav/header/main containers, application-owned flex CSS, and independent mock routing. The snippets include their complete CSS and JavaScript.

The organization rail uses `data-se-minimized="true"` on repository pages and returns to full labels on organization pages. Minimized presentation does not control layout: this application's `.mock-primary` CSS selects its width. On mobile, the app hides desktop navigation and exposes a single animated native navigation overlay with a `se-panel-toggle`, blur backdrop, Escape dismissal, and focus restoration. A route selection replaces the mock page and closes that panel. Applications may choose different breakpoints or an overlay drawer.

Breadcrumbs identify organization/project scope, tabs identify pages, and project cards navigate into a scope. No authentication, persistence, or remote tenant data is simulated. Test using `test/navigation.html`; see [application layouts](page-layout.md).
