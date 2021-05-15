import FormValidator from './FormValidator.js';
import {settingsForm} from './settingsForm.js';
import Card from './Card.js';
import '../pages/index.css';
import {
  popupEditWrap,
  popupButton,
  popupButtonClose,
  profileName,
  profileJob,
  popupForm,
  popupName,
  popupJob,
  popupEditSaveButton,
  popupAdd,
  popupAddButton,
  popupAddButtonClose,
  popupAddForm,
  popupAddSaveButton,
  popupFullImage,
  popupFullImageImage,
  popupFullImageTitle,
  popupFullImageClose,
  titleCardInput,
  linkCardInput,
  photoCard,
  openedPopup,
  popupImageSelector,
  popupImageCloseButtonSelector,
  imageSelector,
  popupImageTitleSelector,
  profileSelectors,
  popupEditOpenButton,
  nameInput,
  professionInput,
  popupEditSelector,
  popupEditCloseButtonSelector,
  popupAddOpenButton,
  popupAddSelector,
  popupAddCloseButtonSelector
} from '../scripts/utils.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

// Открытие попапа редактирования профиля
const userInfo = new UserInfo(profileSelectors);
popupEditOpenButton.addEventListener('click', function() {
  popupEditProfile.open();
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  professionInput.value = currentInfo.profession;
});

// Обработчик формы / автоматическое заполнение формы
const formSubmitHandler = (event) => {
  event.preventDefault();
  const info = {
    name: nameInput.value,
    profession: professionInput.value
  }
  userInfo.setUserInfo(info);
  popupEditProfile.close();
}

// Генерация первых 6 карточек
import libertyPark from '../images/liberty-park.jpg';
import cityStreets from '../images/city-streets.jpg';
import roads from '../images/roads.jpg';
import newYork from '../images/new-york.jpg';
import crimsonLight from '../images/crimson-light.jpg';
import grayDays from '../images/gray-days.jpg';
const initialCards = [
    {
      name: 'Liberty Park',
      link: libertyPark
    },
    {
      name: 'City Streets',
      link: cityStreets
    },
    {
      name: 'Extraordinary roads',
      link: roads
    },
    {
      name: 'New York',
      link: newYork
    },
    {
      name: 'Crimson Light',
      link: crimsonLight
    },
    {
      name: 'Gray Days',
      link: grayDays
    }
  ];
export {initialCards}

// Открытие попапа добавление карточки
popupAddOpenButton.addEventListener('click', function() {
  popupAddCard.open();
})

// Обработчик добавления карточки
const formSubmitAddHandler = (event) => {
  event.preventDefault();
  const card = new Card({name: titleCardInput.value, link: linkCardInput.value}, '#grid-template', handleCardClick)
  renderCard(card.getCard());
  popupAddCard.close();
  popupAddForm.reset(); // очищение поля формы для след. добавления
  popupAddSaveButton.setAttribute('disabled', true);
  popupAddSaveButton.classList.add(settingsForm.inactiveButtonClass);
  }

// Рендеринг
  function renderCard(card) {
    photoCard.prepend(card);
  }
  
  function handleCardClick(name, link) {
    popupWithImage.open(name, link);
  }

const generateInitialCards = (cards) => {
  const initialSection = new Section({items: cards, 
  renderer: (item) => {
    const card = new Card(item, '#grid-template', handleCardClick)
    initialSection.addItem(card.getCard());
  }}, photoCard)
  initialSection.renderItems();
}
generateInitialCards(initialCards);


// Включаем валидацию формы редактрования профиля
const editFormValidator = new FormValidator(settingsForm, popupForm);
editFormValidator.enableValidation();

// Включаем валидацию формы добавления карточки
const addFormValidator = new FormValidator(settingsForm, popupAddForm);
addFormValidator.enableValidation();

// Попап увеличения картинки
const popupWithImage = new PopupWithImage(popupImageSelector, popupImageCloseButtonSelector, imageSelector, popupImageTitleSelector);
popupWithImage.setEventListeners();

// Попап редактирования профиля
const popupEditProfile = new PopupWithForm(popupEditSelector, popupEditCloseButtonSelector,
  formSubmitHandler)
popupEditProfile.setEventListeners();

// Попап добавления карточки
const popupAddCard = new PopupWithForm(popupAddSelector, popupAddCloseButtonSelector,
  formSubmitAddHandler)
popupAddCard.setEventListeners();

export {
  popupFullImage,
  popupFullImageImage,
  popupFullImageTitle
}