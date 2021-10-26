const form = document.getElementById('form');
let uploaded_image = '';
let inputs = document.getElementById('form').elements;
let itemsData = [];
let itemsList = document.getElementsByClassName('items-list')[0];
let itemsVisible = 10;
let loadMore = document.getElementById('load-more');
let isLoadMoreDisplayed = false;
let alert = document.getElementById('form__alert');
const loader = document.getElementById('loader');

// select image logic
const fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem');
imageText = fileSelect.children[0].classList;

fileSelect.addEventListener(
  'click',
  function (e) {
    if (fileElem) {
      fileElem.click();
    }
  },
  false
);

fileElem.addEventListener('change', function () {
  imageText.add('form__image-text--hidden');
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    uploaded_image = reader.result;
    document.querySelector(
      '.form__image'
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

const clearForm = () => {
  uploaded_image = '';
  document.querySelector('.form__image').style.backgroundImage = '';
  imageText.remove('form__image-text--hidden');
  document.getElementsByClassName('form__title')[0].children[0].value = '';
  document.getElementsByClassName('form__url')[0].children[0].value = '';
  document.getElementsByClassName('form__text')[0].children[0].value = '';
};

function formAlert(text) {
  alert.classList.remove('form__alert--hidden');
  alert.children[0].textContent = text;

  setTimeout(function () {
    alert.children[0].textContent = '';
    alert.classList.add('form__alert--hidden');
  }, 4000);
}

function addToList(data) {
  itemsData.push(data);
  renderItems(data);
  checkItemsDisplay();
}

function renderItems({ image, title, url, longText }) {
  // console.log(image, title, url, longText);
  let element = document.createElement('div');
  element.classList.add('item');
  element.innerHTML = `<img  class="item__image" src="${image}" alt="">
  <h4 class="item__title">${title}</h4>
  <p class="item__text">${longText}</p>`;
  itemsList.appendChild(element);
}
function checkItemsDisplay() {
  for (let i = 0; i < itemsData.length; i++) {
    if (i >= itemsVisible) {
      itemsList.children[i].classList.add('item--hidden');
    } else {
      itemsList.children[i].classList.remove('item--hidden');
    }
  }
  if (itemsData.length > 10 && !isLoadMoreDisplayed) {
    loadMore.parentElement.classList.remove('load-more--hidden');
    isLoadMoreDisplayed = true;
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const image = uploaded_image;
  const title = inputs['title'].value;
  const url = inputs['url'].value;
  const longText = inputs['long-text'].value;
  const cyrillicReg = new RegExp('^[А-Яа-я]+$');
  if (!image) {
    formAlert('Выберите изображение');
    return;
  }
  if (!cyrillicReg.test(title)) {
    formAlert('Только кириллические символы в поле заголовок!!!');
    return;
  }
  if (!cyrillicReg.test(longText)) {
    formAlert('Только кириллические символы в поле текст!!!');
    return;
  }
  displayLoader();
  const item = { image, title, url, longText };
  addToList(item);
  clearForm();
  displayLoader();
});

loadMore.addEventListener('click', () => {
  displayLoader();
  if (itemsData.length > itemsVisible) {
    itemsVisible += 10;
  }
  checkItemsDisplay();
  if (itemsData.length < itemsVisible) {
    loadMore.parentElement.classList.add('load-more--hidden');
    isLoadMoreDisplayed = false;
  }
  displayLoader();
});

const displayLoader = () => {
  loader.classList.toggle('loader--hidden');
  console.log('toggle');
};
