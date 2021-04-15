const settingsForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

// Показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Cкрыть ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};

// Проверить валидность формы
const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Переключение кнопки
const toggleButtonState = (inputList, buttonElement) => {
  const isNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (isNotValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button-save_inactive');
  }
}

//Функция для навешивания событий на все формы
const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Валидация
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(setEventListeners);
};
enableValidation(settingsForm);