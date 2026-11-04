# Media Player

`se-media-player` is a visual wrapper around YouTube's embedded player, not a replacement video engine. It provides a themed border and an optional caption. It has no timeline, custom playback controls, autoplay, or YouTube API dependency.

- `video`: YouTube video ID or a full YouTube watch, youtu.be, embed, Shorts, or live URL. Only the video ID is retained; timestamps and other URL parameters are ignored.
- `label`: optional heading below the player, also used as the accessible iframe title. This is not a native title attribute on the component.
- `subtitle`: optional secondary text. Can be used without a label.

```html
<se-media-player video="M7lc1UVf-VE"
  label="Match recording" subtitle="Round two · Medusa vs. Alice"></se-media-player>

<!-- Optional application-owned timeline, outside the player -->
<se-timeline duration="842" value="138"></se-timeline>
```

The timeline is independent: it is not synchronized with YouTube. Playback and seeking remain YouTube's controls. Updating label/subtitle preserves the iframe and its playback state; changing the video replaces it. Empty/invalid video values show a placeholder instead of loading an arbitrary URL.

The frame fills its parent, uses 16:9 when space allows, and keeps a minimum 200px player height/width in accordance with [YouTube's embed guidance](https://developers.google.com/youtube/player_parameters). Place it in a container at least 200px wide. Flat/Clean use theme-rounded corners; Edge is square. The embedded YouTube UI retains its own styling.

Uses a lazy-loaded youtube-nocookie.com embed with fullscreen support and strict-origin-when-cross-origin referrer policy. Test over HTTP(S), not file URLs. Video availability, embed permissions, and network restrictions are controlled by YouTube. No metadata is fetched automatically; captions are application supplied.
