import { define, emit, escapeHtml } from '../helpers.js';

class SeFileUpload extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.innerHTML = `<div class="se-upload"><label class="se-label">${escapeHtml(this.getAttribute('label') || 'Dropzone')}</label><label class="se-upload__zone"><span><span class="se-upload__icon"><se-icon name="upload"></se-icon></span><strong>${escapeHtml(this.getAttribute('prompt') || 'Upload a file')}<span class="se-upload__or">or drag and drop</span></strong><small>${escapeHtml(this.getAttribute('hint') || 'PNG, JPG, PDF up to 10MB')}</small></span><input type="file" name="${escapeHtml(this.getAttribute('name') || 'files')}"${this.hasAttribute('multiple') ? ' multiple' : ''}${this.getAttribute('accept') ? ` accept="${escapeHtml(this.getAttribute('accept'))}"` : ''}></label></div>`;
    const root = this.querySelector('.se-upload');
    const zone = this.querySelector('.se-upload__zone');
    const input = this.querySelector('input');
    ['dragenter', 'dragover'].forEach((name) => zone.addEventListener(name, (event) => { event.preventDefault(); root.classList.add('se-upload--drag'); this.querySelector('.se-upload__zone strong').textContent = 'Drop file here'; }));
    ['dragleave', 'drop'].forEach((name) => zone.addEventListener(name, (event) => { event.preventDefault(); root.classList.remove('se-upload--drag'); this.querySelector('.se-upload__zone strong').innerHTML = 'Upload a file<span class="se-upload__or"> or drag and drop</span>'; }));
    zone.addEventListener('drop', (event) => emit(this, 'files', { files: [...event.dataTransfer.files] }));
    input.addEventListener('change', () => emit(this, 'files', { files: [...input.files] }));
  }
}

define('se-file-upload', SeFileUpload);
