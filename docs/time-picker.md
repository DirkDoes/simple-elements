# Time picker

```html
<se-time-picker label="Start time" name="event[start_time]" value="09:30" step="900"></se-time-picker>
<se-time-picker label="Reminder" name="event[reminder_time]" value="23:55" step="300"></se-time-picker>
```

Opens the Simple Elements time selector and submits a hidden `HH:MM` value normally in HTML and Ruby on Rails forms. `step` controls the minute interval and is measured in seconds.

The hour and minute fields accept typing and respond to the mouse wheel and Up/Down keys. Hours wrap between `23` and `00`; minutes wrap between `59` and `00` using the configured step.

Supports `label`, `name`, `value`, `step`, `placeholder`, `required`, and `disabled`; `required` adds the required marker. The placeholder defaults to `Choose a time`.
