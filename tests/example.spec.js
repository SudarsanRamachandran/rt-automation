import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Common sign-in process that runs before each test
  await page.goto('https://www.saucedemo.com/');
  await page.waitForTimeout(2000);
  await page.fill('#user-name', 'visual_user');    // Fill in the user name
  await page.fill('#password', 'secret_sauce');    // Fill in the password
  await page.waitForTimeout(2000);
  await page.click('#login-button');               // Click on the login button
  await page.waitForTimeout(2000);
  await page.waitForSelector('.inventory_item');   // Wait for inventory page to load
});

test('Verify Z to A sorting', async ({ page }) => {
  // Sort the items from Z to A
  await page.click('#react-burger-menu-btn');          // Open the menu
  await page.waitForTimeout(2000);
  await page.click('#inventory_sidebar_link');         // Click on All Items
  await page.click('#react-burger-cross-btn');         // Close the menu
  await page.waitForTimeout(2000);
  await page.selectOption('select[data-test="product-sort-container"]', 'za');  // Sort by Z to A

  // Verify sorting order
  const productNames = await page.$$eval('.inventory_item_name', items => 
    items.map(item => item.textContent)
  );
  const sortedNames = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedNames);
});

test('Verify price order high to low', async ({ page }) => {
  // Step 1: Select sorting option 'High to Low'
  await page.selectOption('select[data-test="product-sort-container"]', 'hilo');  // Sort by High to Low

  // Step 2: Wait for the sorting effect (Ensure prices have been updated)
  await page.waitForFunction(() => {
    const prices = [...document.querySelectorAll('.inventory_item_price')].map(item =>
      parseFloat(item.textContent.replace('$', ''))
    );
    return prices.every((price, i, arr) => i === 0 || arr[i - 1] >= price);
  }, { timeout: 10000 }); // Timeout set for 10 seconds

  // Step 3: Capture the prices after sorting
  const productPrices = await page.$$eval('.inventory_item_price', items =>
    items.map(item => parseFloat(item.textContent.replace('$', '')))
  );

  // Step 4: Manually sort the captured prices (High to Low) for comparison
  const sortedPrices = [...productPrices].sort((a, b) => b - a);

  // Step 5: Verify if the captured product prices match the expected sorted prices
  expect(productPrices).toEqual(sortedPrices);
});

test('Cart and Checkout', async ({ page }) => {
  // Add items to the cart
  const itemsToAdd = ['sauce-labs-backpack', 'sauce-labs-bolt-t-shirt'];
  for (const item of itemsToAdd) {
    await page.click(`#add-to-cart-${item}`);
  }

  // Validate that the cart contains 2 items
  await page.click('#shopping_cart_container');
  const cartBadge = await page.textContent('.shopping_cart_badge');
  expect(cartBadge).toBe('2');

  // Proceed to checkout and fill out the form
  await page.click('#checkout');
  await page.waitForTimeout(2000);
  await page.fill('#first-name', 'sudarsan');
  await page.fill('#last-name', 'ramachandran');
  await page.fill('#postal-code', '641012');
  await page.waitForTimeout(2000);
  await page.click('#continue');

  // Validate the subtotal
  const cartItems = await page.$$eval('.inventory_item_price', items => 
    items.map(item => parseFloat(item.textContent.replace('$', '')))
  );
  const expectedSubtotal = cartItems.reduce((sum, price) => sum + price, 0);
  const displayedSubtotalLabel = await page.textContent('.summary_subtotal_label');
  const displayedSubtotal = parseFloat(displayedSubtotalLabel.replace('Item total: $', ''));
  expect(displayedSubtotal).toBe(expectedSubtotal);

  // Complete the checkout
  await page.click('#finish');
});

