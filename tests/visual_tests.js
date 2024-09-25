import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto('https://www.saucedemo.com/');
  await page.waitForTimeout(2000);
  await page.fill('id=user-name', 'visual_user');
  await page.fill('id=password', 'secret_sauce');
  await page.click('id=login-button');
  await page.waitForTimeout(2000);
});

test('Visual snapshot of inventory page', async ({ page }) => {
  // Navigate to the inventory page
  await page.click('id=react-burger-menu-btn');
  await page.click('id=inventory_sidebar_link');
  await page.waitForTimeout(2000);
  await page.click('id=react-burger-cross-btn'); // Close the menu

  // Capture a visual snapshot of the inventory page
  await expect(page).toHaveScreenshot('inventory-page.png');
});

test('Visual snapshot of cart page', async ({ page }) => {
  // Add items to the cart
  const itemsToAdd = ['sauce-labs-backpack', 'sauce-labs-bolt-t-shirt'];
  for (const item of itemsToAdd) {
    await page.click(`id=add-to-cart-${item}`);
  }

  // Navigate to the cart page and take a snapshot
  await page.click('id=shopping_cart_container');
  await expect(page).toHaveScreenshot('cart-page.png');
});

test('Visual snapshot of checkout page', async ({ page }) => {
  // Navigate to checkout
  await page.click('id=checkout');
  await page.waitForTimeout(2000);
  await page.fill('id=first-name', 'sudarsan');
  await page.fill('id=last-name', 'ramachandran');
  await page.fill('id=postal-code', '641012');
  await page.waitForTimeout(2000);
  await page.click('id=continue');

  // Take a snapshot of the checkout page
  await expect(page).toHaveScreenshot('checkout-page.png');
});
