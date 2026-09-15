# Reactions

`se-reactions` takes `options` as JSON or an array property: `{ emoji, count, selected }`. Counts include the current user's reaction when selected. Clicking toggles that user's reaction locally and emits `reactionchange` with `{ emoji, count, selected }`. Applications persist the change and can replace `options` with authoritative server state. The picker offers six common emoji plus any supplied emoji; it is not a full emoji search. The add-reaction trigger uses the bundled Lucide plus icon. Escape closes the picker. Selected reactions have an accessible pressed state and updates are announced.

```html
<se-reactions options='[{"emoji":"👍","count":4,"selected":true}]'></se-reactions>
```
