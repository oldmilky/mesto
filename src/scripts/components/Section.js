export default class Section {
    constructor ({items, renderer}, container) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = container;
    }
  
    addItem(element) {
      this._container.append(element);
    }
  
    _clear() {
      this._container.innerHTML = '';
    }
  
    renderItems() {
      this._clear();
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
  }
