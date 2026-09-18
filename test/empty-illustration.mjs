import assert from 'node:assert/strict';
import { emptyIllustrations } from '../src/illustrations.js';

let Component;
globalThis.customElements = { get: () => null, define: (name, value) => { Component = value; } };
globalThis.HTMLElement = class {
  dataset = {};
  childNodes = [];
  attributes = {};
  getAttribute(name) { return this.attributes[name] ?? null; }
};
await import('../src/components/empty-illustration.js');
const render = attributes => {
  const element = new Component();
  element.attributes = attributes;
  element.connectedCallback();
  return element;
};
assert.equal(Object.keys(emptyIllustrations).length, 21);
for (const [variant, svg] of Object.entries(emptyIllustrations)) {
  assert.doesNotMatch(svg, /#[a-f\d]{6}|="white"|<script|<image|<foreignObject/i);
  assert.match(svg, /aria-hidden="true"/);
  assert.doesNotMatch(svg, /--se-illustration-shadow/);
  const element = render({ variant });
  assert.match(element.innerHTML, /<svg/);
  assert.doesNotMatch(element.innerHTML, /<se-title|<se-text/);
  const markup = element.innerHTML;
  element.connectedCallback();
  assert.equal(element.innerHTML, markup);
}
assert.equal(render({variant: '__proto__'}).innerHTML, render({}).innerHTML);
assert.match(render({title: '<Hello>', text: 'A & B'}).innerHTML, /&lt;Hello&gt;.*A &amp; B/);
const first = render({variant: 'translation-2'}).innerHTML;
const second = render({variant: 'translation-2'}).innerHTML;
const id = first.match(/id="([^"]+)"/)[1];
assert.ok(first.includes('url(#' + id + ')'));
assert.ok(!second.includes(id));
console.log('All 21 illustration variants, safe fallback, text escaping, and unique gradients passed.');

const labels = {"analytics":"Results","schedule":"Schedule","files-2":"Files","folders-2":"Projects","team-2":"Team","invoices":"Invoice","questionnaires":"Your feedback","schedule-2":"Schedule","timeline":"Timeline"};
for (const [variant, label] of Object.entries(labels)) {
  assert.ok(render({variant}).innerHTML.includes('>' + label + '</text>'));
  assert.ok(render({variant, 'illustration-label': '<Custom> & $&'}).innerHTML.includes('&lt;Custom&gt; &amp; $&amp;</text>'));
  assert.ok(!render({variant, 'illustration-label': ''}).innerHTML.includes('>' + label + '</text>'));
}
assert.match(render({variant: 'inbox', 'illustration-label': 'Inbox'}).innerHTML, />Inbox<\/text>/);
assert.doesNotMatch(render({variant:'inbox'}).innerHTML, />Inbox<\/text>/);
assert.match(render({variant:'questionnaires','illustration-label':'Feedback'}).innerHTML, />3<\/text>/);
assert.deepEqual(Object.keys(emptyIllustrations).sort(), ["analytics","files","files-2","folders","folders-2","inbox","inventory","invoices","payments","questionnaires","schedule","schedule-2","search","start","team","team-2","team-3","timeline","translation","translation-2","workflow"]);

assert.deepEqual(Object.keys(emptyIllustrations), Object.keys(emptyIllustrations).sort());
assert.equal(render({}).innerHTML, render({variant:'start'}).innerHTML);

assert.match(render({title: 'No projects yet'}).innerHTML, /class="se-empty-state se-empty-illustration" title=""/, 'Suppress inherited native tooltip while keeping the title attribute as component input');
