import { expect } from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async waitFor(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async expectVisible(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async clickElement(selector) {
    await this.page.locator(selector).click();
  }

  async fillInput(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  async expectUrl(pattern) {
    await expect(this.page).toHaveURL(pattern);
  }

  async expectTitle(pattern) {
    await expect(this.page).toHaveTitle(pattern);
  }

  async uploadFile(selector, filePath) {
    await this.page.setInputFiles(selector, filePath);
  }
}
