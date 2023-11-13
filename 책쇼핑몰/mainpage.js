const categoryButton = document.querySelectorAll('.header-bottom button');
let span = document.querySelector('.cart span');
span.innerHTML = localStorage.length;
for (let i = 0; categoryButton.length; i++) {
  categoryButton[i].addEventListener('click', (e) => {
    const clickedButton = document.querySelector(
      '.container' + ' ' + '.' + e.target.classList
    );
    if (e.target.classList.value == clickedButton.classList.value) {
      clickedButton.style.display = 'block';
      $(e.target).css('color', 'rgb(188, 55, 188)');
      $(e.target).siblings().css('color', 'black');
      $(clickedButton).siblings().css('display', 'none');
    }
  });
}
