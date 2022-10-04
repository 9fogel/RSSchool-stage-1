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