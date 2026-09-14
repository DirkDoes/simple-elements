# Button

```html
<se-button variant="brand" icon="send" text="Publish"></se-button>
<se-button variant="ghost" href="/drafts" text="View drafts"></se-button>
<se-button variant="link" href="/forgot-password" text="Forgot password?"></se-button>
<se-button variant="danger" text="Delete"></se-button>
<se-button icon="settings" aria-label="Settings"></se-button>
```

`variant` accepts `primary`, `brand`, `secondary`, `ghost`, `danger`, `label`, or `link`. Use `link` for low-emphasis navigation that is brand-colored and underlined on hover. Use `href` for navigation. Native `type`, `disabled`, and click events are supported. The internal control fills its `se-button` host, including stretched flex items.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).
