import { BasePage } from "./BasePage.js";

export class CardPage extends BasePage {
  constructor(page) {
    super(page);
    this.cardDescription = '[data-cy="card-description"]';
    this.closeBtn = '[data-cy="close"]'; // or X button selector
    this.dueDateBtn = 'text="Due date"';
    this.copyAttributesBtn = 'text="Copy attributes"';
    this.deleteCardBtn = 'text="Delete card"';
    this.selectImageBtn = 'text="select image"';
    this.fileInput = 'input[type="file"]';
    this.closeBtn = '.grid.self-end.place-content-center svg[data-cy="cancel"]';
  }

  async addDescription(description) {
    await this.fillInput(this.cardDescription, description);
  }

  async closeCard() {
    await this.clickElement(this.closeBtn);
  }

  async uploadImage(imagePath) {
    await this.uploadFile(this.fileInput, imagePath);
    await this.waitFor(3000);
  }

  async closeCard() {
    await this.clickElement(this.closeBtn);
    await this.waitFor(1000);
  }
}
