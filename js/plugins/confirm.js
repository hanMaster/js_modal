const renderConfirmFooter = (footerButtons = []) => {
  const footer = document.createElement('div');
  footer.classList.add('modal-footer');
  const okBtn = document.createElement('a');
  okBtn.setAttribute('id', 'confirm_ok');
  okBtn.innerText = 'Да';
  okBtn.classList.add('btn');
  okBtn.classList.add('btn-primary');
  footer.appendChild(okBtn);

  const cancelBtn = document.createElement('a');
  cancelBtn.setAttribute('id', 'confirm_cancel');
  cancelBtn.innerText = 'Нет';
  cancelBtn.classList.add('btn');
  cancelBtn.classList.add('btn-secondary');
  footer.appendChild(cancelBtn);

  return footer;
};

function _createConfirm({ title, message }) {
  const MODAL_WIDTH = '400px';
  let html = `
    <div class="modal-overlay" data-confirmClose="1">
      <div id="cw" class="modal-window" style="width: ${MODAL_WIDTH}">
      <div class="modal-band"></div>
        <div class="modal-header">
            <span id='ct' class="modal-title">
                ${title || 'Modal title'}
            </span>
        </div>
        <div id="cb" class="modal-body">
            ${message}
        </div>
      </div>
    </div>
  `;

  const confirm = document.createElement('div');
  confirm.classList.add('hmodal');
  confirm.insertAdjacentHTML('afterbegin', html);
  const footer = renderConfirmFooter();

  document.body.appendChild(confirm);
  const body = confirm.querySelector('#cb');
  body.parentNode.insertBefore(footer, body.nextSibling);

  return confirm;
}

$.confirm = function(options) {
  const ANIMATION_SPEED = 200;
  let closing = false;
  let destroyed = false;

  const confirm$ = _createConfirm(options);

  const fnConfirmClose = () => {
    if (!beforeClose()) return;
    closing = true;
    confirm$.classList.remove('open');
    confirm$.classList.add('hiding');
    setTimeout(() => {
      confirm$.classList.remove('hiding');
      closing = false;
    }, ANIMATION_SPEED);
    confirm.onClose();
  };

  const confirm = {
    open() {
      if (destroyed) return;
      !closing && confirm$.classList.add('open');
      return new Promise((resolve, reject) => {
        document.getElementById('confirm_ok')
          .addEventListener('click', () => {
            resolve(true);
            confirm.close();
          });
        document.getElementById('confirm_cancel')
          .addEventListener('click', () => {
            resolve(false);
            confirm.close();
          });
      });

    },
    close() {
      fnConfirmClose();
    },
    setTitle(title) {
      const body = document.getElementById('ct');
      body.innerHTML = title;
    },
    setContent(content) {
      const body = document.getElementById('cb');
      body.innerHTML = content;
    },
    onClose(func) {
      if (func) confirm.onClose = func;
    },
    onOpen(func) {
      if (func) confirm.onOpen = func;
    },
  };

  const beforeClose = () => {
    // const permit = Math.random() > 0.5;
    // console.log('Permit', permit);
    // return permit;
    return true;
  };

  return {
    ...confirm,
    destroy() {
      console.log('destroy modal in progress');
      document.body.removeChild(confirm$);
      destroyed = true;
    },
  };
};
