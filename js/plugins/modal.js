const renderFooter = (footerButtons = []) => {
  const footer = document.createElement('div');
  footer.classList.add('modal-footer');
  footerButtons.map(button => {
    const btn = document.createElement('button');
    btn.innerText = button.text;
    btn.classList.add('btn');
    btn.classList.add(`btn-${button.type}`);
    btn.onclick = button.handler;
    footer.appendChild(btn);
  });
  return footer;
};

function _createModal({ title, width, content, closable, footerButtons }) {
  const MODAL_WIDTH = '400px';
  let html = `
    <div class="modal-overlay" data-close="1">
      <div id="mw" class="modal-window" style="width: ${width || MODAL_WIDTH}">
      <div class="modal-band"></div>
        <div class="modal-header">
            <span class="modal-title">
                ${title || 'Modal title'}
            </span>
            ${
              closable
                ? `<span class="modal-close" data-close="1">&times;</span>`
                : ''
            }
        </div>
        <div id="mb" class="modal-body">
            ${content || ''}
        </div>
      </div>
    </div>
  `;

  const modal = document.createElement('div');
  modal.classList.add('hmodal');
  modal.insertAdjacentHTML('afterbegin', html);
  const footer = renderFooter(footerButtons);

  document.body.appendChild(modal);
  const body = modal.querySelector('#mb');
  body.parentNode.insertBefore(footer, body.nextSibling);

  return modal;
}

/*
 *  title:string
 * closable: boolean
 * content: string
 * width: string
 * destroy(): void | remove listeners | cut from DOM
 * close window on cross and blur
 * ---------------
 * setContent(html: string): void | PUBLIC
 * onClose(): void called after close window
 * onOpen(): void called after open window
 * beforeClose(): boolean | true => allow close | false => reject close
 * ----------
 * animate.css
 * */
$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  let closing = false;
  let destroyed = false;

  const modal$ = _createModal(options);

  const fnClose = () => {
    if (!beforeClose()) return;
    closing = true;
    modal$.classList.remove('open');
    modal$.classList.add('hiding');
    setTimeout(() => {
      modal$.classList.remove('hiding');
      closing = false;
    }, ANIMATION_SPEED);
    modal.onClose();
  };

  const modal = {
    open() {
      if (destroyed) return;
      !closing && modal$.classList.add('open');
      modal.onOpen();
    },
    close() {
      fnClose();
    },
    setContent(content) {
      const body = document.getElementById('mb');
      body.innerHTML = content;
    },
    onClose(func) {
      modal.onClose = func;
    },
    onOpen(func) {
      modal.onOpen = func;
    },
  };

  const beforeClose = () => {
    const permit = Math.random() > 0.5;
    console.log('Permit', permit);
    return permit;
  };

  const closeListener = e => {
    if (e.target.dataset.close) {
      fnClose();
    }
  };

  document
    .querySelector('[data-close]')
    .addEventListener('click', closeListener);

  return {
    ...modal,
    destroy() {
      console.log('destroy modal in progress');
      document
        .querySelector('[data-close]')
        .removeEventListener('click', closeListener);
      document.body.removeChild(modal$);
      destroyed = true;
    },
  };
};
