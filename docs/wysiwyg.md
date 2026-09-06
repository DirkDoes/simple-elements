# WYSIWYG

```html
<se-wysiwyg label="Body" name="post[body]" placeholder="Write your post...">
  <p>Initial <strong>formatted</strong> content.</p>
</se-wysiwyg>
```

The editor supports bold, italic, underline, bulleted lists, and numbered lists. Its HTML is synchronized to a native hidden textarea, so it submits normally in HTML and Ruby on Rails forms. Read or assign the `value` property to access the HTML.
