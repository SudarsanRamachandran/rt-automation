const { chromium } = require('playwright');

(async () => {
    // Launch Chromium browser with headless mode disabled
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to www.saucedemo.com
        await page.goto("https://www.saucedemo.com/");
        await page.waitForTimeout(2000); // Wait to see the homepage

        // Login process
        await page.fill('id=user-name', 'visual_user');
        await page.fill('id=password', 'secret_sauce');
        await page.click('id=login-button');
        await page.waitForTimeout(2000); // Wait to see the login response

        // Open and navigate the menu
        await page.click('id=react-burger-menu-btn');
        await page.waitForTimeout(2000); // Wait to see the menu open
        await page.click('id=inventory_sidebar_link');
        await page.waitForTimeout(2000); // Wait to see the inventory page
        await page.click('id=react-burger-cross-btn'); // Close the menu
        await page.waitForTimeout(2000); // Wait to see the menu close

        // Sort items
        await page.click('css=*[data-test="product-sort-container"]');
        await page.waitForTimeout(2000); // Wait to see the sorting options
        await page.selectOption('select[data-test="product-sort-container"]', 'za'); // Sort by Z to A
        await page.waitForTimeout(2000); // Wait to see the sorting applied
        await page.selectOption('select[data-test="product-sort-container"]', 'lohi'); // Sort by low to high
        await page.waitForTimeout(2000); // Wait to see the sorting applied

        // Add items to cart
        await page.click('id=add-to-cart-sauce-labs-backpack');
        await page.waitForTimeout(2000); // Wait to see item added
        await page.click('id=add-to-cart-sauce-labs-bolt-t-shirt');
        await page.waitForTimeout(2000); // Wait to see item added

        // Go to the shopping cart
        await page.click('id=shopping_cart_container');
        await page.waitForTimeout(2000); // Wait to see the cart page
        await page.click('id=checkout');
        await page.waitForTimeout(2000); // Wait to see the checkout page

        // Fill out the checkout form
        await page.fill('id=first-name', 'sudarsan');
        await page.fill('id=last-name', 'ramachandran');
        await page.fill('id=postal-code', '641012');
        await page.click('id=continue');
        await page.waitForTimeout(2000); // Wait to see the checkout summary
        await page.click('id=finish');
        await page.waitForTimeout(2000); // Wait to see the finish confirmation

        console.log('Checkout complete.');
    } catch (error) {
        console.error('Error during automation:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
})();
