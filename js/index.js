window.onload = () => {
  const modal = $.modal({
    title: 'hello modal',
    content: 'bla bla',
    width: '200px',
    closable: true
  });
  const openBtn = document.querySelector('#showModal');
  openBtn.addEventListener('click', ()=>{modal.open()});
};

