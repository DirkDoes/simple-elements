# Phone input

```html
<se-phone-input label="Phone Number" name="phone" country="NL"></se-phone-input>
```

The searchable picker contains all 245 countries and calling territories and defaults to the Netherlands. Use the two-letter `country` attribute when calling codes are shared, or `code="+31"` as a shortcut. The native telephone input submits under `name`; country changes emit `countrychange` with `country`, `countryCode`, and `code`.
