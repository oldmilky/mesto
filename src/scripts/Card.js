import {popupFullImage, popupFullImageImage, popupFullImageTitle} from './index.js';
export default class Card {
  constructor({name, link}, cardTemplateSelector, handleCardClick) {
    this._text = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeIcon() {
    this.classList.toggle('grid-item__like_liked');
  }

  _handleDeleteCard() {
    this.closest('.grid-item').remove();
  }

  _handlePreviewPicture() {
    // openPopup(popupFullImage);
    popupFullImageImage.src = this.src;
    popupFullImageTitle.textContent = this.alt;
    popupFullImageImage.alt = this.alt;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeIcon);
    this._deleteIcon.addEventListener('click', this._handleDeleteCard);
    this._image.addEventListener('click', () => this._handleCardClick(this._text, this._link));
  }

  _getTemplate() {
    this._template = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
    return this._template;
  }

  getCard() {
    this._view = this._getTemplate();
    this._likeButton = this._view.querySelector('.grid-item__like');
    this._image = this._view.querySelector('.grid-item__photo');
    this._deleteIcon = this._view.querySelector('.grid-item__delete-icon');
    this._image.src = this._link;
    this._image.alt = this._text;
    this._view.querySelector('.grid-item__name').textContent = this._text;
    this._setEventListeners();

    return this._view;
    }
    
  }
