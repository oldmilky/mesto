export default class Section {
    constructor ({items, renderer}, container) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = container;
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  
    clear() {
      this._container.innerHTML = '';
    }
  
    renderItems() {
      this.clear();
      console.log(this._renderedItems)
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
  }
