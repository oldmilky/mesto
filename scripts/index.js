// Запишем переменные
let popup = document.querySelector('.popup');
let popupButton = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__information');
let popupForm = popup.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_name_name');
let popupJob = document.querySelector('.popup__input_name_profession');

// Событие открытия попапа
function openPopup() {
    popup.classList.add('popup_opened');
}
// Событие зыкрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}
//Обработчик открытия
popupButton.addEventListener('click', function(event) {
    openPopup();
});
//Закрытия попапа по клике на крестик
popupButtonClose.addEventListener('click', closePopup);
// Событие закрытия попапа на что угодно, кроме самого попапа (С моей версткой, другого способа не придумал)
window.onclick = function(event) {
    if(event.target == popup) {
        closePopup();
    }
}
// Обработчик формы
function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup();
}
// Кнопка сохранить, закрывающий попап
popupForm.addEventListener('submit', formSubmitHandler);