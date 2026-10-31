import { navigationOverlay, navigationOverlayStyles } from '../navigation-overlay.js?v=20261031layout4';
// These styles belong to the example application, not the component bundle.
export const layoutStyles = navigationOverlayStyles + `
*{box-sizing:border-box}body{font-family:var(--se-font);color:var(--se-text);background:var(--se-bg)}
.app{height:100%;display:flex;flex-direction:column;min-width:0;overflow:hidden}
.app-header{display:flex;align-items:center;gap:16px;padding:12px 20px;border-bottom:1px solid var(--se-border);background:var(--se-surface);min-height:64px;flex:none}
.app-header>se-brand{margin-right:auto}.app-header>se-input{max-width:240px}
.app-tabs{padding:0 20px;background:var(--se-surface);border-bottom:1px solid var(--se-border)}
.app-body{display:flex;flex:1;min-width:0;min-height:0;position:relative}
.app-nav{position:relative;width:var(--se-resize-size,240px);flex:none;display:flex;flex-direction:column;background:var(--se-surface);min-height:0;transition:width .22s ease}
.app-nav-scroll{padding:24px 12px;overflow:auto;min-height:0;flex:1;display:flex;flex-direction:column;gap:20px}
.app-nav>footer{padding:16px 12px}.app-nav[data-se-minimized="true"]{width:72px}.app-nav[data-se-minimized="true"] .app-nav-scroll{padding-inline:8px}.app-nav[data-se-minimized="true"] .app-nav-label{display:none}
.app-nav[data-resizing],.app-pane[data-resizing],.app-upper[data-resizing]{transition:none}
.app-nav[hidden]{display:none}
.app-content{flex:1;min-width:0;min-height:0;overflow:auto;padding:28px}
.app-content>se-text{display:block;margin:8px 0 24px}
.app-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr));gap:16px}
.app-toolbar{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:20px}
.app-frame{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0}
.app-rail{width:72px;flex:none;padding:16px 8px;background:var(--se-surface-soft);border-right:1px solid var(--se-border);display:flex;flex-direction:column;gap:16px}.app-rail>se-brand{align-self:center}
.app-center{width:min(100%,920px);margin-inline:auto;padding:0 24px}
.app-subnav{padding:12px;background:var(--se-surface-soft);border-radius:var(--se-radius)}
.app-split{display:flex;flex:1;min-width:0;min-height:0}.app-pane{width:var(--se-resize-size,45%);flex:none;overflow:auto;padding:24px;min-width:0}.app-pane-fill{flex:1;min-width:0;overflow:auto;padding:24px}
.app-stack{display:flex;flex-direction:column;flex:1;min-height:0}.app-upper{height:var(--se-resize-size,260px);flex:none;overflow:auto;padding:24px}
.app-mobile,[data-mobile-navigation][hidden]{display:none}
@media(max-width:767px){.app-header{padding:10px 12px;gap:8px}.app-header>se-input{display:none}.app-content{padding:20px}.app-mobile{display:inline-block}.app-desktop,.app-nav,.app-rail,.app se-resize-handle{display:none}.app-center{padding:0 12px}.app-split{flex-direction:column;overflow:auto}.app-pane{width:100%;flex:none}.app-pane-fill{flex:none}.app-stack{flex:none}.app-upper{height:auto;overflow:visible}.app-upper se-empty-illustration{max-width:320px;margin:auto}.app-mobile-brand{display:flex;align-items:center;gap:12px;margin-bottom:24px}}
@media(prefers-reduced-motion:reduce){.app-nav{transition:none}}
`;

