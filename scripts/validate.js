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
  inputElement.classList.add(settingsForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsForm.errorClass);
};

// Cкрыть ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settingsForm.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settingsForm.errorClass);
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
    buttonElement.classList.add(settingsForm.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settingsForm.inactiveButtonClass);
  }
}

//Функция для навешивания событий на все формы
const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(settingsForm.inputSelector));
  const buttonElement = formElement.querySelector(settingsForm.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Валидация
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settingsForm.formSelector));
  formList.forEach(setEventListeners);
};
enableValidation(settingsForm);