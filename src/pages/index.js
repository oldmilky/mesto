import FormValidator from '../scripts/components/FormValidator.js';
import {settingsForm} from '../scripts/utils/settingsForm.js';
import Card from '../scripts/components/Card.js';
import '../pages/index.css';
import Api from '../scripts/components/Api.js';
import {
  popupForm,
  popupAddForm,
  popupAddSaveButton,
  popupButtonClose,
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
  inputErrorSelector,
  avatarImage,
  popupAvatar,
  popupAvatarButton,
  popupAvatarForm,
  popupAvatarInput,
  popupAvatarSubmitButton,
  popupAvatarCloseButton,
  popupConfirmSelector,
  popupDeleteIcon
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
// import {initialCards} from '../scripts/utils/utils.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js'

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

// Открытие попапа подтверждение удаления карточки

// Открытие попапа изменение аватара
popupAvatarButton.addEventListener('click', function() {
  popupEditAvatar.open();
  popupEditAvatar.resetWaitSubmitButton();
});

const formDeleteSubmitHandler = (evt, card) => {
  evt.preventDefault();
  api.deleteCard()
}

// Обработчик попапа изменение аватара
const formEditAvatarSubmitHandler = (e) => {
  e.preventDefault(); 
  avatarImage.src = popupAvatarInput.value;
  popupEditAvatar.waitSubmitButton('Сохранение...');
  popupEditAvatar.close();
}

// Работа с API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '2373054b-c310-4707-af21-19b2a17fc69f',
    'Content-Type': 'application/json'
  }
});

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
api.getInitialCards().then((cards) => {
  generateInitialCard(cards)
})
const generateInitialCard = (cards) => {
  const initialSection = new Section({items: cards, 
    renderer: (item) => {
      const card = createCard(item);
      initialSection.addItem(card.getCard());
    }}, photoCard)
    initialSection.renderItems();
}


// Включаем валидацию формы редактрования профиля
const editFormValidator = new FormValidator(settingsForm, popupForm, inputErrorSelector);
editFormValidator.enableValidation();

// Попап редактирования аватара
const popupEditAvatar = new PopupWithSubmit(profileSelectors.profileAvatarSelector, popupAvatarCloseButton,
  formEditAvatarSubmitHandler);
popupEditAvatar.setEventListeners();

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

// Попап подтвеждения удаления
const popupConfirm = new PopupWithSubmit(popupConfirmSelector, popupAddCloseButtonSelector, 
  (evt, card) => {
    formDeleteSubmitHandler(evt, card)
  }
)
popupConfirm.setEventListeners();

export {
  popupFullImage,
  popupFullImageImage,
  popupFullImageTitle
}