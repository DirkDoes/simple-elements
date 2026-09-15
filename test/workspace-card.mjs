import assert from 'node:assert/strict';
const definitions = new Map();
globalThis.customElements = { get: name => definitions.get(name), define: (name, component) => definitions.set(name, component) };
globalThis.HTMLElement = class {
  dataset = {};
  attributes = {};
  getAttribute(name) { return this.attributes[name] ?? null; }
  hasAttribute(name) { return name in this.attributes; }
};
await import('../src/components/workspace-card.js');
const Card = definitions.get('se-workspace-card');
const render = attributes => { const card = new Card(); card.attributes = attributes; card.connectedCallback(); return card; };
assert.match(render({}).innerHTML, /<button.*type="button"/);
const link = render({ title: '<Acme>', href: '/workspaces/acme?a=1&b=2', metadata: '12 members' });
assert.match(link.innerHTML, /<a.*href="\/workspaces\/acme\?a=1&amp;b=2"/);
assert.match(link.innerHTML, /&lt;Acme&gt;/);
assert.match(link.innerHTML, /12 members/);
assert.doesNotMatch(render({ href: '/acme', disabled: '' }).innerHTML, /<a /);
assert.match(render({ href: '/acme', disabled: '' }).innerHTML, /type="button" disabled/);
const before = link.innerHTML;
link.connectedCallback();
assert.equal(link.innerHTML, before);
console.log('Workspace card native semantics, escaping, and reconnect checks passed.');

const imageCard = render({ title: 'Acme', initials: 'AS', image: '/avatar.jpg?a=1&b=2' });
assert.match(imageCard.innerHTML, /src="\/avatar.jpg\?a=1&amp;b=2"/);
assert.match(imageCard.innerHTML, /se-workspace-card__identity--image/);
assert.doesNotMatch(imageCard.innerHTML, />AS</);
