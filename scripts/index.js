// Переменные редактирования профиля
const popup = document.querySelector('.popup');
const popupButton = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__information');
const popupForm = popup.querySelector('.popup__form');
const popupName = document.querySelector('.popup__input_name_name');
const popupJob = document.querySelector('.popup__input_name_profession');

// Переменные добавляния карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddButtonClose = popupAdd.querySelector('.popup__button-close');
const popupAddForm = popupAdd.querySelector('.popup__form');

// Попап картинки при нажатии
const popupFullImage = document.querySelector('.popup_type_image');
const popupFullPhoto = document.querySelectorAll('.grid-item__image');
const popupFullImageImage = popupFullImage.querySelector('.popup__image');
const popupFullImageTitle = popupFullImage.querySelector('.popup__title-image');
const popupFullImageClose = popupFullImage.querySelector('.popup__button-close');

// Обработчик изначального заполнения значений полей формы / открытие попапа редактирования
const openPopup = (event) => {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    event.classList.add('popup_opened');
}

// Событие зыкрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
    popupAdd.classList.remove('popup_opened');
    popupFullImage.classList.remove('popup_opened');
}

// Обработчик открытия и закрытия
popupButton.addEventListener('click', () => {
    openPopup(popup)
});
popupAddButton.addEventListener('click', () => {
    openPopup(popupAdd)
});

popupButtonClose.addEventListener('click', () => {
    closePopup(popup)
});
popupAddButtonClose.addEventListener('click', () => {
    closePopup(popupAdd)
});
popupFullImageClose.addEventListener('click', () => {
  closePopup(popupFullImage);
})

// Обработчик формы
function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup();
}

// Кнопка сохранить, закрывающий попап
popupForm.addEventListener('submit', formSubmitHandler);

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
  const titleCardSubmit = titleCardInput.value;
  const linkCardSubmit = linkCardInput.value;
  renderCard(titleCardSubmit, linkCardSubmit);
  closePopup();
  popupAddForm.reset(); // очищение поля формы для след. добавления
  }
  
  // Рендеринг
  function renderCard(titleCardSubmit, linkCardSubmit) {
  const templateCard = document.querySelector('#grid-template').content.querySelector('.grid-item');
  const templateCardElement = templateCard.cloneNode(true);
  const templateCardTitle = templateCardElement.querySelector('.grid-item__name');
  const templateCardImage = templateCardElement.querySelector('.grid-item__photo');
  const AddlikeButton = templateCardElement.querySelector('.grid-item__like');
  const AddImage = templateCardElement.querySelector('.grid-item__photo');
  const AddDeleteIcon = templateCardElement.querySelector('.grid-item__delete-icon');

  //Слушатели
    AddlikeButton.addEventListener('click', function() {
      AddlikeButton.classList.toggle('grid-item__like_liked');
    })

    AddDeleteIcon.addEventListener('click', function() {
      AddDeleteIcon.closest('.grid-item').remove();
    })

    AddImage.addEventListener('click', function () {
      openPopup(popupFullImage);
      popupFullImageImage.src = linkCardSubmit;
      popupFullImageTitle.textContent = titleCardSubmit;
    });

  templateCardTitle.textContent = titleCardSubmit;
  templateCardImage.src = linkCardSubmit;
  photoCard.prepend(templateCardElement);
  }
  
  
  // Обработчик формы добавления карточки
  popupAddForm.addEventListener('submit', formSubmitAddHandler);
  
  // Генерация
  const initialTemplate = initialCards.forEach(item => {
  renderCard(item.name, item.link);
  });

