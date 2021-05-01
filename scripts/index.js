import FormValidator from './FormValidator.js';
import {settingsForm} from './settingsForm.js';
import Card from './Card.js';

// Переменные редактирования профиля
const popupEditWrap = document.querySelector('.popup_type_edit');
const popupButton = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__information');
const popupForm = popup.querySelector('.popup__form');
const popupName = document.querySelector('.popup__input_name_name');
const popupJob = document.querySelector('.popup__input_name_profession');
const popupEditSaveButton = popupEditWrap.querySelector('.popup__button-save');

// Переменные добавляния карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddButtonClose = popupAdd.querySelector('.popup__button-close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddSaveButton = popupAdd.querySelector('.popup__button-save');

// Попап картинки при нажатии
const popupFullImage = document.querySelector('.popup_type_image');
const popupFullImageImage = popupFullImage.querySelector('.popup__image');
const popupFullImageTitle = popupFullImage.querySelector('.popup__title-image');
const popupFullImageClose = popupFullImage.querySelector('.popup__button-close');


// Обработчик изначального заполнения значений полей формы / открытие попапа редактирования
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscKey);
}

// Функция закрытия попапа по нажатию ESC
const closePopupEscKey = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Событие зыкрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscKey);
}

// Обработчик открытия и закрытия
popupButton.addEventListener('click', () => {
  openPopup(popupEditWrap)
});
popupAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
});

popupButtonClose.addEventListener('click', () => {
  closePopup(popupEditWrap)
});
popupAddButtonClose.addEventListener('click', () => {
  closePopup(popupAdd);
});
popupFullImageClose.addEventListener('click', () => {
  closePopup(popupFullImage);
})

// Закрытие попапа по клике на оверлей
const closePopupOverlay = popup => event => {
  if (event.target !== event.currentTarget) return;
  closePopup(popup);
}

popupEditWrap.addEventListener('click', closePopupOverlay(popupEditWrap));
popupAdd.addEventListener('click', closePopupOverlay(popupAdd));
popupFullImage.addEventListener('click', closePopupOverlay(popupFullImage));

//При открытии заполняем форму редактирования профиля текущими значениями
popupButton.addEventListener('click', function() {
  openPopup(popupEditWrap);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

// Обработчик формы / автоматическое заполнение формы
function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup(popup);
    popupEditSaveButton.setAttribute('disabled', true);
    popupEditSaveButton.classList.add(settingsForm.inactiveButtonClass);
}

// Кнопка сохранить, закрывающий попап
popupForm.addEventListener('submit', formSubmitHandler);

// Генерация первых 6 карточек
const initialCards = [
    {
      name: 'Liberty Park',
      link: './images/liberty-park.jpg'
    },
    {
      name: 'City Streets',
      link: './images/city-streets.jpg'
    },
    {
      name: 'Extraordinary roads',
      link: './images/roads.jpg'
    },
    {
      name: 'New York',
      link: './images/new-york.jpg'
    },
    {
      name: 'Crimson Light',
      link: './images/crimson-light.jpg'
    },
    {
      name: 'Gray Days',
      link: './images/gray-days.jpg'
    }
  ];

  // Переменные картинки
const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = popupImage.querySelector('.popup__button-close');
const popupImageImage = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title-image');
const titleCardInput = popupAdd.querySelector('.popup__input_name_title-card');
const linkCardInput = popupAdd.querySelector('.popup__input_name_link-card');

const photoCard = document.querySelector('.grid-places');

const formSubmitAddHandler = (event) => {
  event.preventDefault();
  const card = new Card({name: titleCardInput.value, link: linkCardInput.value}, '#grid-template')
  renderCard(card.getCard());
  closePopup(popupAdd);
  popupAddForm.reset(); // очищение поля формы для след. добавления
  popupAddSaveButton.setAttribute('disabled', true);
  popupAddSaveButton.classList.add(settingsForm.inactiveButtonClass);
  }

  // Рендеринг
  function renderCard(card) {
    photoCard.prepend(card);
  }

  // Обработчик формы добавления карточки
  popupAddForm.addEventListener('submit', formSubmitAddHandler);
  
  // Генерация
  initialCards.forEach(item => {
    const card = new Card(item, '#grid-template')
    renderCard(card.getCard()); 
  });

  // Включаем валидацию формы редактрования профиля
const editFormValidator = new FormValidator(settingsForm, popupForm);
editFormValidator.enableValidation();

// Включаем валидацию формы добавления карточки
const addFormValidator = new FormValidator(settingsForm, popupAddForm);
addFormValidator.enableValidation();

export {
  openPopup,
  popupFullImage,
  popupFullImageImage,
  popupFullImageTitle
}