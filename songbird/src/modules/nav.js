// export const mult = (a, b) => a * b;
// export const sum = async(a, b) => a + b;

let navLinks = document.querySelectorAll('.nav-link');
let pages = document.querySelectorAll('.page');

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
  navLinks[0].classList.add('link-active');
  navLinks[1].classList.remove('link-active');
  navLinks[2].classList.remove('link-active');
  pages[0].classList.remove('hidden');
  pages[1].classList.add('hidden');
});
}

export function startGame() {
  let startBtn = document.querySelector('.intro-button');
  startBtn.addEventListener('click', () => {
    navLinks[0].classList.remove('link-active');
    navLinks[1].classList.add('link-active');
    pages[0].classList.add('hidden');
    pages[1].classList.remove('hidden');
  });
}