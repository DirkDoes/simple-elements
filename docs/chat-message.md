# Chat message

```html
<se-chat-message mode="received" title="Assistant" profile timestamp="10:42">Here is a helpful response.</se-chat-message>
```

Renders sent and received HTML messages. `profile` adds the sender icon, `title` labels the message, and `timestamp` adds the time at the start or end with `timestamp-position="start"`.

Set `icon` or `initials` to customize the profile picture. When both are present, `initials` wins.
