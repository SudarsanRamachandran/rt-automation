const { test, expect } = require('@playwright/test');

test('Verify Z to A sorting', async ({ page }) => {
    // Step 1: Navigate to saucedemo website and log in
    await page.goto("https://www.saucedemo.com/");
    await page.fill('id=user-name', 'visual_user');  // Fill in the user name
    await page.fill('id=password', 'secret_sauce');  // Fill in the password
    await page.click('id=login-button');              // Click on the login button

    // Step 2: Navigate to the inventory page
    await page.click('id=react-burger-menu-btn');     // Click on the hamburger icon
    await page.click('id=inventory_sidebar_link');    // Click on All items
    await page.click('id=react-burger-cross-btn');    // Close the Menu

    // Step 3: Sort the items from Z to A
    await page.waitForSelector('select[data-test="product-sort-container"]'); // Ensure the dropdown is visible
    await page.selectOption('select[data-test="product-sort-container"]', 'za');  // Sort by Z to A

    // Step 4: Add items to cart
    await page.click('id=add-to-cart-sauce-labs-backpack');  // Add Sauce Labs Backpack to cart
    await page.click('id=add-to-cart-sauce-labs-bolt-t-shirt'); // Add Sauce Labs Bolt T-Shirt to cart
    await page.click('id=shopping_cart_container');            // Click on the shopping cart
    await page.click('id=checkout');                           // Click on Proceed to checkout

    // Step 5: Complete the checkout process
    await page.fill('id=first-name', 'sudarsan');             // Fill first name
    await page.fill('id=last-name', 'ramachandran');          // Fill last name
    await page.fill('id=postal-code', '641012');              // Fill postal code
    await page.click('id=continue');                           // Click continue
    await page.click('id=finish');                             // Click finish

    // Step 6: Verify the sorting order displayed for Z-A on the “All Items” page
    const productNames = await page.$$eval('.inventory_item_name', items => 
        items.map(item => item.textContent)
    );

    // Copy and sort the names in reverse alphabetical order for validation
    const sortedNames = [...productNames].sort().reverse();

    // Validate if the displayed order matches the expected Z to A order
    if (JSON.stringify(productNames) === JSON.stringify(sortedNames)) {
        console.log("Product names are correctly sorted Z to A.");
    } else {
        console.error("Product names are NOT correctly sorted Z to A.");
        console.log("Actual order:", productNames);
        console.log("Expected order:", sortedNames);
    }
});

test('Verify price order high-low', async ({ page }) => {
    // Step 1: Navigate to saucedemo website and log in
    await page.goto("https://www.saucedemo.com/");
    await page.fill('id=user-name', 'visual_user');  // Fill in the user name
    await page.fill('id=password', 'secret_sauce');  // Fill in the password
    await page.click('id=login-button');            // Click on the login button

    // Step 2: Navigate to the inventory page
    await page.click('id=react-burger-menu-btn');   // Click on the hamburger icon
    await page.click('id=inventory_sidebar_link');  // Click on All items
    await page.click('id=react-burger-cross-btn');  // Close the Menu

    // Step 3: Select price sorting from high to low
    await page.click('css=*[data-test="product-sort-container"]');  // Open sorting dropdown
    await page.selectOption('select[data-test="product-sort-container"]', 'hilo');  // Sort by High to Low

    // Step 4: Validate if the product prices are sorted in high to low order
    const productPrices = await page.$$eval('.inventory_item_price', items => 
        items.map(item => parseFloat(item.textContent.replace('$', '')))
    );

    // Sort prices in descending order for comparison
    const sortedPrices = [...productPrices].sort((a, b) => b - a);

    // Check if the prices are sorted correctly
    if (JSON.stringify(productPrices) === JSON.stringify(sortedPrices)) {
        console.log("Product prices are correctly sorted High to Low.");
    } else {
        console.error("Product prices are NOT correctly sorted High to Low.");
        console.log("Actual order:", productPrices);
        console.log("Expected order:", sortedPrices);
    }
});

test('Cart and Checkout', async ({ page }) => {
    // Step 1: Navigate to the website and log in
    await page.goto("https://www.saucedemo.com/");
    await page.fill('id=user-name', 'visual_user');
    await page.fill('id=password', 'secret_sauce');
    await page.click('id=login-button');

    // Step 2: Navigate to the inventory page
    await page.click('id=react-burger-menu-btn');
    await page.click('id=inventory_sidebar_link');
    await page.click('id=react-burger-cross-btn'); // Close the Menu

    // Step 3: Add items to the cart
    const itemsToAdd = ['sauce-labs-backpack', 'sauce-labs-bolt-t-shirt'];
    for (const item of itemsToAdd) {
        await page.click(`id=add-to-cart-${item}`);
    }

    // Step 4: Validate that the cart contains 2 items
    await page.click('id=shopping_cart_container');
    await page.waitForSelector('.shopping_cart_badge', { state: 'visible', timeout: 15000 });
    const cartBadge = await page.textContent('.shopping_cart_badge');

    if (cartBadge === '2') {
        console.log("Cart contains the correct number of items.");
    } else {
        console.error("Cart does NOT contain the correct number of items.");
    }

    // Step 5: Proceed to checkout
    await page.click('id=checkout');
    await page.fill('id=first-name', 'sudarsan');
    await page.fill('id=last-name', 'ramachandran');
    await page.fill('id=postal-code', '641012');
    await page.click('id=continue');

    // Step 6: Validate the subtotal
    const cartItems = await page.$$eval('.inventory_item_price', items => 
        items.map(item => parseFloat(item.textContent.replace('$', '')))
    );

    const expectedSubtotal = cartItems.reduce((sum, price) => sum + price, 0);
    console.log('Expected Subtotal:', expectedSubtotal);

    await page.waitForSelector('.summary_subtotal_label', { timeout: 15000 });
    const displayedSubtotalLabel = await page.textContent('.summary_subtotal_label');
    console.log('Displayed Subtotal Label:', displayedSubtotalLabel);

    const displayedSubtotal = parseFloat(displayedSubtotalLabel.replace('Item total: $', ''));
    console.log('Displayed Subtotal:', displayedSubtotal);

    if (displayedSubtotal === expectedSubtotal) {
        console.log("The subtotal is correct.");
    } else {
        console.error(`Subtotal mismatch: Expected ${expectedSubtotal}, but got ${displayedSubtotal}.`);
    }

    // Step 7: Complete the checkout process
    await page.click('id=finish');
    console.log('Checkout complete.');
});

