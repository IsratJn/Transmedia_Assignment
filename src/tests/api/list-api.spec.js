import { test, expect } from "@playwright/test";

const API_BASE_URL = "http://localhost:3000/api/lists";

test.describe.serial("List API Tests", () => {
  test("POST - Create a new list", async ({ request }) => {
    const listData = {
      boardId: "1",
      name: "List created via API",
      description: "API Test List Description",
    };

    const response = await request.post(`${API_BASE_URL}/`, {
      data: listData,
    });

    // Verify response status
    expect(response.status()).toBe(201);

    // Verify response body
    const responseBody = await response.json();
    expect(responseBody.boardId).toBe(listData.boardId);
    expect(responseBody.name).toBe(listData.name);
    expect(responseBody.created).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test("DELETE - Delete the created list", async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/`);

    expect(response.status()).toBe(204);

    // Verify empty response body
    const responseText = await response.text();
    expect(responseText).toBe("");
  });
});
