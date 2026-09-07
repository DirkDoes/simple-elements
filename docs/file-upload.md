# File upload

```html
<se-file-upload name="documents" multiple accept=".pdf,.png"></se-file-upload>
```

Attributes: `label`, `name`, `prompt`, `subprompt`, `hint`, `accept`, and `multiple`. `subprompt` defaults to `or drag and drop`. Picking or dropping files emits `files`; access the selected `File` objects through `event.detail.files`.
