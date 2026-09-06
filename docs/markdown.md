# Markdown

````html
<se-markdown>
# Heading

Text with **bold**, *italic*, and `inline code`.

> A blockquote

```js
const ready = true;
```
</se-markdown>
````

Supports headings, paragraphs, bold, italic, unordered lists, blockquotes, inline code, and fenced code. Input is escaped before rendering; arbitrary HTML is not executed. Set Markdown dynamically with the `source` property.
