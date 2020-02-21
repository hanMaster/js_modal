const fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 20,
    img:
      'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348',
  },
  {
    id: 2,
    title: 'Апельсины',
    price: 30,
    img:
      'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg',
  },
  {
    id: 3,
    title: 'Манго',
    price: 40,
    img:
      'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg',
  },
];

const showPrice = id => {
  console.log(id);
};

const generateGoodsList = () => {
  const goods = document.getElementById('goods');
  fruits.forEach(fruit => {
    const card = `
    <div class="card">
      <img
        src="${fruit.img}"
        class="card-img-top"
        alt="${fruit.title}"
      />
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <div id="buttons${fruit.id}" ></div>
      </div>
    </div>
    `;
    goods.insertAdjacentHTML('beforeend', card);
    const buttons = goods.querySelector(`#buttons${fruit.id}`);
    const btn = document.createElement('a');
    btn.innerText = 'Посмотреть цену';
    btn.classList.add('btn');
    btn.classList.add('btn-primary');
    btn.onclick = () => showPrice(fruit.id);
    buttons.appendChild(btn);
    const btnDanger = document.createElement('a');
    btnDanger.innerText = 'Удалить';
    btnDanger.classList.add('btn');
    btnDanger.classList.add('btn-danger');
    btnDanger.onclick = () => showPrice('delete', fruit.id);
    buttons.appendChild(btnDanger);
  });
};

window.onload = () => {
  const modal = $.modal({
    title: 'hello modal',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
      'Ab deserunt eius enim explicabo fugit porro praesentium quibusdam quidem rem soluta?',
    width: '400px',
    closable: true,
    footerButtons: [
      {
        text: 'Ok',
        type: 'primary',
        handler: () => {
          console.log('ok');
          modal.close();
        },
      },
      {
        text: 'Cancel',
        type: 'secondary',
        handler: () => {
          console.log('cancel');
          modal.close();
        },
      },
    ],
  });

  modal.onOpen(() => {
    console.log('Open modal!!!');
  });

  modal.onClose(() => {
    console.log('Closing modal!!!');
  });

  //  generate goodsList
  generateGoodsList();
};
