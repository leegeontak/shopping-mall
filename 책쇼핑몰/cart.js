const container = document.querySelector('.container');
const moduleContainer = document.querySelector('.module-container');
const goods = document.querySelector('.goods');
let span = document.querySelector('.cart span');
span.innerHTML = localStorage.length;
for (i = 0; i < localStorage.length; i++) {
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book-container');

  const imgdiv = document.createElement('div');
  imgdiv.classList.add('book-img');

  const img = document.createElement('img');

  const explain = document.createElement('div');
  explain.classList.add('explain');

  const bookName = document.createElement('h5');

  const summaryFrame = document.createElement('span');

  const shop = document.createElement('div');
  const priceFrame = document.createElement('div');
  const check = document.createElement('input');
  // const removeBtn = document.createElement('button');
  check.type = 'checkbox';

  shop.classList.add('shop');
  priceFrame.classList.add('price');

  imgdiv.append(img);
  explain.append(bookName, summaryFrame);
  shop.append(priceFrame);
  // removeBtn.innerHTML = '삭제하기';
  bookContainer.append(check, imgdiv, explain, shop);
  container.append(bookContainer);

  const cover = document.querySelectorAll('.book-img img');
  cover[i].setAttribute(
    'src',
    JSON.parse(localStorage.getItem(localStorage.key(i))).src
  );
  //각 책의 이미지는 각 localstorage의 객체의 src
  cover[i].setAttribute(
    'alt',
    JSON.parse(localStorage.getItem(localStorage.key(i))).name
  );
  //각 책의 alt 값은 각 localstorage의 객체의 이름
  const h5 = document.querySelectorAll('.explain h5');
  h5[i].innerText = JSON.parse(localStorage.getItem(localStorage.key(i))).name;

  const summary = document.querySelectorAll('.explain span');
  summary[i].innerText = JSON.parse(
    localStorage.getItem(localStorage.key(i))
  ).summary;
  //각 책의 summary 값은 각 localstorage의 객체의 줄거리

  const price = document.querySelectorAll('.shop .price');
  price[i].innerText =
    JSON.parse(localStorage.getItem(localStorage.key(i)))
      .price.toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원';
  console.log(price[i].innerText);
  //각 책의 가격 값은 각 localstorage의 객체의 가격에 천단위마다 , 찍음
} //localstorage에 따라 div 생성하는 거

const buyCheck = document.querySelectorAll('input[type=checkbox]');
const price = document.querySelectorAll('.price');
for (let i = 0; i < buyCheck.length; i++) {
  buyCheck[i].addEventListener('change', function () {
    if (buyCheck[i].checked) {
      console.log(i);
      let title = JSON.parse(localStorage.getItem(localStorage.key(i))).name;
      let price = Number(
        JSON.parse(localStorage.getItem(localStorage.key(i))).price
      );
      checkTrue(title, price);
    } else {
      let title = JSON.parse(localStorage.getItem(localStorage.key(i))).name;
      let price = Number(
        JSON.parse(localStorage.getItem(localStorage.key(i))).price
      );
      checkFalse(title, price, i);
    }
  });
}
let finalPrice = document.querySelector('.final-price');
const itemList = document.querySelector('.item-list');
let initprice = 0;
function checkTrue(title, price) {
  const itemTitle = document.createElement('div');
  itemList.append(itemTitle);
  itemTitle.innerHTML = title;
  initprice += price;
  finalPrice.innerText =
    '최종결제금액: ' +
    initprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') +
    '원';
}
function checkFalse(title, price, i) {
  initprice -= price;
  const itemTitle = document.querySelectorAll('.item-list div');
  for (i = 0; i < itemTitle.length; i++) {
    if (itemTitle[i].innerHTML == title) {
      itemList.removeChild(itemTitle[i]);
    }
  }
  finalPrice.innerText =
    '최종결제금액: ' +
    initprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') +
    '원';
}
const bookImg = document.querySelectorAll('.book-img img');
console.log(bookImg);
for (let i = 0; i < bookImg.length; i++) {
  const moduleImage = document.querySelector('.module-image img');
  const title = document.querySelector('.module-explain .title h2');
  const price = document.querySelector('.module-explain .price');
  const summary = document.querySelector('.module-explain .summary');
  bookImg[i].addEventListener('click', () => {
    moduleContainer.classList.remove('hidden');
    moduleImage.setAttribute(
      'src',
      JSON.parse(localStorage.getItem(localStorage.key(i))).src
    );
    title.innerHTML = JSON.parse(
      localStorage.getItem(localStorage.key(i))
    ).name;
    price.innerHTML =
      '판매가: ' +
      JSON.parse(localStorage.getItem(localStorage.key(i))).price.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      ) +
      '원';
    summary.innerHTML = JSON.parse(
      localStorage.getItem(localStorage.key(i))
    ).summary;
  });
}
moduleContainer.addEventListener('click', (e) => {
  if (e.target.classList == 'module-container') {
    moduleContainer.classList.add('hidden');
  }
});
const removeBtn = document.querySelectorAll('.shop button');
const bookContainer = document.querySelectorAll('.book-container');
for (let i = 0; i < removeBtn.length; i++) {
  removeBtn[i].addEventListener('click', (e) => {
    // localStorage.removeItem(localStorage.key(i));
  });
}
const checkDelete = document.querySelector('.checkDelete');
checkDelete.addEventListener('click', () => {
  const selectBox = document.querySelectorAll(
    '.book-container input[type="checkbox"]:checked'
  );
  for (let i = 0; i < selectBox.length; i++) {
    const selectSrc =
      selectBox[i].nextElementSibling.children[0].getAttribute('src');
    const selectAlt =
      selectBox[i].nextElementSibling.children[0].getAttribute('alt');
    console.log(selectAlt);
    const itemListDiv = document.querySelectorAll('.item-list div');
    console.log(itemListDiv);
    itemListDiv[0].remove();
    selectBox[i].parentElement.remove();
    localStorage.removeItem(selectSrc);
  }
  window.location.reload();
});
const allDelete = document.querySelector('.allDelete');
allDelete.addEventListener('click', () => {
  for (let i = 0; i < bookContainer.length; i++) {
    bookContainer[i].remove();
  }
  localStorage.clear();
});
const paybtn = document.querySelector('.paybutton');
paybtn.addEventListener('click', () => {
  const selectBox = document.querySelectorAll(
    '.book-container input[type="checkbox"]:checked'
  );
  for (let i = 0; i < selectBox.length; i++) {
    const selectSrc =
      selectBox[i].nextElementSibling.children[0].getAttribute('src');
    const selectAlt =
      selectBox[i].nextElementSibling.children[0].getAttribute('alt');
    console.log(selectSrc);
    console.log(JSON.parse(localStorage.getItem(selectSrc)).price);
    sessionStorage.setItem(
      selectAlt,
      JSON.parse(localStorage.getItem(selectSrc)).price
    );
  }
  for (let i = 0; i < buyCheck.length; i++) {
    buyCheck[i].checked = false;
  }
  location.href = 'payment.html';
});
console.log(sessionStorage);
sessionStorage.clear();
console.log(sessionStorage);
