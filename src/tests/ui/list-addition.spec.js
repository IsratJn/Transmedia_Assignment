import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/homePage.js";
import { BoardPage } from "../../pages/BoardPage.js";
import testData from "../../../testdata/testData.json";
import { CardPage } from "../../pages/CardPage.js";

test("TC 002: Add two lists and verify", async ({ page }) => {
  const homePage = new HomePage(page);
  const boardPage = new BoardPage(page);
  const cardPage = new CardPage(page);

  await homePage.navigateToHomePage();
  await homePage.navigateToBoard(testData.boardName);

  await boardPage.verifyBoardElements();
  await boardPage.createList(testData.listName_1);
  await boardPage.createCard(testData.cardName_1);
  await boardPage.openCard();
  await cardPage.addDescription(cardDescription);
  await cardPage.uploadImage("./testdata/pexels-brett-sayles-1322185.jpg");
  await cardPage.closeCard();

  await boardPage.createAnotherList(testData.listName_2);

  await boardPage.verifyListsCreated(testData.listName_1, testData.listName_2);
});
