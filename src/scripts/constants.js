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
const popupEditSelector = '.popup_type_edit';
const popupEditCloseButtonSelector = '.popup__button-close';
const profileSelectors = {
    profileNameSelector: '.profile__name', 
    profileProfessionSelector: '.profile__information'
  }
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const nameInput = popupEditWrap.querySelector('.popup__input_name_name');
const professionInput = popupEditWrap.querySelector('.popup__input_name_profession');


// Переменные добавляния карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddButtonClose = popupAdd.querySelector('.popup__button-close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddSaveButton = popupAdd.querySelector('.popup__button-save');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddSelector = '.popup_type_add';
const popupAddCloseButtonSelector = '.popup__button-close';

// Попап картинки при нажатии
const popupFullImage = document.querySelector('.popup_type_image');
const popupImageSelector = '.popup_type_image';
const popupImageCloseButtonSelector = '.popup__button-close';
const imageSelector = '.popup__image';
const popupImageTitleSelector = '.popup__title-image';
const popupFullImageImage = popupFullImage.querySelector('.popup__image');
const popupFullImageTitle = popupFullImage.querySelector('.popup__title-image');
const popupFullImageClose = popupFullImage.querySelector('.popup__button-close');

// Переменные картинки
const titleCardInput = popupAdd.querySelector('.popup__input_name_title-card');
const linkCardInput = popupAdd.querySelector('.popup__input_name_link-card');

const photoCard = document.querySelector('.grid-places');

const openedPopup = document.querySelector('.popup_opened');

const escKeyCode = 27;

export {
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
    escKeyCode,
    profileSelectors,
    popupEditOpenButton,
    nameInput,
    professionInput,
    popupEditSelector,
    popupEditCloseButtonSelector,
    popupAddOpenButton,
    popupAddSelector,
    popupAddCloseButtonSelector
};