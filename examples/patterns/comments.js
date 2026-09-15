function commentDemo(root = document.currentScript.previousElementSibling) {
  root.addEventListener('reply', event => {
    const comment = event.target;
    if (comment.querySelector(':scope > article > form')) return;
    const form = document.createElement('form');
    form.className = 'comment-composer';
    form.innerHTML = '<se-input type="textarea" label="Your reply" placeholder="Add to the conversation…"></se-input><div><se-button type="submit" variant="brand" text="Post reply"></se-button><se-button data-cancel variant="ghost" text="Cancel"></se-button></div>';
    comment.replies.before(form);
    form.querySelector('textarea').focus();
    form.querySelector('[data-cancel]').onclick = () => { form.remove(); comment.querySelector('.se-comment__reply').focus(); };
    bindComposer(form, comment.replies, true);
  });
  function bindComposer(form, target, isReply = false) {
    form.onsubmit = event => {
      event.preventDefault();
      const input = form.querySelector('textarea');
      if (!input.value.trim()) { input.setCustomValidity('Write a comment first.'); input.reportValidity(); input.oninput = () => input.setCustomValidity(''); return; }
      const comment = document.createElement('se-comment');
      comment.setAttribute('author', 'You'); comment.setAttribute('initials', 'YO'); comment.setAttribute('timestamp', 'Just now');
      const text = document.createElement('p'); text.textContent = input.value.trim(); comment.append(text, document.createElement('se-reactions'));
      target.append(comment);
      if (isReply) form.remove(); else input.value = '';
      comment.tabIndex = -1; comment.focus();
      root.querySelector('[data-demo-status]').textContent = `${isReply ? 'Reply' : 'Comment'} posted for this demo.`;
    };
  }
  const composer = root.querySelector('[data-new-comment]');
  if (composer) bindComposer(composer, root.querySelector('[data-blog-comments]'));
  root.querySelector('[data-resolve]')?.addEventListener('click', event => {
    const button = event.currentTarget;
    const resolved = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(resolved)); button.textContent = resolved ? 'Reopen discussion' : 'Resolve discussion';
    root.querySelector('[data-demo-status]').textContent = resolved ? 'Discussion resolved for this demo.' : 'Discussion reopened.';
  });
}
const styles = `<style>.comment-demo{max-width:800px;margin:auto;padding:16px;color:var(--se-text);font-family:var(--se-font)}.comment-list{display:grid;gap:28px;margin-top:28px}.comment-composer{display:grid;gap:12px;margin:16px 0 16px 40px}.comment-composer>div{display:flex;gap:8px}.comment-composer se-button{width:auto}.comment-video{height:160px;background:var(--se-surface-soft);border-radius:var(--se-radius);display:grid;place-content:center;text-align:center;gap:8px;margin-bottom:24px}.comment-document{padding:24px;border-left:3px solid var(--se-primary);background:var(--se-surface-soft);line-height:1.7;margin:20px 0}.comment-note{font-size:12px;color:var(--se-muted);margin-top:24px}.blog-article{padding-bottom:28px;border-bottom:1px solid var(--se-border);margin-bottom:28px}.blog-meta{margin:16px 0 28px}.blog-discussion>form{margin:20px 0}.blog-discussion>form>div{justify-content:flex-end}button[data-resolve]{margin-top:20px}@media(max-width:480px){.comment-demo{padding:20px 16px}.comment-composer{margin-left:0}}</style>`;
const conversation = `<se-comment author="Maya Chen" initials="MC" timestamp="2 hours ago"><p>The pacing here is really clear. Could we show one more example of how this works on a smaller screen?</p><se-reactions options='[{"emoji":"👍","count":12},{"emoji":"❤️","count":3,"selected":true}]'></se-reactions><se-comment author="Alex Morgan" initials="AM" timestamp="1 hour ago"><p>Good idea — I’ll add a mobile walkthrough to the next update.</p><se-reactions options='[{"emoji":"🎉","count":4}]'></se-reactions><se-comment author="Maya Chen" initials="MC" timestamp="35 minutes ago"><p>Perfect, thank you! That would help our team.</p><se-reactions></se-reactions></se-comment></se-comment></se-comment>`;
export const commentsPattern = { tag: 'comments', icon: 'messages-square', initialize: preview => commentDemo(preview.querySelector('.comment-demo')), description: 'Comment discussions with nested replies and emoji reactions. Replies and resolution are local demo state.', examples: [
 { title: 'Blog discussion', description: 'A Markdown article with a working comment form, threaded replies, and reactions.', markup: `${styles}<div class="comment-demo"><article class="blog-article"><se-badge text="FIELD NOTES" tone="brand"></se-badge><div class="blog-meta"><se-profile name="Alex Morgan" initials="AM" subtitle="September 15 · 3 min read" tone="gray"></se-profile></div><se-markdown source="${`# A little less noise, a lot more focus

The best workspace is not the one with the most controls. It is the one that lets you find your next step without thinking about the interface.

## Start with the conversation

We tried a simple change: keep the main navigation quiet, and bring the details closer to the work. Projects have their own context. Discussions stay attached to the thing they are about.

> A reply should feel connected to a person, not lost in a stream.

Three details made the biggest difference:

- **Clear hierarchy:** you can see which comment a reply belongs to.
- **Small acknowledgements:** a reaction can say thank you without another message.
- **Room to read:** comfortable spacing matters more than decoration.

What would you change in your team's workspace? Tell us below.`.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"></se-markdown></article><section class="blog-discussion"><se-title level="section">Join the discussion</se-title><se-text muted>Questions, ideas, and a few good reactions.</se-text><form class="comment-composer" data-new-comment><se-input type="textarea" label="Your comment" placeholder="What do you think?"></se-input><div><se-button type="submit" variant="brand" text="Post comment"></se-button></div></form><div class="comment-list" data-blog-comments>${conversation.replace('The pacing here is really clear.', 'The point about keeping discussions close to the work really resonates.').replace('a mobile walkthrough', 'a mobile example')}<se-comment author="Sam Rivera" initials="SR" timestamp="20 minutes ago"><p>Reactions are underrated. Sometimes a simple thank-you is all a conversation needs.</p><se-reactions options='[{"emoji":"❤️","count":5}]'></se-reactions></se-comment></div><p class="comment-note" role="status" data-demo-status>Interactive example · comments stay in this preview</p></section></div><script>(${commentDemo.toString()})();</script>` },

 { title: 'Video comments', description: 'An open discussion beneath content, with a clear reply hierarchy.', markup: `${styles}<div class="comment-demo"><div class="comment-video"><se-icon name="play"></se-icon><strong>Designing a calmer workspace</strong><se-text muted small>Video preview · 08:42</se-text></div><se-title level="section">Discussion</se-title><se-text muted>Share an idea or join a conversation.</se-text><div class="comment-list">${conversation}<se-comment author="Sam Rivera" initials="SR" timestamp="20 minutes ago"><p>The before-and-after comparison is so useful. Saved this for our next design review.</p><se-reactions options='[{"emoji":"👍","count":2}]'></se-reactions></se-comment></div><p class="comment-note" role="status" data-demo-status>Interactive proposal · replies stay in this preview</p></div><script>(${commentDemo.toString()})();</script>` },
 { title: 'Document discussion', description: 'An anchored discussion beside a quoted passage, with a resolve action.', markup: `${styles}<div class="comment-demo"><se-title level="page">Launch plan</se-title><se-text muted>Discussion on paragraph 3</se-text><blockquote class="comment-document">“We’ll introduce the new workspace experience to all teams next month.”</blockquote><se-card><se-comment author="Robin Ellis" initials="RE" timestamp="Today, 10:24"><p>Should we start with a smaller group first? It would give us time to check accessibility feedback.</p><se-reactions options='[{"emoji":"👍","count":3},{"emoji":"👀","count":1}]'></se-reactions><se-comment author="Alex Morgan" initials="AM" timestamp="Today, 10:32"><p>Agreed. Let’s make the first week an opt-in pilot.</p><se-reactions></se-reactions></se-comment></se-comment><button class="se-button se-button--secondary" type="button" data-resolve aria-pressed="false">Resolve discussion</button></se-card><p class="comment-note" role="status" data-demo-status>Interactive proposal · no document is modified</p></div><script>(${commentDemo.toString()})();</script>` }
] };
