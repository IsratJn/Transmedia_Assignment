import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

export class BoardPage extends BasePage {
  constructor(page) {
    super(page);
    this.homeBtn = '[data-cy="home"]';
    this.favIcon = '[data-cy="star"]';
    this.boardOptions = '[data-cy="board-options"]';
    this.listTitleInput = '[data-cy="add-list-input"]';
    this.addListBtn = 'text="Add list"';
    this.newCardBtn = '[data-cy="new-card"]';
    this.cardTitleInput = '[placeholder="Enter a title for this card..."]';
    this.addCardBtn = 'text="Add card"';
    this.card = '[data-cy="card"]';
    this.cardDescription = '[data-cy="card-description"]';
    this.anotherList = 'text=" Add another list"';
    this.listContainer = '[data-cy="list"]';
    this.listNameInput = '[data-cy="list-name"]';
  }

  async verifyBoardCreated(boardId = "2") {
    await this.expectUrl(new RegExp(`\\/board\\/${boardId}$`));
    await this.expectVisible(this.homeBtn);
  }

  async navigateToHome() {
    await this.clickElement(this.homeBtn);
  }

  async verifyBoardElements() {
    await this.expectVisible(this.favIcon);
    await this.expectVisible(this.boardOptions);
  }

  async createList(listName) {
    await this.fillInput(this.listTitleInput, listName);
    await this.clickElement(this.addListBtn);
    await this.waitFor(3000);
  }

  async createAnotherList(listName) {
    await this.clickElement(this.anotherList);
    await this.waitFor(2000);
    await this.createList(listName);
  }

  async createCard(cardName) {
    await this.expectVisible(this.newCardBtn);
    await this.clickElement(this.newCardBtn);
    await this.waitFor(1000);
    await this.fillInput(this.cardTitleInput, cardName);
    await this.clickElement(this.addCardBtn);
  }

  async openCard() {
    await this.clickElement(this.card);
    await this.waitFor(3000);
  }

  async verifyListsCreated(listName1, listName2) {
    await expect(this.page.locator(this.listContainer)).toHaveCount(2);

    const listInputs = this.page.locator(this.listNameInput);
    await expect(listInputs.nth(0)).toHaveValue(listName1);
    await expect(listInputs.nth(1)).toHaveValue(listName2);
  }
}
