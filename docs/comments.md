# Comments pattern

Patterns → Comments demonstrates blog and document discussions. The blog uses `se-markdown`; nested `se-comment` elements define reply hierarchy, and `se-reactions` provides emoji toggles and its picker.

The displayed HTML is exactly the preview markup. No additional demo JavaScript is attached. Reactions work as part of the component; Reply only emits the documented event. Posting, reply editors, and resolution require application code and are not simulated here. The document example includes a visual-only Resolve discussion button without a click handler. Showcase CSS provides page spacing only.

See [Comment](comment.md), [Reactions](reactions.md), and the [live examples](https://dirkdoes.github.io/simple-elements/examples/#comments). Serve the repository over HTTP and open `test/comments.html` for the checks.
