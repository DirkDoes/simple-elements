function scopeDemo(variant) {
  customElements.whenDefined('se-nav-tabs').then(() => {
    const root = document.querySelector('#scope-demo');
    const names = { org: 'Acme', web: 'Website', api: 'Platform API' };
    let activeRoute = '';
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
      const [rawScope, rawPage] = activeRoute.split('/');
      const scope = Object.hasOwn(names, rawScope) ? rawScope : variant === 'rail' ? 'web' : 'org';
      const pages = scope === 'org' ? ['Overview', 'Repositories', 'Members', 'Settings'] : ['Overview', 'Issues', 'Deployments', 'Settings'];
      const page = pages.find(p => p.toLowerCase() === rawPage) || 'Overview';
      const repo = scope !== 'org';
      const secondary = variant === 'rail' && repo;
      const path = (p, s = scope) => `#${s}/${p.toLowerCase()}`;
      const buttons = (items, context) => items.map(item => `<se-sidebar-button label="${item}" icon="${({Overview:'dashboard',Repositories:'folder',Members:'users',Issues:'circle-check',Deployments:'rocket',Settings:'settings'})[item]}" href="#${context}/${item.toLowerCase()}"${context === scope && item === page ? ' active' : ''}></se-sidebar-button>`).join('');
      const organization = `<se-sidebar-chapter title="Organization">${buttons(['Overview','Repositories','Members','Settings'], 'org')}</se-sidebar-chapter>`;
      const current = `<se-sidebar-chapter title="${repo ? names[scope] : 'Organization'}">${buttons(pages, scope)}</se-sidebar-chapter>`;
      root.innerHTML = `<div class="mock-shell">
        ${variant === 'rail' ? `<se-sidebar variant="primary" class="mock-primary" layout-mode="desktop-only" ${secondary ? 'collapsed' : ''}><section>${organization}</section></se-sidebar>` : ''}
        <div class="mock-frame">
          <se-topbar>${variant !== 'top' ? '<se-sidebar-toggle for="scope-navigation" layout-mode="mobile-only"></se-sidebar-toggle>' : ''}<se-layout-brand label="Acme" icon="box" ${variant === 'sidebar' ? 'compact' : ''}></se-layout-brand>${variant === 'sidebar' ? '<se-breadcrumbs variant="header"></se-breadcrumbs>' : ''}</se-topbar>
          <div class="mock-body">
            ${variant === 'sidebar' || secondary ? `<se-sidebar variant="secondary" class="mock-sidebar" layout-mode="desktop-only"><section>${current}</section></se-sidebar>` : ''}
            ${variant !== 'top' ? `<se-sidebar id="scope-navigation" class="mock-mobile" layout-mode="responsive"><section>${variant === 'rail' ? organization + (repo ? current : '') : current}</section></se-sidebar>` : ''}
            <main class="mock-main">${variant !== 'sidebar' ? '<se-breadcrumbs></se-breadcrumbs>' : ''}<div class="mock-page-heading"><se-title level="page">${page === 'Overview' ? names[scope] : page}</se-title></div><se-nav-tabs variant="${variant === 'top' ? 'pill' : 'underline'}"></se-nav-tabs><div class="mock-content"></div></main>
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
      root.querySelector('se-sidebar-toggle')?.sync();

    };
    root.addEventListener('click', event => { const link = event.target.closest('a[href^="#"]'); if (link) { event.preventDefault(); navigate(link.getAttribute('href')); } });
    route();
  });
}
const scopeStyles = `
.mock-shell{display:flex;height:100%;background:var(--se-bg)}
.mock-frame{display:flex;flex:1;min-width:0;flex-direction:column}
.mock-frame>se-topbar>se-layout-brand[compact]{width:auto;flex:none}
.mock-body{position:relative;display:flex;flex:1;min-height:0}
.mock-primary,.mock-sidebar{--se-sidebar-width:244px}
.mock-main{flex:1;min-width:0;padding:20px;overflow:auto}
.mock-page-heading{margin:6px 0 16px}
.mock-content{margin-top:24px}
.mock-projects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
@media(min-width:768px){.mock-mobile{display:none}}
@media(max-width:767px){.mock-projects{grid-template-columns:1fr}}
`;
export const multiScopePattern = {
  tag: 'multi-scope-navigation', icon: 'network', isolated: true,
  description: 'Working organization and repository navigation. Each preview has independent routing and state; use the viewport selector to try tablet and phone layouts.',
  examples: [
    ['Contextual sidebar', 'One sidebar changes with the current scope. Open a project card, then use the breadcrumbs to choose another.', 'sidebar'],
    ['Organization rail', 'Organization navigation expands on organization pages and collapses beside repository navigation. On phones, one top-opening sidebar contains both chapters.', 'rail'],
    ['Top navigation', 'Route tabs and project cards suit apps with fewer pages and no persistent sidebar.', 'top'],
  ].map(([title,description,variant])=>({title,description,markup:`<style>${scopeStyles}</style><div id="scope-demo" style="height:100%"></div><script>(${scopeDemo.toString()})('${variant}');</script>`})),
};
