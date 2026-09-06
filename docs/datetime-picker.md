# Date and time picker

```html
<se-datetime-picker label="Publish at" name="post[published_at]" value="2026-09-06T14:30" variant="seperated"></se-datetime-picker>
<se-datetime-picker label="Meeting" name="meeting[starts_at]" value="2026-09-08T10:15" variant="joined"></se-datetime-picker>
<se-datetime-picker label="Booking" name="booking[starts_at]" value="2026-09-14T16:45" variant="combined"></se-datetime-picker>
```

Composes the Simple Elements date and time pickers and submits one hidden `YYYY-MM-DDTHH:MM` value normally in HTML and Ruby on Rails forms. Values intentionally contain no timezone; convert them in the application when timezone meaning matters.

The `seperated` layout displays Date and Time labels. `variant="joined"` attaches both controls, hides their inner labels, and opens time selection after a date is chosen. `variant="combined"` presents one field: selecting a date immediately advances to time selection, and the calendar/clock buttons animate between both steps. Finish the time step with Done.

Calendar headings can be clicked to jump directly to another month or year.
