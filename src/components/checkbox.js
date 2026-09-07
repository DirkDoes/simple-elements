import { define } from '../helpers.js';
import { connectChoice } from '../choice.js';

class SeCheckbox extends HTMLElement {
  connectedCallback() {
    connectChoice(this, 'checkbox', 'checkbox');
  }
  get checked() { return this.querySelector('input')?.checked || false; }
  set checked(value) { if (this.querySelector('input')) this.querySelector('input').checked = Boolean(value); }
}

define('se-checkbox', SeCheckbox);
