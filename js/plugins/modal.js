function _createModal(options) {

  let html = `
    <div id="mo" class="modal-overlay">
      <div class="modal-window" style="width: ${options.width}">
        <div class="modal-header">
            <span class="modal-title">
                ${options.title}
            </span>`;

  if (options.closable) {
    html += `<span id="x" class="modal-close">&times;</span>`;
  }

  html +=
    `</div>
        <div class="modal-body">
            ${options.content}
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary">Ok</button>
            <button class="btn btn-secondary">Cancel</buttonclass>
        </div>
      </div>
    </div>
  `;

  const modal = document.createElement('div');
  modal.classList.add('hmodal');
  modal.insertAdjacentHTML('afterbegin', html);
  document.body.appendChild(modal);

  return modal

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
$.modal = function (options) {

  const ANIMATION_SPEED = 200;
  let closing = false;

  const modal$ = _createModal(options);

  const fnClose = () => {
    closing = true;
    modal$.classList.remove('open');
    modal$.classList.add('hiding');
    setTimeout(() => {
      modal$.classList.remove('hiding');
      closing = false;
    }, ANIMATION_SPEED);
  };

  document.querySelector('#x')
    .addEventListener('click', fnClose);

  document.querySelector('#mo')
    .addEventListener('click', fnClose);

  return {
    open() {
      !closing && modal$.classList.add('open')
    },
    close() {
      fnClose()
    },
    destroy() {
      document.querySelector('#mo').removeEventListener('click',fnClose);
      document.querySelector('#x').removeEventListener('click', fnClose);
    }
  }
};
