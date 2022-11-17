// export const mult = (a, b) => a * b;
// export const sum = async(a, b) => a + b;
import { createElem } from '../../src/index';
// import { initPlayer } from './player';

let navList = document.querySelector('.nav-list');
let navLinks = document.querySelectorAll('.nav-link');
let pages = document.querySelectorAll('.page');

let navigation = document.querySelector('.navigation');
let burgerMenu = document.querySelector('.burger');
let closeMenu = document.querySelector('.nav-close');
let wrapper = document.querySelector('.wrapper');

export function openBurgerMenu() {
  burgerMenu.addEventListener('click', () => {
    navigation.classList.add('navigation-active');
    wrapper.classList.add('wrapper-active');
  });

  closeMenu.addEventListener('click', () => {
    navigation.classList.remove('navigation-active');
    wrapper.classList.remove('wrapper-active');
  });

  navList.addEventListener('click', () => {
    navigation.classList.remove('navigation-active');
    wrapper.classList.remove('wrapper-active');
  });

  wrapper.addEventListener('click', () => {
    navigation.classList.remove('navigation-active');
    wrapper.classList.toggle('wrapper-active');
  });
}

export function changePage() {
  navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      document.querySelector('.link-active').classList.remove('link-active');
      link.classList.add('link-active');
      pages.forEach((page) => {
        page.classList.add('hidden');
      });
      pages[index].classList.remove('hidden');
    });
  });

  returnToAboutPage();
}

function returnToAboutPage() {
  let logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
  console.log('logo');
  navLinks.forEach((link) => {
    link.classList.remove('link-active');
  });
  navLinks[0].classList.add('link-active');
  pages.forEach((page) => {
    page.classList.add('hidden');
  });
  pages[0].classList.remove('hidden');
});
}

export function startGame() {
  let startBtn = document.querySelector('.intro-button');
  startBtn.addEventListener('click', () => {
    navLinks[0].classList.remove('link-active');
    navLinks[1].classList.add('link-active');
    pages[0].classList.add('hidden');
    pages[1].classList.remove('hidden');
    // initPlayer();
  });
}

let addLinkItem;
let resultsNavLink;
export function addResultsNav() {
  addLinkItem = createElem('li', 'nav-item', navList, '');
  resultsNavLink = createElem('a', 'nav-link', addLinkItem, 'Результаты');
  resultsNavLink.setAttribute('href', "#");

  resultsNavLink.addEventListener('click', setResultsPageActive);
}

export function setResultsPageActive() {
  document.querySelector('.link-active').classList.remove('link-active');
  resultsNavLink.classList.add('link-active');
  pages.forEach((page) => {
    page.classList.add('hidden');
  });
  pages[pages.length-1].classList.remove('hidden');
}

export function restartGame() {
    addLinkItem.remove();
    navLinks.forEach((link) => {
      link.classList.remove('link-active');
    });
    navLinks[1].classList.add('link-active');
    pages.forEach((page) => {
      page.classList.add('hidden');
    });
    pages[1].classList.remove('hidden');
}