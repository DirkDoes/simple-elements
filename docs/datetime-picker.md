# Date and time picker

```html
<se-datetime-picker label="Publish at" name="post[published_at]" value="2026-09-06T14:30"></se-datetime-picker>
```

Uses a native `input[type="datetime-local"]`, so it submits normally in HTML and Ruby on Rails forms. Values intentionally contain no timezone; convert them in the application when timezone meaning matters.
