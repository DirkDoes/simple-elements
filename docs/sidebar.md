# Sidebar pattern

```html
<se-sidebar>
  <se-sidebar-header>
    <se-sidebar-brand label="Simple Elements" icon="dashboard" collapsible></se-sidebar-brand>
  </se-sidebar-header>

  <se-sidebar-body>
    <se-sidebar-section title="Workspace">
      <se-sidebar-button label="Dashboard" icon="dashboard" href="/dashboard" active></se-sidebar-button>
      <se-sidebar-button label="Settings" icon="settings" href="/settings"></se-sidebar-button>
    </se-sidebar-section>
  </se-sidebar-body>

  <se-sidebar-footer>
    <div class="se-sidebar-theme">
      <span>Theme</span>
      <se-checkbox variant="light-dark-switch" label="Toggle dark mode"></se-checkbox>
    </div>
  </se-sidebar-footer>
</se-sidebar>
```

The header, body, and footer are optional. Add any number of sections to the body. The pattern composes existing controls and the dedicated sidebar components rather than accepting an options configuration object. It emits `collapsechange` and `themechange` events.
