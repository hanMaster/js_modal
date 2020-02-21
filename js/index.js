window.onload = () => {
  const modal = $.modal({
    title: 'hello modal',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab deserunt eius enim explicabo fugit porro praesentium quibusdam quidem rem soluta?',
    width: '400px',
    closable: true,
  });
  const openBtn = document.querySelector('#showModal');
  const setContentBtn = document.querySelector('#setContent');
  openBtn.addEventListener('click', () => {
    modal.open();
  });
  setContentBtn.addEventListener('click', () => {
    modal.setContent(`<p>Current time is ${new Date().toLocaleTimeString()}</p>`);
  });
};
