console.log('Выполнены следующие части задания:\n\n1) Landing & Donate - бургер меню для ширины экрана 640px и менее (+10)\n2) Landing - Карусель в блоке Pets для ширины экрана 1600px, 1000px и 640px (+30)\n3) Попап при нажатии на отзыв в блоке Testimonials для ширины экрана 640px и 320px (+10)\n4) Панель Amount в блоке Pick and feed a friend для ширины экрана 1600px, 1000px, 640px и менее (+30)\n\nP.s. При изменении ширины экрана нужно перезагрузить страницу ');

//burger menu
const navigation = document.querySelector('.navigation');
const burgerMenu = document.querySelector('.burger');
const closeMenuButton = document.querySelector('.nav-close');
const navList = document.querySelector('.nav-list');
const wrapper = document.querySelector('.wrapper');

burgerMenu.onclick = function () {
  navigation.classList.add('navigation-active');
  wrapper.classList.add('wrapper-active');
}

closeMenuButton.onclick = function () {
  navigation.classList.remove('navigation-active');
  wrapper.classList.remove('wrapper-active');
}

navList.onclick = function () {
  navigation.classList.remove('navigation-active');
  wrapper.classList.remove('wrapper-active');
}

wrapper.onclick = function () {
  navigation.classList.toggle('navigation-active');
  wrapper.classList.toggle('wrapper-active');
}

//donate amount
const dots = document.querySelectorAll('.progress-bar-dot-item');
const sums = document.querySelectorAll('.amount-item');
const amountInput = document.querySelector('.another-amount');

function removeActDot() {
  if(document.querySelector('.active-dot')) {
    document.querySelector('.active-dot').classList.remove('active-dot');
  }
  if(document.querySelector('.active-amount')) {
    document.querySelector('.active-amount').classList.remove('active-amount');
  }
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', (event) => {
    removeActDot();
    dot.classList.add('active-dot');
    sums[index].classList.add('active-amount');
    amountInput.value = sums[index].textContent.slice(1);
    });
});

sums.forEach((sum, index) => {
  sum.addEventListener('click', () => {
    removeActDot();
    sum.classList.add('active-amount');
    dots[index].classList.add('active-dot');
    amountInput.value = sums[index].textContent.slice(1);
  });
});

amountInput.oninput = function () {
  switch (amountInput.value) {
    case '5000':
      removeActDot();
      dots[0].classList.add('active-dot');
      sums[0].classList.add('active-amount');
      break;
    case '2000':
      removeActDot();
      dots[1].classList.add('active-dot');
      sums[1].classList.add('active-amount');
      break;
    case '1000':
      removeActDot();
      dots[2].classList.add('active-dot');
      sums[2].classList.add('active-amount');
      break;
    case '500':
      removeActDot();
      dots[3].classList.add('active-dot');
      sums[3].classList.add('active-amount');
      break;
    case '250':
      removeActDot();
      dots[4].classList.add('active-dot');
      sums[4].classList.add('active-amount');
      break;
    case '100':
      removeActDot();
      dots[5].classList.add('active-dot');
      sums[5].classList.add('active-amount');
      break;
    case '50':
      removeActDot();
      dots[6].classList.add('active-dot');
      sums[6].classList.add('active-amount');
      break;
    case '25':
      removeActDot();
      dots[7].classList.add('active-dot');
      sums[7].classList.add('active-amount');
      break;
    default:
      removeActDot();
    }
}