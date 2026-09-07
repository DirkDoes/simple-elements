# Input

```html
<se-input label="Email" name="email" type="email" required></se-input>
<se-input label="Biography" name="bio" type="textarea" hint="Keep it short."></se-input>
<se-input label="Username" error="Already taken."></se-input>
```

Supports native input types plus `type="textarea"`. Common types provide useful placeholders automatically. Email, password, telephone, URL, and search fields also default to matching icons; explicit `placeholder` and `icon` attributes override those defaults. The submitted `value` remains empty unless supplied.

Attributes: `label`, `name`, `type`, `value`, `placeholder`, `icon`, `hint`, `error`, `required`, `disabled`, and `fixed` for a non-resizable textarea. Read or set the element's `value` property.

Read the defaults for any type from the component itself:

```js
customElements.get('se-input').defaultsFor('email');
// { placeholder: 'you@example.com', icon: 'mail' }
```
