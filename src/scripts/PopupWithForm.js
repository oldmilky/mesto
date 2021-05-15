import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, closeButtonSelector, submitHandler) { 
        super(popupSelector, closeButtonSelector,)
        this._submitHandler = submitHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputValues = {};
        this._popupForm.querySelectorAll('.popup__input').forEach(item => { 
            this._inputValues[item.name] = item.value;
        });
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', (event) => {
            this._submitHandler(event);
        });
    }

    close() {
        this._popupForm.reset()
        super.close()
    }

}