class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  addAttribute(attribute: string, attributeValue: string) {
    this.container.setAttribute(attribute, attributeValue);
    return this;
  }

  addContent(htmlString: string) {
    this.container.innerHTML = htmlString;
    return this;
  }

  render() {
    return this.container;
  }
}

export default Component;
