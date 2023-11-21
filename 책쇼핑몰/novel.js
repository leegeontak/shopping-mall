const bookImg = document.querySelectorAll('.book-img img');
const input = document.querySelector('.SearchWord');
const button = document.querySelector('.search');
const likebtn = document.querySelectorAll('.likebtn');
const deletebtn = document.querySelectorAll('.delete');
let span = document.querySelector('.cart span');
const price = document.querySelectorAll('.price span');
const summary = document.querySelectorAll('.summary');
const buyBtn = document.querySelectorAll('.buybtn');

for (i = 0; i < price.length; i++) {
  price[i].innerText = price[i].innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} //가격에 천단위마다 , 찍는것

span.innerHTML = localStorage.length;
button.addEventListener('click', () => {
  for (let i = 0; i < bookImg.length; i++) {
    // bookImg[i].getAttribute('alt').indexOf(input.value);
    if (bookImg[i].getAttribute('alt').indexOf(input.value) == -1) {
      bookImg[i].parentElement.parentElement.style.display = 'none';
      console.log(bookImg[i].parentElement.parentElement);
    } else {
      bookImg[i].parentElement.parentElement.style.display = 'flex';
    }
  }
});
// localStorage.clear();
// 새로고침하면 로컬스토리지 초기화
let arr = []; //객체를 담을 배열
likebtn.forEach((e, index) => {
  e.onclick = () => {
    let obj = {}; //책의 정보를 담을 객체
    obj.name = bookImg[index].getAttribute('alt'); //객체의 이름은 책의 제목
    obj.src = bookImg[index].getAttribute('src'); //객체의 이미지는 책의 이미지
    obj.summary = summary[index].innerText;
    obj.price = price[index].innerText.replace(/,/g, '');
    arr.push(obj); //객체를 배열에 추가
    console.log(obj);
    console.log(arr);
    localStorage.setItem(
      arr[arr.length - 1].src,
      JSON.stringify(arr[arr.length - 1])
    ); //localstorage에 배열의 맨 마지막 정보를 저장
    e.classList.toggle('delete');
    if (e.classList.contains('delete')) {
    } else {
      localStorage.removeItem(bookImg[index].getAttribute('src'));
    }
    span.innerHTML = localStorage.length;
  };
});
//찜하기를 누를때마다 localstorage에 저장하는 함수

for (i = 0; i < localStorage.length; i++) {
  const localValue = JSON.parse(localStorage.getItem(localStorage.key(i))).name;
  for (j = 0; j < bookImg.length; j++) {
    if (bookImg[j].getAttribute('alt').indexOf(localValue) !== -1) {
      // console.log(bookImg[j].getAttribute('alt'));
      likebtn[j].classList.add('delete');
    }
  }
}
//찜 되어있는 리스트에 delete 클래스 추가하는 거
for (let i = 0; i < buyBtn.length; i++) {
  buyBtn[i].addEventListener('click', () => {
    const title = document.querySelectorAll('.title span');
    let textPrice = price[i].innerHTML.replace(/,/g, '');
    sessionStorage.setItem(title[i].innerHTML, Number(textPrice));
    location.href = 'payment.html';
  });
}
const moduleContainer = document.querySelector('.module-container');
for (let i = 0; i < bookImg.length; i++) {
  const moduleImage = document.querySelector('.module-image img');
  const moduleTitle = document.querySelector('.module-explain .title h2');
  const modulePrice = document.querySelector('.module-explain .price');
  const moduleSummary = document.querySelector('.module-explain .summary');

  bookImg[i].addEventListener('click', (e) => {
    moduleContainer.classList.remove('hidden');
    moduleImage.setAttribute('src', bookImg[i].getAttribute('src'));
    moduleTitle.innerText = bookImg[i].getAttribute('alt');
    modulePrice.innerText = price[i].innerText + '원';
    moduleSummary.innerText = summary[i].innerText;
  });
}
moduleContainer.addEventListener('click', (e) => {
  if (e.target.classList == 'module-container') {
    moduleContainer.classList.add('hidden');
  }
});
sessionStorage.clear();
console.log(sessionStorage);
