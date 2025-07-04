import { test } from "@playwright/test";
import { HomePage } from "../../pages/homePage.js";
import { BoardPage } from "../../pages/BoardPage.js";
import testData from "../../../testdata/testData.json";

test("Create board and verify navigation", async ({ page }) => {
  const homePage = new HomePage(page);
  const boardPage = new BoardPage(page);

  // Navigate to homepage and verify elements
  await homePage.navigateToHomePage();
  await homePage.verifyPageElements();

  // Create new board
  await homePage.createNewBoard(testData.boardName);

  // Verify board creation and navigation
  await boardPage.verifyBoardCreated();
});
