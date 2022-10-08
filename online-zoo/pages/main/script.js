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
  navigation.classList.remove('navigation-active');
  wrapper.classList.toggle('wrapper-active');
}

//testimonials pop-up <= 640px
let reviewsArr = document.querySelectorAll('.testimonials-item');
let reviewPopup = document.querySelector('.review');
let reviewWrapper = document.querySelector('.review-wrapper');

function showHideReview () {
  reviewPopup.classList.toggle('review-visible');
  reviewWrapper.classList.toggle('review-wrapper-active');
}

function fillReview(index) {
  let reviewAvatar = document.querySelector('.review-avatar');
  let reviewName = document.querySelector('.review-author-name');
  let reviewDest = document.querySelector('.review-author-destination');
  let reviewDate = document.querySelector('.review-author-date');
  let reviewTexts = document.querySelectorAll('.review-testimonials-text');

  const avatarsArr = document.querySelectorAll('.author-avatar');
  const namesArr = document.querySelectorAll('.author-name');
  const destinationsArr = document.querySelectorAll('.author-destination');
  const datesArr = document.querySelectorAll('.author-date');
  const textsArr = document.querySelectorAll('.testimonials-text');

  reviewName.innerHTML = namesArr[index].textContent;
  reviewDest.innerHTML = destinationsArr[index].textContent;
  reviewDate.innerHTML = datesArr[index].textContent;
  reviewAvatar.setAttribute('src', `../../assets/images/author-avatar${index + 1}.svg`);
  reviewTexts[0].innerHTML = textsArr[index*2].textContent;
  reviewTexts[1].innerHTML = textsArr[index*2 + 1].textContent;
  console.log(namesArr);
  console.log(reviewName);
  showHideReview();
}

if (window.innerWidth < 980) {
  console.log(reviewsArr);
  reviewsArr.forEach((reviewItem, index) => {
    reviewItem.addEventListener('click', (event) => {
      fillReview(index);
    });
  });
}

reviewWrapper.onclick = function () {
  reviewPopup.classList.toggle('review-visible');
  reviewWrapper.classList.toggle('review-wrapper-active');
}
