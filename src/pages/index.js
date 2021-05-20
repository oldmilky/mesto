import FormValidator from '../scripts/components/FormValidator.js';
import {settingsForm} from '../scripts/utils/settingsForm.js';
import Card from '../scripts/components/Card.js';
import '../pages/index.css';
import {
  popupForm,
  popupAddForm,
  popupAddSaveButton,
  popupFullImage,
  popupFullImageImage,
  popupFullImageTitle,
  photoCard,
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
  inputErrorSelector
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import {initialCards} from '../scripts/utils/utils.js';

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
  const dataCard = { 
    name: data['title-card'],
    link: data['link-card']
  }
  const card = createCard(dataCard)
  renderCard(card.getCard());
  popupAddCard.close();
  popupAddForm.reset();
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
const editFormValidator = new FormValidator(settingsForm, popupForm, inputErrorSelector);
editFormValidator.enableValidation();

// Включаем валидацию формы добавления карточки
const addFormValidator = new FormValidator(settingsForm, popupAddForm, inputErrorSelector);
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