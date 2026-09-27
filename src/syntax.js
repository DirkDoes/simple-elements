import { escapeHtml } from './helpers.js';

const patterns = {
  json: /(?<property>"(?:\\.|[^"\\])*"(?=\s*:))|(?<string>"(?:\\.|[^"\\])*")|(?<number>-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b)|(?<keyword>\b(?:true|false|null)\b)/gi,
  javascript: /(?<comment>\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(?<string>`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?<number>\b\d+(?:\.\d+)?\b)|(?<keyword>\b(?:async|await|break|case|catch|class|const|continue|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|let|new|of|return|static|switch|this|throw|try|typeof|var|void|while|yield)\b)|(?<literal>\b(?:true|false|null|undefined)\b)/g,
  python: /(?<comment>#[^\n]*)|(?<string>'''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?<number>\b\d+(?:\.\d+)?\b)|(?<keyword>\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b)|(?<literal>\b(?:True|False|None)\b)/g,
  css: /(?<comment>\/\*[\s\S]*?\*\/)|(?<string>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?<property>--?[\w-]+(?=\s*:))|(?<number>\b\d+(?:\.\d+)?(?:px|rem|em|%|s|vh|vw)?\b)|(?<keyword>!important|@[\w-]+)/gi,
  markdown: /(?<comment>^#{1,6}(?=\s)|^>|^\s*[-*+]\s|^\s*\d+\.\s)|(?<string>`{1,3}[^`]*`{1,3})|(?<keyword>\*\*|__|\*|_|~~)|(?<tag>!?\[[^\]]*\]\([^)]*\))/gm,
};

const aliases = { js: 'javascript', py: 'python', md: 'markdown', htm: 'html' };

