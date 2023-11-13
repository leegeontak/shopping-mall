let span = document.querySelector('.cart span');
span.innerHTML = localStorage.length;

const continueShopping = document.querySelector('.continue-shopping');

continueShopping.addEventListener('click', () => {
  window.history.go(-2);
});
