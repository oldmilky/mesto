// Запишем переменные
let popup = document.querySelector('.popup');
let popupButton = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__information');
let popupForm = popup.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_name_name');
let popupJob = document.querySelector('.popup__input_name_profession');

// Событие открытия попапа 
function openPopup() { 
    popup.classList.add('popup_opened'); 
} 
// Событие зыкрытия попапа 
function closePopup() { 
    popup.classList.remove('popup_opened'); 
} 
// Функция для изначального заполнения значений полей формы
let fillValueForm = () => { 
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    openPopup(); 
}
//Обработчик открытия / заполнения
popupButton.addEventListener('click', fillValueForm, openPopup);
//Закрытия попапа по клике на крестик 
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