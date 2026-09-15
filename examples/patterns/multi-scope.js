function scopeDemo(variant) {
  customElements.whenDefined('se-select').then(() => {
    const root = document.querySelector('#scope-demo');
    const contexts = [{ id: 'org', label: 'Acme organization', description: 'Organization · 24 members', icon: 'house' }, { id: 'web', label: 'Website', description: 'Repository · TypeScript', icon: 'code' }, { id: 'api', label: 'Platform API', description: 'Repository · Go', icon: 'database' }];
    const names = { org: 'Acme', web: 'Website', api: 'Platform API' };
    let activeRoute = '';
    const navigate = next => {
      const primary = root.querySelector('.mock-primary');
      const previousWidth = primary?.getBoundingClientRect().width;
      const previousSecondary = root.querySelector('.mock-sidebar')?.getBoundingClientRect().width || 0;
      activeRoute = next.replace(/^#/, '');
      route();
      if (primary && !mobile.matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const current = root.querySelector('.mock-primary');
        const sidebar = root.querySelector('.mock-sidebar');
        const timing = { duration: 220, easing: 'ease-in-out' };
        current.animate([{ width: `${previousWidth}px` }, { width: `${current.getBoundingClientRect().width}px` }], timing);
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
    let syncMobile = () => {};
    mobile.addEventListener('change', () => syncMobile());
    const route = () => {
      const [rawScope, rawPage] = activeRoute.split('/');
      const scope = Object.hasOwn(names, rawScope) ? rawScope : variant === 'rail' ? 'web' : 'org';
      const pages = scope === 'org' ? ['Overview', 'Repositories', 'Members', 'Settings'] : ['Overview', 'Issues', 'Deployments', 'Settings'];
      const page = pages.find(p => p.toLowerCase() === rawPage) || 'Overview';
      const repo = scope !== 'org';
      const secondary = variant === 'rail' && repo;
      const path = (p, s = scope) => `#${s}/${p.toLowerCase()}`;
      const nav = pages.map(p => `<se-sidebar-button label="${p === 'Settings' ? (repo ? 'Repository settings' : 'Organization settings') : p}" icon="${({Overview:'dashboard',Repositories:'folder',Members:'users',Issues:'circle-check',Deployments:'rocket',Settings:'settings'})[p]}" href="${path(p)}"${p === page ? ' active' : ''}></se-sidebar-button>`).join('');
      root.innerHTML = `<div class="mock-shell ${variant}">${variant === 'rail' ? `<se-sidebar variant="primary" class="mock-primary" aria-label="Organization navigation" ${secondary ? 'collapsed' : ''}><header><se-layout-brand label="Acme" icon="box"></se-layout-brand></header><section><se-sidebar-chapter title="Organization">${['Overview','Repositories','Members','Settings'].map(p => `<se-sidebar-button label="${p}" icon="${({Overview:'dashboard',Repositories:'folder',Members:'users',Settings:'settings'})[p]}" href="#org/${p.toLowerCase()}" ${!repo && page === p ? 'active' : ''}></se-sidebar-button>`).join('')}</se-sidebar-chapter></section></se-sidebar>` : ''}<div class="mock-frame"><header class="mock-topbar"><button class="se-button se-button--ghost se-button--icon mock-hamburger" aria-label="Open navigation" aria-expanded="false"><se-icon name="menu"></se-icon></button><se-layout-brand label="Acme" icon="box"></se-layout-brand><se-badge text="Demo workspace"></se-badge><se-profile name="Alex Morgan" initials="AM" compact></se-profile></header><div class="mock-body">${variant === 'sidebar' || secondary ? `<se-sidebar variant="secondary" class="mock-sidebar"><section>${repo ? '<se-button variant="link" text="Back to Acme" icon="arrow-left" href="#org/overview"></se-button>' : ''}<se-select label="${repo ? 'Repository' : 'Organization'}" searchable></se-select><div class="mock-nav-label">${repo ? 'REPOSITORY' : 'ORGANIZATION'}</div><nav aria-label="${repo ? 'Repository' : 'Organization'} navigation">${nav}</nav><footer><se-text muted small>${repo ? 'Repository access and settings' : 'Organization access and settings'}</se-text></footer></section></se-sidebar>` : ''}<main class="mock-main">${variant === 'top' ? '<div class="mock-context-row"><se-select searchable label="Current context"></se-select><se-text muted>Switch between your organization and its repositories.</se-text></div>' : ''}<se-breadcrumbs></se-breadcrumbs><div class="mock-page-heading"><div><se-title level="page">${page === 'Overview' ? names[scope] : page === 'Settings' ? (repo ? 'Repository settings' : 'Organization settings') : page}</se-title><se-text muted>${repo ? `Acme / ${names[scope]} · Private repository` : 'Manage your people, projects, and shared resources.'}</se-text></div><se-badge tone="brand" text="${repo ? 'Repository' : 'Organization'}"></se-badge></div><se-nav-tabs variant="${variant === 'top' ? 'pill' : 'underline'}"></se-nav-tabs><div class="mock-content"></div><p class="mock-footnote">Interactive example · changes stay inside this preview</p></main></div></div></div>`;
      if (variant === 'rail' && !repo) root.querySelector('.mock-main').insertAdjacentHTML('afterbegin', '<div class="mock-context-row"><se-select searchable label="Current context"></se-select></div>');
      const picker = root.querySelector('se-select');
      picker.options = contexts; picker.value = scope;
      picker.addEventListener('change', e => { navigate(`${e.detail.value}/overview`); });
      root.querySelector('se-breadcrumbs').options = [{ label: 'Acme', href: '#org/overview' }, ...(repo ? [{ label: names[scope], href: path('Overview') }] : []), { label: page }];
      const tabs = root.querySelector('se-nav-tabs');
      tabs.options = pages.map(p => ({ id: p, label: p, href: path(p), ...(p === 'Issues' ? {count:scope === 'web' ? 12 : 4} : {}) })); tabs.value = page;
      const content = root.querySelector('.mock-content');
      if (page === 'Settings') {
        content.innerHTML = `<se-card><se-title level="section">General</se-title><se-text muted>These settings apply only to ${repo ? names[scope] : 'the Acme organization'}.</se-text><form class="mock-form"><se-input label="${repo ? 'Repository' : 'Organization'} name" value="${names[scope]}"></se-input><se-input label="Description" value="${repo ? 'Our shared product codebase' : 'A home for everything we build'}"></se-input><se-button type="submit" variant="brand" text="Save changes"></se-button><span role="status" data-save-status></span></form></se-card>`;
        content.querySelector('form').addEventListener('submit', e => {e.preventDefault();content.querySelector('[data-save-status]').textContent = 'Saved for this demo.';});
      } else if (page === 'Members') {
        content.innerHTML = '<se-card><se-title level="section">Organization members</se-title><div class="mock-members"><se-profile name="Alex Morgan" initials="AM" subtitle="Owner"></se-profile><se-profile name="Sam Chen" initials="SC" subtitle="Developer"></se-profile><se-profile name="Robin Ellis" initials="RE" subtitle="Designer"></se-profile></div></se-card>';
      } else if (page === 'Issues' || page === 'Deployments') {
        const issues = page === 'Issues';
        content.innerHTML = `<se-card><se-title level="section">${names[scope]} ${page.toLowerCase()}</se-title>${(issues ? ['Improve keyboard navigation', 'Update API documentation', 'Review release checklist'] : ['Production · deployed 12 minutes ago', 'Preview · ready for review']).map(label => `<div class="mock-list-row"><se-icon name="${issues ? 'circle-check' : 'rocket'}"></se-icon><span>${label}</span><se-badge tone="${issues ? 'gray' : 'success'}" text="${issues ? 'Open' : 'Ready'}"></se-badge></div>`).join('')}</se-card>`;
      } else if (!repo) {
        content.innerHTML = `<div class="mock-stats"><se-card><se-text muted>Repositories</se-text><se-title level="page">2</se-title></se-card><se-card><se-text muted>Members</se-text><se-title level="page">24</se-title></se-card><se-card><se-text muted>Plan</se-text><se-title level="page">Team</se-title></se-card></div><se-title level="section">Your repositories</se-title><div class="mock-projects"><se-project-card title="Website" icon="code" description="Customer-facing product and docs" metadata="TypeScript · Updated today" href="#web/overview"></se-project-card><se-project-card title="Platform API" icon="database" description="Services behind the product" metadata="Go · Updated 2 hours ago" href="#api/overview"></se-project-card></div>`;
      } else {
        content.innerHTML = `<div class="mock-stats"><se-card><se-text muted>Open issues</se-text><se-title level="page">${scope === 'web' ? 12 : 4}</se-title></se-card><se-card><se-text muted>Contributors</se-text><se-title level="page">8</se-title></se-card><se-card><se-text muted>Latest deploy</se-text><se-title level="page">Healthy</se-title></se-card></div><se-card><se-title level="section">Welcome to ${names[scope]}</se-title><se-text muted>Everything your team needs to build, review, and ship.</se-text><div class="mock-list-row"><se-icon name="code"></se-icon><span>main · latest changes merged</span><se-badge tone="success" text="Passing"></se-badge></div><se-button variant="secondary" text="View issues" icon="circle-check" href="${path('Issues')}"></se-button></se-card>`;
      }
      const toggle = root.querySelector('.mock-hamburger');
      toggle.hidden = variant === 'top';
      root.insertAdjacentHTML('beforeend', '<dialog class="mock-navigation" aria-label="Navigation"><div class="mock-navigation-heading"><strong>Navigation</strong><button class="se-button se-button--ghost" autofocus aria-label="Close navigation">Close</button></div><div class="mock-navigation-sections"></div></dialog>');
      const dialog = root.querySelector('dialog');
      const sidebars = [...root.querySelectorAll('se-sidebar')].map(sidebar => {
        const position = document.createComment('Sidebar position');
        sidebar.before(position);
        return { sidebar, position };
      });
      const close = () => dialog.close();
      dialog.querySelector('button').onclick = close;
      dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
      dialog.addEventListener('close', () => { toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); });
      toggle.setAttribute('aria-controls', 'scope-navigation');
      dialog.id = 'scope-navigation';
      toggle.onclick = () => { dialog.showModal(); toggle.setAttribute('aria-expanded', 'true'); };
      syncMobile = () => {
        if (!mobile.matches && dialog.open) close();
        for (const {sidebar, position} of sidebars) {
          if (mobile.matches) dialog.querySelector('.mock-navigation-sections').append(sidebar);
          else position.after(sidebar);
          sidebar.collapsed = !mobile.matches && sidebar.matches('[variant="primary"]') && secondary;
        }
      };
      syncMobile();
    };
    root.addEventListener('click', event => { const link = event.target.closest('a[href^="#"]'); if (link) { event.preventDefault(); navigate(link.getAttribute('href')); } });
    route();
  });
}
const scopeStyles = `
*{box-sizing:border-box}body{font-family:var(--se-font)}.mock-shell{display:flex;height:100%;background:var(--se-bg);color:var(--se-text)}.mock-frame{display:flex;flex:1;min-width:0;flex-direction:column}.mock-topbar{display:flex;align-items:center;gap:1rem;min-height:64px;padding:0 24px;background:var(--se-surface);border-bottom:1px solid var(--se-border)}.mock-topbar se-layout-brand{flex:1}.mock-body{position:relative;display:flex;flex:1;min-height:0}.mock-sidebar{--se-sidebar-width:244px}.mock-sidebar>section{display:flex;flex-direction:column;gap:24px}.mock-primary{--se-sidebar-width:244px}.mock-sidebar footer{margin-top:auto}.mock-nav-label{font-size:10px;letter-spacing:.12em;color:var(--se-faint);font-weight:700}.mock-main{flex:1;min-width:0;padding:28px;overflow:auto}.mock-page-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:24px 0}.mock-page-heading se-text{margin-top:8px}.mock-content{display:grid;gap:20px;margin-top:24px}.mock-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.mock-stats se-card{padding:18px}.mock-stats se-title{margin-top:8px}.mock-projects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.mock-list-row{display:flex;align-items:center;gap:12px;padding:18px 0;font-size:13px}.mock-list-row>span{flex:1}.mock-list-row+.mock-list-row{border-top:1px solid var(--se-border)}.mock-form{display:grid;gap:20px;margin-top:24px;max-width:420px}.mock-form se-button{width:fit-content}.mock-members{display:grid;gap:24px;margin-top:24px}.mock-footnote{font-size:11px;color:var(--se-faint);margin-top:28px}.mock-context-row{display:flex;align-items:center;gap:24px;margin-bottom:24px}.mock-context-row se-select{width:260px}.mock-hamburger{display:none}.mock-backdrop{display:none}.mock-shell .se-select__menu{z-index:40}
.mock-navigation{padding:0;border:1px solid var(--se-border);border-radius:var(--se-radius);background:var(--se-surface);color:var(--se-text);width:min(360px,calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto}.mock-navigation-heading>button{width:auto;flex:none}.mock-navigation::backdrop{background:#0008}.mock-navigation-heading{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--se-border)}
@media(max-width:767px){.mock-topbar{padding:0 16px}.mock-topbar>se-badge{display:none}.mock-main{padding:20px 16px}.mock-hamburger{display:inline-flex}.mock-navigation se-sidebar{display:flex;width:100%;height:auto;border:0}.mock-navigation se-sidebar+se-sidebar{border-top:1px solid var(--se-border)}.mock-stats{grid-template-columns:1fr}.mock-stats se-card{display:flex;align-items:center;justify-content:space-between}.mock-stats se-title{margin:0}.mock-projects{grid-template-columns:1fr}.mock-context-row{display:block}.mock-context-row se-select{width:100%}.mock-context-row>se-text{display:none}.mock-page-heading{align-items:flex-start}.mock-page-heading>se-badge{display:none}}
`;
export const multiScopePattern = {
  tag: 'multi-scope-navigation', icon: 'network', isolated: true,
  description: 'Working organization and repository navigation. Each preview has independent routing and state; use the viewport selector to try tablet and phone layouts.',
  examples: [
    ['Contextual sidebar', 'One sidebar changes with the current scope. Open a repository, switch contexts, or use Back to Acme.', 'sidebar'],
    ['Organization rail', 'Organization navigation expands on organization pages and collapses beside repository navigation. On phones, one menu contains both sections.', 'rail'],
    ['Top navigation', 'A context selector and route tabs suit apps with fewer pages and no persistent sidebar.', 'top'],
  ].map(([title,description,variant])=>({title,description,markup:`<style>${scopeStyles}</style><div id="scope-demo" style="height:100%"></div><script>(${scopeDemo.toString()})('${variant}');</script>`})),
};
