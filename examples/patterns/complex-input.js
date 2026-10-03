const example = `<div style="display:grid;gap:1.25rem;max-width:44rem">
  <se-text muted>Type @ in a field. Use arrow keys to choose; Tab or Enter inserts.</se-text>
  <se-input label="Assignee" placeholder="Mention a teammate with @"></se-input>
  <se-input type="textarea" label="Notes" placeholder="Write a note with @" autosize></se-input>
  <se-code-editor label="Script" language="javascript" value="// Type @ to complete a name"></se-code-editor>
  <se-wysiwyg label="Message" placeholder="Type @ to mention someone"></se-wysiwyg>
</div>
<script>
  {
  const suggestions = [
    { text: 'alex_morgan', description: 'Product design', icon: 'user' },
    { text: 'sam_rivera', description: 'Engineering', icon: 'code' },
    { text: 'taylor_chen', description: 'Research', icon: 'search' },
  ];
  document.currentScript.previousElementSibling.querySelectorAll('se-input, se-code-editor, se-wysiwyg').forEach((field) => {
    field.addEventListener('input', (event) => {
      const editable = event.target;
      const beforeCaret = editable.isContentEditable
        ? window.getSelection()?.anchorNode?.textContent?.slice(0, window.getSelection()?.anchorOffset) || ''
        : editable.value.slice(0, editable.selectionStart);
      const mention = beforeCaret.match(/@([a-z0-9_]*)$/i);
      const matches = mention ? suggestions.filter(({ text }) => text.startsWith(mention[1].toLowerCase())) : [];
      if (matches.length) field.setAttribute('completions', JSON.stringify(matches));
      else field.removeAttribute('completions');
    });
  });
  }
</script>`;

const codeExample = `<div style="display:grid;gap:1.25rem;max-width:44rem">
  <se-text muted>Type a function or variable name after = or on a new line. The first letter starts suggestions.</se-text>
  <se-code-editor label="JavaScript" language="javascript" value="const result = " wrap></se-code-editor>
</div>
<script>
  {
  const members = [
    { text: 'formatDate()', description: 'Function · format a date', icon: 'code' },
    { text: 'calculateTotal()', description: 'Function · sum an order', icon: 'code' },
    { text: 'currentUser', description: 'Variable · signed-in user', icon: 'user' },
    { text: 'retryLimit', description: 'Variable · maximum attempts', icon: 'type' },
  ];
  const editor = document.currentScript.previousElementSibling.querySelector('se-code-editor');
  editor.addEventListener('input', (event) => {
    const input = event.target;
    const beforeCaret = input.value.slice(0, input.selectionStart);
    const context = beforeCaret.match(/(?:^|[\\s.=,(])([a-z_]\\w*)$/i);
    const matches = context ? members.filter(({ text }) => text.toLowerCase().startsWith(context[1].toLowerCase())) : [];
    if (matches.length) editor.setAttribute('completions', JSON.stringify(matches));
    else editor.removeAttribute('completions');
  });
  }
</script>`;

export const complexInputPattern = {
  tag: 'complex-input', icon: 'text-input',
  description: 'Application-supplied completions for text, multiline text, code, and rich text.',
  examples: [
    { title: 'Suggested text', description: 'The application supplies and clears completion options as the user types.', markup: example },
    { title: 'Code members', description: 'Functions and variables appear at a new token, with no special trigger character.', markup: codeExample },
  ],
};
