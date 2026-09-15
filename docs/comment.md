# Comment

`se-comment` accepts `author`, `initials`, `image` (overrides initials), and `timestamp`. Place trusted HTML inside it for the body, an optional `se-reactions` for reactions, and child `se-comment` elements for replies. It emits a bubbling `reply` event with `{ author }`; the event target identifies the comment. Applications own composing, storage, and permissions. The `replies` property exposes the container for appending replies after connection. Use textContent or sanitize untrusted user content before inserting it; do not interpolate raw user HTML.

```html
<se-comment author="Alex" initials="AM" timestamp="Just now">
  <p>Could we show a mobile example?</p>
  <se-reactions></se-reactions>
  <se-comment author="Sam"><p>Yes, good idea.</p></se-comment>
</se-comment>
```

Initial content is wrapped on the next task after connection so nested HTML can finish parsing. Append later replies through `comment.replies` after rendering. Attributes describe the initial render; create a new comment element when replacing its identity or content. Reply editors and document resolution controls belong to the application or pattern, not this component.
