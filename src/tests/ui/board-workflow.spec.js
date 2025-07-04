import { test as base } from "@playwright/test";
import { HomePage } from "../../pages/homePage.js";
import { BoardPage } from "../../pages/BoardPage.js";
import { CardPage } from "../../pages/CardPage.js";

import * as testData from "../../../testdata/testData.json";

// Creates worker-scoped fixture for shared context
const test = base.extend({
  sharedPage: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
      await context.close();
    },
    { scope: "worker" },
  ],
});

test.describe.serial("Complete board workflow", () => {
  let sharedContext = {};
  let page;

  test.beforeAll(async ({ sharedPage }) => {
    page = sharedPage;
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("TC 001: Create board and verify navigation", async () => {
    const homePage = new HomePage(page);
    const boardPage = new BoardPage(page);

    // Generate unique board name
    const uniqueBoardName = `${testData.boardName}_${Date.now()}`;
    sharedContext.uniqueBoardName = uniqueBoardName;

    // Navigate to homepage and verify elements
    await homePage.navigateToHomePage();
    await homePage.verifyPageElements();

    // Creates new board
    await homePage.createNewBoard(uniqueBoardName);

    await boardPage.verifyBoardCreated();

    // Store shared data
    sharedContext.boardCreated = true;
    sharedContext.boardUrl = page.url();
  });

  test("TC 002: Add two lists and verify", async () => {
    const boardPage = new BoardPage(page);
    const cardPage = new CardPage(page);

    // Navigate directly to the stored board URL
    await page.goto(sharedContext.boardUrl);

    await boardPage.verifyBoardElements();
    await boardPage.createList(testData.listName_1);
    await boardPage.createCard(testData.cardName_1);
    await boardPage.openCard();
    await cardPage.addDescription(testData.cardDescription);
    await cardPage.uploadImage("./testdata/pexels-brett-sayles-1322185.jpg");
    await cardPage.closeCard();

    await boardPage.createAnotherList(testData.listName_2);

    await boardPage.verifyListsCreated(
      testData.listName_1,
      testData.listName_2
    );

    sharedContext.listsCreated = true;
    sharedContext.list1Name = testData.listName_1;
    sharedContext.list2Name = testData.listName_2;
  });

  test("TC 003: Delete one list", async () => {
    const boardPage = new BoardPage(page);

    await page.goto(sharedContext.boardUrl);

    // Delete the second list
    await boardPage.deleteListByName(testData.listName_2);

    // Update shared context
    sharedContext.list2Deleted = true;
  });
});
