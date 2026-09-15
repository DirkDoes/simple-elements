# Comments pattern

Patterns → Comments proposes video comments and document discussions using `se-comment`, `se-reactions`, profiles, and existing input/button components. Try Reply, emoji reactions, and the document resolve action. Nested indentation marks parent-child relationships; mobile layouts reduce indentation. Resolution and replies are local demo state, not server features.

The Blog discussion example uses `se-markdown` for the article and includes a top-level comment form, nested replies, and toggleable reactions. Posting and reactions update this preview only; reload resets the demo.

Open [the live Comments pattern](https://dirkdoes.github.io/simple-elements/examples/#comments) for inline examples that resize with the page, just like the Forms pattern. Component references: [Comment](comment.md) and [Reactions](reactions.md). To run the interaction checks, serve the repository over HTTP and open `test/comments.html`.
