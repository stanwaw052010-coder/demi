import { test, expect } from "@playwright/test";

test("homepage loads and shows the main heading", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Спринтер/);
});

test("catalog page is reachable from the homepage", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: /каталог/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/catalog/);
});

test("adding a product to the cart updates the cart count", async ({ page }) => {
  await page.goto("/product/bosch-amortyzator-peredni-sprinter");
  await page.getByRole("button", { name: /кошик/i }).first().click();
  await expect(page.getByText(/додано в кошик/i)).toBeVisible();
});
