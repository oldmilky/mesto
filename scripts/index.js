// Запишем переменные
let popup = document.querySelector('.popup');
let popupButton = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__information');
let popupForm = popup.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_name_name');
let popupJob = document.querySelector('.popup__input_name_profession');

// Функция для изначального заполнения значений полей формы
let openPopup = () => {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

// Событие зыкрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}

//Обработчик открытия / закрытия
popupButton.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);

// Обработчик формы
function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup();
}
// Кнопка сохранить, закрывающий попап
popupForm.addEventListener('submit', formSubmitHandler);