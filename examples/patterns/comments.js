const conversation = `<se-comment author="Maya Chen" tone="brand" initials="MC" timestamp="2 hours ago"><p>The pacing here is really clear. Could we show one more example of how this works on a smaller screen?</p><se-reactions data-se-region="reactions" options='[{"emoji":"👍","count":12},{"emoji":"❤️","count":3,"selected":true}]'></se-reactions><se-comment author="Alex Morgan" tone="success" initials="AM" timestamp="1 hour ago"><p>Good idea — I’ll add a mobile walkthrough to the next update.</p><se-reactions data-se-region="reactions" options='[{"emoji":"🎉","count":4}]'></se-reactions><se-comment author="Maya Chen" tone="brand" initials="MC" timestamp="35 minutes ago"><p>Perfect, thank you! That would help our team.</p><se-reactions data-se-region="reactions"></se-reactions></se-comment></se-comment></se-comment>`;
export const commentsPattern = { tag: 'comments', icon: 'messages-square', description: 'Comment discussions with nested replies and emoji reactions. Markup-only examples; reactions work within the component.', examples: [
 { title: 'Blog discussion', description: 'A Markdown article with threaded comments and component-native reactions.', markup: `<div class="comment-demo"><article class="blog-article"><se-badge text="FIELD NOTES" tone="brand"></se-badge><div class="blog-meta"><se-profile name="Alex Morgan" initials="AM" subtitle="September 15 · 3 min read" tone="gray"></se-profile></div><se-markdown source="${`# A little less noise, a lot more focus

The best workspace is not the one with the most controls. It is the one that lets you find your next step without thinking about the interface.

## Start with the conversation

We tried a simple change: keep the main navigation quiet, and bring the details closer to the work. Projects have their own context. Discussions stay attached to the thing they are about.

> A reply should feel connected to a person, not lost in a stream.

Three details made the biggest difference:

- **Clear hierarchy:** you can see which comment a reply belongs to.
- **Small acknowledgements:** a reaction can say thank you without another message.
- **Room to read:** comfortable spacing matters more than decoration.

What would you change in your team's workspace? Tell us below.`.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"></se-markdown></article><section class="blog-discussion"><se-title level="section">Join the discussion</se-title><se-text muted>Questions, ideas, and a few good reactions.</se-text><div class="comment-list">${conversation.replace('The pacing here is really clear.', 'The point about keeping discussions close to the work really resonates.').replace('a mobile walkthrough', 'a mobile example')}<se-comment author="Sam Rivera" tone="info" initials="SR" timestamp="20 minutes ago"><p>Reactions are underrated. Sometimes a simple thank-you is all a conversation needs.</p><se-reactions data-se-region="reactions" options='[{"emoji":"❤️","count":5}]'></se-reactions></se-comment></div><se-text muted small>Reactions work directly. Reply emits an event for your application to handle.</se-text></section></div>` },

 { title: 'Document discussion', description: 'An anchored discussion beside a quoted passage.', markup: `<div class="comment-demo"><se-title level="page">Launch plan</se-title><se-text muted>Discussion on paragraph 3</se-text><se-blockquote tone="brand">“We’ll introduce the new workspace experience to all teams next month.”</se-blockquote><se-card><se-comment author="Robin Ellis" tone="important" initials="RE" timestamp="Today, 10:24"><p>Should we start with a smaller group first? It would give us time to check accessibility feedback.</p><se-reactions data-se-region="reactions" options='[{"emoji":"👍","count":3},{"emoji":"👀","count":1}]'></se-reactions><se-comment author="Alex Morgan" tone="success" initials="AM" timestamp="Today, 10:32"><p>Agreed. Let’s make the first week an opt-in pilot.</p><se-reactions data-se-region="reactions"></se-reactions></se-comment></se-comment><se-button class="comment-resolve" variant="secondary" text="Resolve discussion"></se-button></se-card><se-text muted small>Reactions work directly. Reply emits an event for your application to handle.</se-text></div>` }
] };