const item = (label, icon, active = false) => `<se-nav-item label="${label}" icon="${icon}" data-page="${label}"${active ? ' active' : ''}></se-nav-item>`;
const navigation = () => `${item('Overview', 'dashboard', true)}${item('Projects', 'folder')}${item('Members', 'users')}${item('Settings', 'settings')}`;
const header = (scoped = false) => `<header class="app-header"><se-panel-toggle for="navigation" variant="menu" class="app-desktop" label="Toggle navigation"></se-panel-toggle><se-panel-toggle for="mobile-navigation" variant="menu" class="app-mobile" label="Open navigation"></se-panel-toggle><se-brand icon="${scoped ? 'folder' : 'box'}" label="${scoped ? 'Website' : 'Acme Studio'}"></se-brand><se-input type="search" placeholder="Search workspace"></se-input><se-profile name="Sarah Jenkins" initials="SJ" compact></se-profile></header><nav id="mobile-navigation" data-mobile-navigation aria-label="Mobile navigation" hidden><div class="app-mobile-brand"><se-brand icon="package" label="Studio"></se-brand></div>${scoped ? `<se-nav-section title="Organization">${navigation()}</se-nav-section><se-nav-section title="Website">${item('Documents','file')}${item('Assets','image')}</se-nav-section><se-nav-section title="Environment">${item('Production','globe')}${item('Staging','code')}</se-nav-section>` : navigation()}</nav>`;
const tabs = () => `<se-nav-tabs value="overview" options='[{"id":"overview","label":"Overview","href":"#view-overview"},{"id":"activity","label":"Activity","href":"#view-activity"},{"id":"files","label":"Files","href":"#view-files"}]'></se-nav-tabs>`;
const nav = () => `<nav id="navigation" class="app-nav" aria-label="Workspace"><se-panel-toggle for="navigation" mode="minimize" variant="edge" placement="edge-end" label="Minimize navigation"></se-panel-toggle><div class="app-nav-scroll"><div class="app-nav-label"><se-text muted>WORKSPACE</se-text></div><div>${navigation()}</div></div><footer><se-profile name="Sarah Jenkins" subtitle="Administrator" initials="SJ"></se-profile></footer></nav><se-resize-handle for="navigation" min="180" max="380" snap="minimize" label="Navigation width"></se-resize-handle>`;
const content = () => `<main class="app-content"><se-title level="page" data-page-title>Overview</se-title><se-text muted>Welcome back, Sarah. Here is what your team is working on.</se-text><div class="app-cards"><se-project-card title="Northstar" icon="sparkles" subtitle="Customer portal" metadata="Updated today"></se-project-card><se-project-card title="Design system" icon="palette" subtitle="Our shared foundations" metadata="Updated yesterday"></se-project-card></div></main>`;
function layoutInteraction(navigationOverlay) {
  document.addEventListener('click', event => {
    const tabLink = event.target.closest('se-nav-tabs a[href^="#view-"]');
    if (tabLink) { event.preventDefault(); tabLink.closest('se-nav-tabs').value = tabLink.hash.slice(6); const title = document.querySelector('[data-page-title]'); if (title) title.textContent = tabLink.textContent; return; }
    const item = event.target.closest('se-nav-item[data-page]');
    if (!item) return;
    const section = item.closest('nav') || item.parentElement;
    section.querySelectorAll('se-nav-item[data-page]').forEach(control => control.toggleAttribute('active', control === item));
    const title = document.querySelector('[data-page-title]');
    if (title) title.textContent = item.dataset.page;
  });
  const panel = document.getElementById('mobile-navigation');
  if (panel) navigationOverlay({ panel, trigger: document.querySelector('se-panel-toggle[for="mobile-navigation"]'), content: [...document.querySelectorAll('.app-content,.app-tabs')] });
  const documentPane = document.getElementById('document-pane');
  if (documentPane) {
    const mobile = matchMedia('(max-width:767px)');
    let desktopHidden = documentPane.hidden;
    const sync = () => { if (mobile.matches) { desktopHidden = documentPane.hidden; documentPane.hidden = false; } else documentPane.hidden = desktopHidden; };
    mobile.addEventListener('change', sync); sync();
  }


}
const example = (title, description, body) => ({ title, description, markup: `<style>${layoutStyles}</style>${body}<script>(${layoutInteraction.toString()})(${navigationOverlay.toString()});</script>` });

export const pageLayoutPattern = {
  tag: 'page-layout', icon: 'panel-left-close', isolated: true,
  description: 'Application-owned HTML and CSS. Reuse the same controls in different arrangements; every preview includes its complete layout code. Drag an edge or focus it and use the arrow keys.',
  examples: [
    example('Navigation below full-width tabs', 'The header and tabs span the page. A native nav below them can be minimized, hidden, or resized. Drag past its minimum to snap to icons.', `<div class="app">${header()}<div class="app-tabs">${tabs()}</div><div class="app-body">${nav()}${content()}</div></div>`),
    example('Full-height navigation, centered tabs', 'The same navigation spans the full height. Tabs stay inside the content column and can have their own maximum width.', `<div class="app" style="flex-direction:row">${nav()}<div class="app-frame">${header()}<div class="app-tabs"><div class="app-center">${tabs()}</div></div>${content()}</div></div>`),
    example('Global rail with nested navigation', 'A minimized global context and an expanded local context coexist. The inner navigation remains ordinary HTML, even when nested in another panel.', `<div class="app" style="flex-direction:row"><nav class="app-rail" data-se-minimized="true" aria-label="Organization"><se-brand label="Studio" icon="package"></se-brand>${navigation()}</nav><div class="app-frame">${header(true)}<div class="app-tabs">${tabs()}</div><div class="app-body"><aside id="navigation" class="app-nav" aria-label="Project panel"><div class="app-nav-scroll"><se-nav-section title="Website">${item('Overview', 'dashboard', true)}<se-nav-group label="Resources" icon="folder"><se-nav-item label="Documents" icon="file"></se-nav-item><se-nav-item label="Assets" icon="image"></se-nav-item></se-nav-group></se-nav-section><div class="app-subnav" data-se-minimized="false"><nav aria-label="Environment"><se-nav-section title="Environment">${item('Production', 'globe')}${item('Staging', 'code')}</se-nav-section></nav></div></div></aside><se-resize-handle for="navigation" min="220" max="380" label="Project navigation width"></se-resize-handle>${content()}</div></div></div>`),
    example('Split workspace', 'Resize either axis on desktop; drag the document edge beyond its minimum to close it. On phones the panes stack and the resize controls are omitted.', `<div class="app"><header class="app-header"><se-brand label="Document studio" icon="file"></se-brand><se-panel-toggle class="app-desktop" for="document-pane" label="Toggle document pane" variant="menu"></se-panel-toggle><se-badge text="Draft" tone="brand"></se-badge></header><div class="app-split"><section id="document-pane" class="app-pane" aria-label="Document"><se-title level="section">Project brief</se-title><se-text>We are building a quieter workspace for focused teams.</se-text><se-collapsible title="Project resources" open><nav aria-label="Document resources">${item('Research notes', 'file')}${item('Design references', 'palette')}</nav></se-collapsible></section><se-resize-handle for="document-pane" min="200" max="600" snap="collapse" label="Document width"></se-resize-handle><div class="app-stack"><section id="preview-pane" class="app-upper" aria-label="Preview"><se-title level="section">Preview</se-title><se-empty-illustration variant="start" title="Your next chapter" subtitle="A place to shape the idea."></se-empty-illustration></section><se-resize-handle for="preview-pane" axis="y" min="120" max="360" label="Preview height"></se-resize-handle><section class="app-pane-fill"><se-title level="section">Notes</se-title><se-input type="textarea" label="Team notes" placeholder="Add a thought…"></se-input></section></div></div></div>`),
  ],
};
