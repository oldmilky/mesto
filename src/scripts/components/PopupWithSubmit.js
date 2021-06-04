import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor(popupSelector, closeButtonSelector, submitFormHandler) {
    super(popupSelector, closeButtonSelector);
    this._submitFormHandler = submitFormHandler;
    this.waitSubmitButton = this.waitSubmitButton.bind(this);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popupForm.querySelector('.popup__button-save');
    this._defaultSubmitButtonText = this._popupSubmitButton.value;
  }

  waitSubmitButton(waitingText) {
    this._popupSubmitButton.value = waitingText;
  }

  resetWaitSubmitButton() {
    this._popupSubmitButton.value = this._defaultSubmitButtonText;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (event) => {
      this._submitFormHandler(event, this._setting);
    });
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
  }

  open(setting) {
    this._setting = setting;
    super.open();
  }
  
  close() {
    this._popupForm.reset()
    super.close()
  }
  
}

export default PopupWithSubmit;