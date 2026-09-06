import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { highlightCode, renderMarkdown } from '../src/syntax.js';
import { calendarDays, dateValue, parseDate, parseTime, timeValue, wrapNumber } from '../src/calendar.js';

const components = (await readdir('src/components')).filter((file) => file.endsWith('.js'));
const examplePages = (await readdir('examples')).filter((file) => file.endsWith('.html'));
const entry = await readFile('src/index.js', 'utf8');

for (const file of components) {
  assert.match(entry, new RegExp(`components/${file.replace('.', '\\.')}`), `${file} is not exported`);
  await readFile(`docs/${file.replace('.js', '.md')}`, 'utf8');
  const check = spawnSync(process.execPath, ['--check', `src/components/${file}`], { encoding: 'utf8' });
  assert.equal(check.status, 0, check.stderr);
}

assert.equal(spawnSync(process.execPath, ['--check', 'src/index.js']).status, 0);
assert.equal(spawnSync(process.execPath, ['--check', 'dist/simple-elements.js']).status, 0);
const compiledCss = await readFile('dist/styles.css', 'utf8');
assert.match(compiledCss, /\.se-button/);
assert.match(compiledCss, /\[hidden\]/);
assert.doesNotMatch(compiledCss, /@import\s/);
const selectSource = await readFile('src/components/select.js', 'utf8');
assert.match(selectSource, /const trigger = multiple/);
assert.match(selectSource, /option\.icon/);
const iconSource = await readFile('src/components/icon.js', 'utf8');
assert.match(iconSource, /from 'lucide'/);
assert.doesNotMatch(iconSource, /<path|<circle|<rect/);
const phoneSource = await readFile('src/components/phone-input.js', 'utf8');
assert.equal((phoneSource.match(/[A-Z]{2}\|[^;`]+\|\d+/g) || []).length, 245, 'expected complete phone country data');
assert.equal(spawnSync(process.execPath, ['--check', 'examples/example.js']).status, 0);
assert.ok(components.length >= 34, 'expected the complete component set');
assert.equal(examplePages.length, 1, 'expected one example HTML page');
for (const file of examplePages) assert.match(await readFile(`examples/${file}`, 'utf8'), /data-demo=/);
const exampleScript = await readFile('examples/example.js', 'utf8');
assert.doesNotMatch(exampleScript, /const demos\s*=/, 'demo markup belongs in HTML');
const exampleHtml = await readFile('examples/index.html', 'utf8');
assert.equal((exampleHtml.match(/<section data-demo=/g) || []).length, 15, 'expected fifteen page-like sections');
assert.match(await readFile('src/components/code-editor.js', 'utf8'), /<textarea name=/, 'code editor must submit through a native textarea');
assert.match(await readFile('src/components/code-editor.js', 'utf8'), /hasAttribute\('readonly'\)/, 'code editor must support readonly');
assert.match(await readFile('src/components/wysiwyg.js', 'utf8'), /<textarea hidden name=/, 'WYSIWYG must submit through a native textarea');
assert.match(highlightCode('const ready = true;', 'javascript'), /se-token--keyword/);
assert.match(renderMarkdown('> Safe\n\n```json\n{"ready":true}\n```'), /<se-blockquote>Safe<\/se-blockquote>.*<se-code block language="json">/s);
assert.doesNotMatch(renderMarkdown('<script>alert(1)</script>'), /<script>/);
assert.equal(dateValue(parseDate('2026-09-06')), '2026-09-06');
assert.equal(parseDate('2026-02-30'), null);
assert.equal(calendarDays(2026, 8).length, 42);
assert.deepEqual(parseTime('09:30'), { hour: 9, minute: 30 });
assert.equal(parseTime('25:00'), null);
assert.equal(timeValue({ hour: 9, minute: 5 }), '09:05');
assert.equal(wrapNumber(24, 24), 0);
assert.equal(wrapNumber(-5, 60), 55);
assert.match(await readFile('src/components/table.js', 'utf8'), /--se-columns/);
assert.match(await readFile('src/components/datetime-picker.js', 'utf8'), /variant === 'single'/);
console.log(`Checked ${components.length} components and 15 example sections.`);
