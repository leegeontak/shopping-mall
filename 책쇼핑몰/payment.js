sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
console.log(sessionStorage);

const itemName = document.querySelector('.item-name');
const itemPrice = document.querySelector('.item-price');
const findAddress = document.querySelector('.find-address');
const zipCode = document.querySelector('.zip-code');
const address = document.querySelector('.address');
const finalPrice = document.querySelector('.final-price span');
const payBtn = document.querySelector('.paybutton');
let span = document.querySelector('.cart span');
span.innerHTML = localStorage.length;
let price = 0;
for (let i = 0; i < sessionStorage.length; i++) {
  const nameDiv = document.createElement('div');
  const priceDiv = document.createElement('div');
  nameDiv.innerHTML = sessionStorage.key(i);
  priceDiv.innerHTML =
    sessionStorage
      .getItem(sessionStorage.key(i))
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  itemName.append(nameDiv);
  itemPrice.append(priceDiv);

  price += Number(sessionStorage.getItem(sessionStorage.key(i)));
  console.log(price);
}
finalPrice.innerHTML =
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
findAddress.addEventListener('click', () => {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
      console.log(data);
      zipCode.value = data.zonecode;
      if (data.userSelectedType == 'R') {
        address.value = data.roadAddress + ' (' + data.buildingName + ')';
      } else {
        address.value = data.jibunAddress;
      }
    },
  }).open();
});