const highlightHtml = (source) => {
  let result = '';
  let cursor = 0;
  for (const match of source.matchAll(/<!--[\s\S]*?-->|<\/?[A-Za-z][^>]*>/g)) {
    result += escapeHtml(source.slice(cursor, match.index));
    if (match[0].startsWith('<!--')) result += `<span class="se-token--comment">${escapeHtml(match[0])}</span>`;
    else {
      const [, opening, name, attributes, closing] = match[0].match(/^(<\/?)([\w:-]+)([\s\S]*?)(\/?>)$/);
      result += `<span class="se-token--tag">${escapeHtml(opening + name)}</span>`;
      let attributeCursor = 0;
      for (const attribute of attributes.matchAll(/([\w:-]+)(\s*)(=)?(\s*)("[^"]*"|'[^']*'|[^\s]+)?/g)) {
        result += escapeHtml(attributes.slice(attributeCursor, attribute.index));
        result += `<span class="se-token--property">${escapeHtml(attribute[1])}</span>${escapeHtml(attribute[2])}`;
        if (attribute[3]) result += `<span class="se-token--operator">=</span>${escapeHtml(attribute[4])}<span class="se-token--string">${escapeHtml(attribute[5])}</span>`;
        attributeCursor = attribute.index + attribute[0].length;
      }
      result += `${escapeHtml(attributes.slice(attributeCursor))}<span class="se-token--tag">${escapeHtml(closing)}</span>`;
    }
    cursor = match.index + match[0].length;
  }
  return result + escapeHtml(source.slice(cursor));
};

export const highlightCode = (source = '', language = '', diff = false) => {
  if (diff || language === 'diff') return source.replaceAll('\r', '').split('\n').map(line => {
    const type = /^(?:diff |index |--- |\+\+\+ )/.test(line) ? 'meta' : line.startsWith('@@') ? 'hunk' : line.startsWith('+') ? 'added' : line.startsWith('-') ? 'removed' : 'context';
    const content = ['added', 'removed'].includes(type)
      ? `<span class="se-code-diff-sign">${escapeHtml(line[0])}<se-icon name="${type === 'added' ? 'plus' : 'minus'}" aria-hidden="true"></se-icon></span>${highlightCode(line.slice(1), language === 'diff' ? '' : language)}`
      : ['meta', 'hunk'].includes(type) ? escapeHtml(line) : highlightCode(line, language === 'diff' ? '' : language);
    return `<span class="se-code-diff-line se-code-diff-line--${type}">${content}</span>`;
  }).join('\n');
  const resolvedLanguage = aliases[language] || language;
  if (resolvedLanguage === 'html') return highlightHtml(source);
  const pattern = patterns[resolvedLanguage];
  if (!pattern) return escapeHtml(source);
  pattern.lastIndex = 0;
  let result = '';
  let cursor = 0;
  for (const match of source.matchAll(pattern)) {
    const type = Object.keys(match.groups || {}).find((name) => match.groups[name] !== undefined) || 'keyword';
    result += escapeHtml(source.slice(cursor, match.index));
    result += `<span class="se-token--${type}">${escapeHtml(match[0])}</span>`;
    cursor = match.index + match[0].length;
  }
  return result + escapeHtml(source.slice(cursor));
};

const inlineMarkdown = (source) => {
  const code = [];
  let html = escapeHtml(source).replace(/`([^`]+)`/g, (_, value) => `\u0000${code.push(value) - 1}\u0000`);
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html.replace(/\u0000(\d+)\u0000/g, (_, index) => `<se-code>${code[Number(index)]}</se-code>`);
};

export const renderMarkdown = (source = '') => {
  const lines = source.trim().replaceAll('\r', '').split('\n');
  const html = [];
  let paragraph = [];
  const flush = () => { if (paragraph.length) html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`); paragraph = []; };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      flush();
      const code = [];
      while (++index < lines.length && !/^```\s*$/.test(lines[index])) code.push(lines[index]);
      html.push(`<se-code block language="${escapeHtml(fence[1])}">${escapeHtml(code.join('\n'))}</se-code>`);
    } else if (/^#{1,6}\s/.test(line)) {
      flush();
      const level = line.match(/^#+/)[0].length;
      html.push(`<h${level}>${inlineMarkdown(line.slice(level).trim())}</h${level}>`);
    } else if (/^>\s?/.test(line)) {
      flush();
      const quote = [];
      do { quote.push(lines[index].replace(/^>\s?/, '')); index += 1; } while (index < lines.length && /^>\s?/.test(lines[index]));
      index -= 1;
      html.push(`<se-blockquote>${inlineMarkdown(quote.join(' '))}</se-blockquote>`);
    } else if (/^[-*+]\s/.test(line)) {
      flush();
      const items = [];
      do { items.push(`<li>${inlineMarkdown(lines[index].replace(/^[-*+]\s/, ''))}</li>`); index += 1; } while (index < lines.length && /^[-*+]\s/.test(lines[index]));
      index -= 1;
      html.push(`<ul>${items.join('')}</ul>`);
    } else if (!line.trim()) flush();
    else paragraph.push(line.trim());
  }
  flush();
  return html.join('');
};

// ponytail: bounded LCS for small reviews; large unmatched middles become one change block.
// Use a Myers/streaming implementation if detailed huge-file diffs become a product requirement.
export const compareLines = (before = '', after = '') => {
  const split = value => value === '' ? [] : String(value).replace(/\r\n?/g, '\n').split('\n');
  const a = split(before), b = split(after), rows = [], suffix = [];
  const add = (type, text) => rows.push({ type, text });
  let start = 0, endA = a.length, endB = b.length;
  while (start < endA && start < endB && a[start] === b[start]) add('context', a[start++]);
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    suffix.push({ type: 'context', text: a[--endA] }); --endB;
  }
  const old = a.slice(start, endA), next = b.slice(start, endB);
  if (old.length * next.length > 1000000) {
    old.forEach(text => add('removed', text)); next.forEach(text => add('added', text));
  } else {
    const lengths = Array.from({ length: old.length + 1 }, () => new Uint32Array(next.length + 1));
    for (let i = old.length - 1; i >= 0; i--) for (let j = next.length - 1; j >= 0; j--) {
      lengths[i][j] = old[i] === next[j] ? lengths[i + 1][j + 1] + 1 : Math.max(lengths[i + 1][j], lengths[i][j + 1]);
    }
    let i = 0, j = 0;
    while (i < old.length || j < next.length) {
      if (i < old.length && j < next.length && old[i] === next[j]) { add('context', old[i++]); j++; }
      else if (i < old.length && (j === next.length || lengths[i + 1][j] >= lengths[i][j + 1])) add('removed', old[i++]);
      else add('added', next[j++]);
    }
  }
  const aligned = rows.concat(suffix.reverse());
  let oldLine = 0, newLine = 0;
  return aligned.map(row => ({ ...row, oldLine: row.type === 'added' ? null : ++oldLine, newLine: row.type === 'removed' ? null : ++newLine }));
};
