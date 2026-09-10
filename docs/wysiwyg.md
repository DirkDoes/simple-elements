# WYSIWYG

```html
<se-wysiwyg label="Body" name="post[body]" placeholder="Write your post...">
  <p>Initial <strong>formatted</strong> content.</p>
</se-wysiwyg>
```

The `format` attribute accepts `markdown` (the default), `html`, or `both`. Fixed formats hide the format selector; `both` adds the compact existing select control while the source view is open and starts on Markdown. The code/type button switches between synchronized raw and styled views. Source text uses format-aware syntax colors without line numbers. The editor supports bold, italic, underline, bulleted lists, and numbered lists. Markdown headings and emphasis are converted while typing or pasting. Its HTML is synchronized to a native hidden textarea, so it submits normally in HTML and Ruby on Rails forms. Read or assign the `value` property to access the HTML.
