import { BasePage } from "./BasePage.js";

export class BoardPage extends BasePage {
  constructor(page) {
    super(page);
    this.homeBtn = '[data-cy="home"]';
  }

  async verifyBoardCreated(boardId = "2") {
    await this.expectUrl(new RegExp(`\\/board\\/${boardId}$`));
    await this.expectVisible(this.homeBtn);
  }

  async navigateToHome() {
    await this.clickElement(this.homeBtn);
  }
}
