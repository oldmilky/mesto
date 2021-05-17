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
  popupAddCloseButtonSelector,
  escKeyCode
} from '../scripts/constants.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import {initialCards} from './utils.js';

// Открытие попапа редактирования профиля
const userInfo = new UserInfo(profileSelectors);
popupEditOpenButton.addEventListener('click', function() {
  popupEditProfile.open();
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  professionInput.value = currentInfo.profession;
});

// Обработчик формы / автоматическое заполнение формы
const formSubmitHandler = (data) => {
  const info = {
    name: data['name'],
    profession: data['profession']
  }
  userInfo.setUserInfo(info);
  popupEditProfile.close();
}

// Открытие попапа добавление карточки
popupAddOpenButton.addEventListener('click', function() {
  popupAddCard.open();
})

// Обработчик добавления карточки
const formSubmitAddHandler = (data) => {
  const card = new Card({name: data['title-card'], link: data['link-card']}, '#grid-template', handleCardClick)
  renderCard(card.getCard());
  popupAddCard.close();
  popupAddSaveButton.setAttribute('disabled', true);
  popupAddSaveButton.classList.add(settingsForm.inactiveButtonClass);
  }

  // Рендеринг
function renderCard(card) {
  initialSection.addItem(card);
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const createCard = (card) => {
  return new Card(card, '#grid-template', handleCardClick)

}
  const initialSection = new Section({items: initialCards, 
  renderer: (item) => {
    const card = createCard(item);
    initialSection.addItem(card.getCard());
  }}, photoCard)
  initialSection.renderItems();


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