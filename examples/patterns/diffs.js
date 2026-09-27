const attribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const beforeCode = `export function welcome(user) {
  const greeting = "Hello";
  return greeting + ", " + user.name;
}

export const retryLimit = 2;`;
const afterCode = `export function welcome(user) {
  const greeting = "Welcome back";
  const name = user.name || "friend";
  return greeting + ", " + name;
}

export const retryLimit = 3;`;
const beforeJson = `{
  "locale": "en",
  "checkout": {
    "button": "Pay now",
    "note": "All sales are final"
  }
}`;
const afterJson = `{
  "locale": "en",
  "checkout": {
    "button": "Complete purchase",
    "note": "Cancel anytime",
    "secure": "Secure checkout"
  }
}`;
const patch = `--- a/welcome.js
+++ b/welcome.js
@@ -1,4 +1,5 @@
 export function welcome(user) {
-  const greeting = "Hello";
-  return greeting + ", " + user.name;
+  const greeting = "Welcome back";
+  const name = user.name || "friend";
+  return greeting + ", " + name;
 }`;
export const diffsPattern = {
  tag: 'diffs', icon: 'files',
  description: 'Comparisons for code, translation keys, documents, and spreadsheet values. The examples use native component behavior; no application scripts.',
  examples: [
    { title: 'Side-by-side code', description: 'Aligned versions with syntax colors, line numbers, semantic row highlights, and change counts.', markup: `<se-diff title="welcome.js" language="javascript" before-label="Before · main" after-label="After · proposal" before="${attribute(beforeCode)}" after="${attribute(afterCode)}"></se-diff>` },
    { title: 'Unified code', description: 'A single review stream, useful when space is limited. Unchanged context stays visible.', markup: `<se-diff title="locales/en.json" variant="unified" language="json" before-label="Published" after-label="Draft" before="${attribute(beforeJson)}" after="${attribute(afterJson)}"></se-diff>` },
    { title: 'Translation tree', description: 'Nested keys remain recognizable. Expand/collapse namespaces; review values together with optional action controls.', markup: `<div style="display:grid;gap:1rem">
  <div style="display:flex;flex-wrap:wrap;align-items:center;gap:.5rem"><se-title level="card">English · en</se-title><se-badge tone="warning" text="3 changed"></se-badge><se-badge tone="success" text="2 added"></se-badge><se-badge tone="error" text="1 removed"></se-badge></div>
  <se-collection type="table" columns="minmax(12rem,1fr) 7rem minmax(16rem,1.7fr)" mobile-columns="minmax(12rem,1fr) minmax(16rem,1.7fr)">
    <se-list-header><span>Key</span><span layout-mode="desktop-only">Change</span><span>Translation</span></se-list-header>
    <se-list-row collapsible><span><code>checkout</code></span><se-badge layout-mode="desktop-only" tone="gray" text="5 changes"></se-badge><se-text muted small>Checkout namespace</se-text></se-list-row>
    <se-list-row level="1" guides collapsible><span><code>payment</code></span><span layout-mode="desktop-only"></span><se-text muted small>Payment messages</se-text></se-list-row>
    <se-list-row level="2" guides><span><code>button</code></span><se-badge layout-mode="desktop-only" tone="warning" text="Changed"></se-badge><se-diff-value variant="stacked" before="Pay now" after="Complete purchase"><se-tooltip data-se-region="action"><se-button data-se-region="trigger" variant="mini" icon="rotate-ccw" aria-label="Restore previous value"></se-button>Restore previous value</se-tooltip></se-diff-value></se-list-row>
    <se-list-row level="2" guides><span><code>secure_note</code></span><se-badge layout-mode="desktop-only" tone="success" text="Added"></se-badge><se-diff-value variant="stacked" after="Your payment is encrypted and secure."></se-diff-value></se-list-row>
    <se-list-row level="2" guides collapsible><span><code>errors</code></span><span layout-mode="desktop-only"></span><se-text muted small>Card errors</se-text></se-list-row>
    <se-list-row level="3" guides><span><code>declined</code></span><se-badge layout-mode="desktop-only" tone="warning" text="Changed"></se-badge><se-diff-value variant="stacked" before="Card rejected." after="Your card was declined. Try another payment method."></se-diff-value></se-list-row>
    <se-list-row level="3" guides><span><code>legacy_error</code></span><se-badge layout-mode="desktop-only" tone="error" text="Removed"></se-badge><se-diff-value variant="stacked" before="Something went wrong."></se-diff-value></se-list-row>
    <se-list-row level="1" guides><span><code>cancel_policy</code></span><se-badge layout-mode="desktop-only" tone="warning" text="Changed"></se-badge><se-diff-value variant="stacked" before="All sales are final." after="Cancel anytime before your order ships."></se-diff-value></se-list-row>
    <se-list-row collapsible><span><code>navigation</code></span><se-badge layout-mode="desktop-only" tone="gray" text="1 change"></se-badge><se-text muted small>Navigation namespace</se-text></se-list-row>
    <se-list-row level="1" guides><span><code>home</code></span><se-badge layout-mode="desktop-only" tone="gray" text="Unchanged"></se-badge><se-diff-value variant="stacked" before="Home" after="Home"></se-diff-value></se-list-row>
    <se-list-row level="1" guides><span><code>help</code></span><se-badge layout-mode="desktop-only" tone="success" text="Added"></se-badge><se-diff-value variant="stacked" after="Help center"></se-diff-value></se-list-row>
  </se-collection>
</div>` },
    { title: 'Document redline', description: 'Text edits stay in their reading context, with inline deletions and insertions rather than code rows.', markup: `<se-card>
  <article style="font-size:.9375rem;line-height:1.85">
    <se-badge tone="gray" text="Published → Revised draft"></se-badge>
    <se-title level="section">A calmer way to work</se-title>
    <p>Bring your team together in one <se-diff-value before="dashboard" after="shared workspace"></se-diff-value>. Your projects, conversations, and decisions stay close to the work.</p>
    <p>Every workspace includes <se-diff-value before="five" after="unlimited"><se-tooltip data-se-region="action"><se-button data-se-region="trigger" variant="mini" icon="info" aria-label="Change details"></se-button>Updated in the October plan review.</se-tooltip></se-diff-value> projects. Invite collaborators and give everyone <se-diff-value after="the right level of access, with"></se-diff-value> a clear place to start.</p>
    <p><se-diff-value before="Contact sales to get started."></se-diff-value> Create your first workspace whenever you are ready.</p>
  </article>
</se-card>` },
    { title: 'Spreadsheet review', description: 'Cell-level changes preserve the table’s structure. Unchanged values remain neutral; new cells are immediately recognizable.', markup: `<div style="display:grid;gap:1rem">
  <div style="display:flex;flex-wrap:wrap;align-items:center;gap:.5rem"><se-title level="card">Pricing sheet</se-title><se-badge tone="gray" text="September → October"></se-badge></div>
  <se-collection type="table" columns="minmax(8rem,1.2fr) repeat(3,minmax(7rem,1fr))" dividers="1" divider-style="dashed">
    <se-list-header><span>Plan</span><span>Monthly</span><span>Seats</span><span>Storage</span></se-list-header>
    <se-list-row><strong>Starter</strong><se-diff-value variant="stacked" before="$19" after="$24"></se-diff-value><se-diff-value variant="stacked" before="3" after="3"></se-diff-value><se-diff-value variant="stacked" before="10 GB" after="25 GB"></se-diff-value></se-list-row>
    <se-list-row><strong>Team</strong><se-diff-value variant="stacked" before="$49" after="$49"></se-diff-value><se-diff-value variant="stacked" before="10" after="15"></se-diff-value><se-diff-value variant="stacked" before="100 GB" after="100 GB"></se-diff-value></se-list-row>
    <se-list-row><strong>Business</strong><se-diff-value variant="stacked" after="$99"></se-diff-value><se-diff-value variant="stacked" after="Unlimited"></se-diff-value><se-diff-value variant="stacked" after="1 TB"></se-diff-value></se-list-row>
  </se-collection>
</div>` },
    { title: 'Patch highlighting', description: 'The same diff treatment works in a code block and an editable textarea. Keep the underlying language for syntax highlighting.', markup: `<div style="display:grid;gap:1.5rem">
  <se-code block diff language="javascript">${attribute(patch)}</se-code>
  <se-code-editor label="Editable patch" language="javascript" diff autosize value="${attribute(patch)}"></se-code-editor>
</div>` }
  ]
};

