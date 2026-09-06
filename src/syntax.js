import { escapeHtml } from './helpers.js';

const patterns = {
  json: /(?<property>"(?:\\.|[^"\\])*"(?=\s*:))|(?<string>"(?:\\.|[^"\\])*")|(?<number>-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b)|(?<keyword>\b(?:true|false|null)\b)/gi,
  javascript: /(?<comment>\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(?<string>`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?<number>\b\d+(?:\.\d+)?\b)|(?<keyword>\b(?:async|await|break|case|catch|class|const|continue|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|let|new|of|return|static|switch|this|throw|try|typeof|var|void|while|yield)\b)|(?<literal>\b(?:true|false|null|undefined)\b)/g,
  python: /(?<comment>#[^\n]*)|(?<string>'''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?<number>\b\d+(?:\.\d+)?\b)|(?<keyword>\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b)|(?<literal>\b(?:True|False|None)\b)/g,
  html: /(?<comment><!--[\s\S]*?-->)|(?<tag><\/?[A-Za-z][^>]*>)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
  css: /(?<comment>\/\*[\s\S]*?\*\/)|(?<string>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(?<property>--?[\w-]+(?=\s*:))|(?<number>\b\d+(?:\.\d+)?(?:px|rem|em|%|s|vh|vw)?\b)|(?<keyword>!important|@[\w-]+)/gi,
  markdown: /(?<comment>^#{1,6}(?=\s)|^>|^\s*[-*+]\s|^\s*\d+\.\s)|(?<string>`{1,3}[^`]*`{1,3})|(?<keyword>\*\*|__|\*|_|~~)|(?<tag>!?\[[^\]]*\]\([^)]*\))/gm,
};

const aliases = { js: 'javascript', py: 'python', md: 'markdown', htm: 'html' };

export const highlightCode = (source = '', language = '') => {
  const pattern = patterns[aliases[language] || language];
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
