import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto('https://www.saucedemo.com/');
  await page.fill('id=user-name', 'visual_user');
  await page.fill('id=password', 'secret_sauce');
  await page.waitForTimeout(2000);
  await page.click('id=login-button');
  await page.waitForTimeout(2000);
});

test('Accessibility check on inventory page', async ({ page }) => {
  // Navigate to the inventory page
  await page.click('id=react-burger-menu-btn');
  await page.click('id=inventory_sidebar_link');
  await page.waitForTimeout(2000);
  await page.click('id=react-burger-cross-btn'); // Close the menu

  // Get the accessibility tree
  const snapshot = await page.accessibility.snapshot();
  console.log(snapshot);  // Prints the entire accessibility tree to the console for debugging

  // You can also assert certain properties, for example:
  expect(snapshot.name).toBe('Swag Labs');
});

test('Accessibility check on checkout page', async ({ page }) => {
  // Add items to the cart and proceed to checkout
  const itemsToAdd = ['sauce-labs-backpack', 'sauce-labs-bolt-t-shirt'];
  for (const item of itemsToAdd) {
    await page.click(`id=add-to-cart-${item}`);
  }
  await page.click('id=shopping_cart_container');
  await page.waitForTimeout(2000);
  await page.click('id=checkout');
  await page.waitForTimeout(2000);
  await page.fill('id=first-name', 'sudarsan');
  await page.fill('id=last-name', 'ramachandran');
  await page.fill('id=postal-code', '641012');
  await page.waitForTimeout(2000);
  await page.click('id=continue');

  // Get the accessibility tree on the checkout page
  const snapshot = await page.accessibility.snapshot();
  console.log(snapshot);

  // Optionally, assert a specific part of the accessibility tree
  expect(snapshot.role).toBe('document');
});
