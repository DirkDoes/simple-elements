import { define } from '../helpers.js';

class SeMediaPlayer extends HTMLElement {
  static observedAttributes = ['video', 'label', 'subtitle'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  videoId() {
    const value = (this.getAttribute('video') || '').trim();
    const valid = id => /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : '';
    if (valid(value)) return value;
    try {
      const url = new URL(value);
      if (!['https:', 'http:'].includes(url.protocol)) return '';
      if (url.hostname === 'youtu.be') return valid(url.pathname.slice(1));
      if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(url.hostname)) return '';
      if (url.pathname === '/watch') return valid(url.searchParams.get('v'));
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)\/?$/);
      return valid(match?.[1]);
    } catch { return ''; }
  }
  render() {
    if (!this._viewport) {
      this.innerHTML = '<figure class="se-media-player"><div class="se-media-player__viewport"></div><figcaption class="se-media-player__caption"><div class="se-media-player__label"></div><div class="se-media-player__subtitle"></div></figcaption></figure>';
      this._viewport = this.querySelector('.se-media-player__viewport');
    }
    const id = this.videoId();
    const label = this.getAttribute('label') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    if (this._videoId !== id) {
      this._videoId = id;
      if (id) {
        const frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?playsinline=1';
        frame.loading = 'lazy';
        frame.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        this._viewport.replaceChildren(frame);
      } else {
        const placeholder = document.createElement('span');
        placeholder.className = 'se-media-player__placeholder';
        this._viewport.replaceChildren(placeholder);
      }
    }
    const frame = this._viewport.querySelector('iframe');
    if (frame) frame.title = label || 'YouTube video player';
    else this._viewport.firstElementChild.textContent = this.getAttribute('video') ? 'Enter a valid YouTube URL or video ID.' : 'Add a YouTube video';
    const caption = this.querySelector('figcaption');
    caption.hidden = !label && !subtitle;
    for (const [part, value] of [['label', label], ['subtitle', subtitle]]) {
      const element = this.querySelector('.se-media-player__' + part);
      element.textContent = value;
      element.hidden = !value;
    }
  }
}
define('se-media-player', SeMediaPlayer);
