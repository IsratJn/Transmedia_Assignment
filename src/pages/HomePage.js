import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.loginMenu = '[data-cy="login-menu"]';
    this.myBoardsHeading = "text=My Boards";
    this.createBoardCard = 'role=heading[name="Create new board"]';
    this.boardTitleInput = '[placeholder="Add board title"]';
    this.createBoardBtn = '[data-cy="new-board-create"]';
  }

  async navigateToHomePage() {
    await this.goto("http://localhost:3000/");
    await this.waitFor(3000);
  }

  async verifyPageElements() {
    await this.expectTitle(/Transmedia Inc./);
    await this.expectVisible(this.loginMenu);
    await this.expectVisible(this.myBoardsHeading);
  }

  async createNewBoard(boardName) {
    await this.clickElement(this.createBoardCard);
    await this.waitFor(3000);
    await this.fillInput(this.boardTitleInput, boardName);
    await this.clickElement(this.createBoardBtn);
    await this.waitFor(3000);
  }
}
