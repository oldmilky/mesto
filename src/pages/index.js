import FormValidator from '../scripts/components/FormValidator.js';
import {settingsForm} from '../scripts/utils/settingsForm.js';
import Card from '../scripts/components/Card.js';
import '../pages/index.css';
import Api from '../scripts/components/Api.js';
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
  inputErrorSelector,
  avatarImage,
  popupAvatar,
  popupAvatarButton,
  popupAvatarForm,
  popupAvatarInput,
  popupAvatarSubmitButton,
  popupAvatarCloseButton,
  popupConfirmSelector,
  popupDeleteIcon,
  userId,
  gridCardTemplateId
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
  popupEditProfile.resetWaitSubmitButton();
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
  popupEditProfile.waitSubmitButton('Сохранение...')
  api.editUserInfo(info.name, info.profession)
    .finally(() => {
      userInfo.setUserInfo(info);
      popupEditProfile.close();
    })
}

// Открытие попапа добавление карточки
popupAddOpenButton.addEventListener('click', function() {
  popupAddCard.open();
  popupAddCard.resetWaitSubmitButton();
})

// Обработчик добавления карточки
const formSubmitAddHandler = (event) => {
  // event.preventDefault();

  const titleCard = titleCardInput.value;
  const linkCard = linkCardInput.value;
  api.addCard(titleCard, linkCard)
    .then(dataCard=> {
    const card = new Card (dataCard, userId, gridCardTemplateId,  
      {
        handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
        },
        likeCardHandler: () => {
          const likedCard = card.likedCard();
          const resultApi = likedCard ? api.unlikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());
    
          resultApi.then(data => {
              card.setLikes(data.likes)
              card.renderLikes();
            });
        },
        deleteCardHandler: () => {
          popupConfirm.open(card);
        }
      }, dataCard._id);
    const cardElement = card.generateCard();
    photoCard.prepend(cardElement);
  });
  popupAddCard.close();
}

// Открытие попапа изменение аватара
popupAvatarButton.addEventListener('click', function() {
  popupEditAvatar.open();
  popupEditAvatar.resetWaitSubmitButton();
});

// Обработчик формы подтверждения удаления
const formDeleteSubmitHandler = (event, card) => {
  event.preventDefault();

  popupConfirm.waitSubmitButton('Удаление...');
  api.deleteCard(card.getIdCard())
    .then(response => {
      card.deleteCard();
    }).finally(() => {
      popupConfirm.close();
      popupConfirm.resetWaitSubmitButton();
    })  
} 

// Обработчик попапа изменение аватара
const formEditAvatarSubmitHandler = (event) => {
  event.preventDefault();
  avatarImage.src = popupAvatarInput.value;
  popupEditAvatar.waitSubmitButton('Сохранение...');
  api.editUserAvatar(popupAvatarInput.value)
    .finally(() => {
      popupEditAvatar.close();
    });
}

// Работа с API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '2373054b-c310-4707-af21-19b2a17fc69f',
    'Content-Type': 'application/json'
  }
});

// Функция генерации изначальных карточек
const generateInitialCards = (cards) => {
  const defaultCardGrid = new Section({
    items: cards,
    renderer: (item) => {
      const card = new Card (item, userId, gridCardTemplateId, 
        {
          handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
        },
        likeCardHandler: () => {
          const likedCard = card.likedCard();
          const resultApi = likedCard ? api.unlikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());

          resultApi.then(data => {
              card.setLikes(data.likes)
              card.renderLikes();
            });
        },
        deleteCardHandler: () => {
          popupConfirm.open(card);
        }
      }, item._id);
      const cardElement = card.generateCard();
      defaultCardGrid.addItem(cardElement);
    }
  }, photoCard);
  defaultCardGrid.renderItems();
}

api.getInitialCards().then((cards) => {
  generateInitialCards(cards);
  }
);

// function handleCardClick(name, link) {
//   popupWithImage.open(name, link);
// }

// const createCard = (card) => {
//   return new Card(card, '#grid-template', handleCardClick)

// }
// api.getInitialCards().then((cards) => {
//   generateInitialCard(cards)
// })
// const generateInitialCard = (cards) => {
//   const initialSection = new Section({items: cards,
//     renderer: (item) => {
//       const card = createCard(item);
//       initialSection.addItem(card.getCard());
//     }}, photoCard)
//   initialSection.renderItems();
// }


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