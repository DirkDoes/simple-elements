# Navigation group

```html
<se-nav-group label="Projects" icon="folder" collapsed>
  <se-nav-item label="Northstar" icon="file" href="/northstar"></se-nav-item>
</se-nav-group>
```

An independent disclosure that can be nested in any container or another group. `variant="group"` (default) makes the heading a disclosure button. `variant="page"` separates a page heading (`href` link or application-handled button) from the disclosure chevron. Other attributes: `label`, `icon`, `subtext`, `active`, `collapsed`, `minimized`.

`collapsed` hides the group's content; it does not mean icon-only. Setting the attribute or property updates `aria-expanded`, `aria-controls`, `inert`, and hidden accessibility state. Collapsing a group containing focus returns focus to its disclosure. Child nodes and their listeners are preserved. Collapsing an ancestor does not change a nested group's state.

Minimized context only changes the heading presentation; it does not resize a parent, change its context, or erase the group's disclosure state. The heading keeps an accessible name and an icon tooltip. An active page group matches the navigation item's styling. A closed group containing an active destination is highlighted without claiming to be the current page.
