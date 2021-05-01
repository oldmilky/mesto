export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }
// Показать ошибку
_showInputError(inputElement, errorMessage) {
const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
inputElement.classList.add(this._settings.inputErrorClass);
errorElement.textContent = errorMessage;
errorElement.classList.add(this._settings.errorClass);
};

// Cкрыть ошибку
_hideInputError(inputElement) {
const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
inputElement.classList.remove(this._settings.inputErrorClass);
errorElement.textContent = '';
errorElement.classList.remove(this._settings.errorClass);
};

// Проверить валидность формы
_checkInputValidity(inputElement) {
const isInputNotValid = !inputElement.validity.valid;
if (isInputNotValid) {
  const errorMessage = inputElement.validationMessage;
  this._showInputError(inputElement, errorMessage);
} else {
  this._hideInputError(inputElement);
}
};

// Проверка валидности кнопки
_hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

// Переключение кнопки
_toggleButtonState(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._settings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
  }
}

//Функция для навешивания событий на все формы
_setEventListeners() {
  this._form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
this._toggleButtonState(inputList, buttonElement);
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    this._checkInputValidity(inputElement);
    this._toggleButtonState(inputList, buttonElement);
  });
});
};

// Валидация
enableValidation() {
  this._setEventListeners();
};
};