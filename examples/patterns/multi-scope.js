import { navigationOverlay } from '../navigation-overlay.js?v=20261031layout4';
import { layoutStyles } from './layouts.js?v=20261031layout4';
function scopeDemo(variant, navigationOverlay) {
  customElements.whenDefined('se-nav-tabs').then(() => {
    const root = document.querySelector('#scope-demo');
    const names = { org: 'Acme', web: 'Website', api: 'Platform API' };
    let activeRoute = '';
    let mobileNavigation;
    const navigate = next => {
      const primary = root.querySelector('.mock-primary');
      const previousColor = primary && getComputedStyle(primary).backgroundColor;
      const previousWidth = primary?.getBoundingClientRect().width;
      const previousSecondary = root.querySelector('.mock-sidebar')?.getBoundingClientRect().width || 0;
      activeRoute = next.replace(/^#/, '');
      route();
      if (primary && !mobile.matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const current = root.querySelector('.mock-primary');
        const sidebar = root.querySelector('.mock-sidebar');
        const timing = { duration: 220, easing: 'ease-in-out' };
        current.animate([{ width: `${previousWidth}px`, backgroundColor: previousColor }, { width: `${current.getBoundingClientRect().width}px`, backgroundColor: getComputedStyle(current).backgroundColor }], timing);
        if (sidebar && !previousSecondary) {
          sidebar.animate([{ width: '0px', opacity: 0, overflow: 'clip' }, { width: `${sidebar.getBoundingClientRect().width}px`, opacity: 1, overflow: 'clip' }], timing);
        } else if (!sidebar && previousSecondary) {
          root.querySelector('.mock-main').animate([{ marginLeft: `${previousSecondary}px` }, { marginLeft: '0px' }], timing);
        }
      }
      const heading = root.querySelector('.mock-page-heading');
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    };
    const mobile = matchMedia('(max-width: 767px)');
    const route = () => {
      mobileNavigation?.destroy();
      const [rawScope, rawPage] = activeRoute.split('/');
      const scope = Object.hasOwn(names, rawScope) ? rawScope : variant === 'rail' ? 'web' : 'org';
      const pages = scope === 'org' ? ['Overview', 'Repositories', 'Members', 'Settings'] : ['Overview', 'Issues', 'Deployments', 'Settings'];
      const page = pages.find(p => p.toLowerCase() === rawPage) || 'Overview';
      const repo = scope !== 'org';
      const secondary = variant === 'rail' && repo;
      const path = (p, s = scope) => `#${s}/${p.toLowerCase()}`;
      const buttons = (items, context) => items.map(item => `<se-nav-item label="${item}" icon="${({Overview:'dashboard',Repositories:'folder',Members:'users',Issues:'circle-check',Deployments:'rocket',Settings:'settings'})[item]}" href="#${context}/${item.toLowerCase()}"${context === scope && item === page ? ' active' : ''}></se-nav-item>`).join('');
      const organization = `<se-nav-section title="Organization">${buttons(['Overview','Repositories','Members','Settings'], 'org')}</se-nav-section>`;
      const current = `<se-nav-section title="${repo ? names[scope] : 'Organization'}">${buttons(pages, scope)}</se-nav-section>`;
      root.innerHTML = `<div class="mock-shell">
        ${variant === 'rail' ? `<nav aria-label="Organization" class="mock-primary" data-se-minimized="${secondary}"><se-brand class="mock-app-brand" icon="package" label="Studio"></se-brand><section>${organization}</section></nav>` : ''}
        <div class="mock-frame">
          <header class="mock-header">${variant !== 'top' ? '<se-panel-toggle for="scope-navigation" variant="menu" class="mock-menu" label="Toggle navigation"></se-panel-toggle>' : ''}<se-brand label="${names[scope]}" icon="${repo ? (scope === 'api' ? 'database' : 'folder') : 'users'}" ${variant === 'sidebar' ? 'compact' : ''}></se-brand>${variant === 'sidebar' ? '<se-breadcrumbs variant="header"></se-breadcrumbs>' : ''}</header>
          <div class="mock-body">
            ${variant === 'sidebar' || secondary ? `<nav aria-label="Project" class="mock-sidebar"><section>${current}</section></nav>` : ''}
            ${variant !== 'top' ? `<nav aria-label="Mobile navigation" id="scope-navigation" class="mock-mobile" data-mobile-navigation hidden><div style="margin-bottom:24px"><se-brand icon="package" label="Studio"></se-brand></div><section>${variant === 'rail' ? organization + (repo ? current : '') : current}</section></nav>` : ''}
            <main class="mock-main">${variant !== 'sidebar' ? '<se-breadcrumbs></se-breadcrumbs>' : ''}<div class="mock-page-heading"><se-title level="page">${page === 'Overview' ? names[scope] : page}</se-title></div><se-nav-tabs variant="${variant === 'top' ? 'pill' : 'underline'}">${variant === 'rail' ? '<span data-actions><se-button variant="secondary" icon="plus" text="' + (repo ? 'New issue' : 'New repository') + '"></se-button></span>' : ''}</se-nav-tabs><div class="mock-content"></div></main>
          </div>
        </div>
      </div>`;
      const scopes = [{ label: 'Acme', href: '#org/repositories' }, ...(repo ? [{ label: names[scope] }] : [])];
      const breadcrumbs = root.querySelector('se-breadcrumbs');
      breadcrumbs.options = scopes;
      breadcrumbs.hidden = variant !== 'sidebar' && scopes.length < 2;
      const tabs = root.querySelector('se-nav-tabs');
      tabs.options = pages.map(p => ({ id: p, label: p, href: path(p) })); tabs.value = page;
      const content = root.querySelector('.mock-content');
      content.innerHTML = !repo && ['Overview', 'Repositories'].includes(page)
        ? '<div class="mock-projects"><se-project-card title="Website" icon="code" href="#web/overview"></se-project-card><se-project-card title="Platform API" icon="database" href="#api/overview"></se-project-card></div>'
        : '<se-text muted>Page content</se-text>';
      const panel = root.querySelector('#scope-navigation');
      if (panel) mobileNavigation = navigationOverlay({ panel, trigger: root.querySelector('se-panel-toggle'), content: [root.querySelector('.mock-main')] });

    };
    root.addEventListener('click', event => { const link = event.target.closest('a[href^="#"]'); if (link) { event.preventDefault(); navigate(link.getAttribute('href')); } });
    route();
  });
}
const scopeStyles = layoutStyles + `
.mock-shell{display:flex;height:100%;background:var(--se-bg)}
.mock-frame{display:flex;flex:1;min-width:0;flex-direction:column}
.mock-header{display:flex;min-height:64px;padding:12px 20px;gap:16px;align-items:center;background:var(--se-surface);border-bottom:1px solid var(--se-border)}
.mock-header>se-brand{flex:none}.mock-header>se-breadcrumbs{min-width:0}
.mock-body{position:relative;display:flex;flex:1;min-height:0}
.mock-primary,.mock-sidebar{display:flex;flex-direction:column;gap:24px;width:244px;flex:none;padding:24px 12px;overflow:auto;background:var(--se-surface);border-right:1px solid var(--se-border)}
.mock-primary[data-se-minimized="true"]{width:76px;padding-inline:8px;background:var(--se-surface-soft)}
.mock-primary[data-se-minimized="true"] se-nav-section>se-title{display:none}.mock-primary[data-se-minimized="true"]>.mock-app-brand{align-self:center}
.mock-main{flex:1;min-width:0;padding:24px;overflow:auto}
.mock-page-heading{margin:6px 0 16px}.mock-content{margin-top:24px}
.mock-projects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.mock-menu,.mock-mobile{display:none}
@media(max-width:767px){.mock-primary,.mock-sidebar{display:none}.mock-menu{display:inline-block}.mock-mobile:not([hidden]){display:block}.mock-projects{grid-template-columns:1fr}.mock-main{padding:20px}.mock-header{padding:10px 12px}}

`;
export const multiScopeExamples = [
  ['Contextual sidebar', 'One sidebar changes with the current scope. Open a project card, then use the breadcrumbs to choose another.', 'sidebar'],
  ['Organization rail', 'Global application identity stays in the rail; the header identifies the current scope. On phones one animated overlay combines organization and project navigation.', 'rail'],
  ['Top navigation', 'Route tabs and project cards suit apps with fewer pages and no persistent sidebar.', 'top'],
].map(([title,description,variant])=>({title,description,markup:`<style>${scopeStyles}</style><div id="scope-demo" style="height:100%"></div><script>(${scopeDemo.toString()})('${variant}', ${navigationOverlay.toString()});</script>`}));
