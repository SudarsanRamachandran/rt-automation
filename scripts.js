const { chromium } = require('playwright');

(async () => {
    // Launch Chromium browser in a non-headless mode for visibility
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to the homepage and wait until the login button is visible
        await page.goto("https://www.saucedemo.com/");
        await page.waitForTimeout(2000);

        // Login process
        await page.fill('#user-name', 'visual_user'); 
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.waitForTimeout(2000);

        // Wait for inventory page to load (ensure items are visible)
        await page.waitForSelector('.inventory_item');
        await page.waitForTimeout(2000);

        // Open the hamburger menu and select "All Items"
        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('#inventory_sidebar_link'); // Wait for the menu option
        await page.waitForTimeout(2000);
        await page.click('#inventory_sidebar_link');
        await page.click('#react-burger-cross-btn'); // Close the menu

        // Sort items by Z to A
        await page.selectOption('[data-test="product-sort-container"]', 'za');
        await page.waitForSelector('.inventory_item'); // Ensure items are sorted
        await page.waitForTimeout(2000);

        // Sort items by price (high to low)
        await page.selectOption('[data-test="product-sort-container"]', 'hilo');
        await page.waitForSelector('.inventory_item'); // Ensure items are sorted
        await page.waitForTimeout(2000);

        // Add two items to the cart
        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
        await page.waitForTimeout(2000);

        // Go to the cart and verify checkout button appears
        await page.click('#shopping_cart_container');
        await page.waitForSelector('#checkout');
        await page.click('#checkout');
        await page.waitForTimeout(2000);

        // Fill in checkout information and proceed
        await page.fill('#first-name', 'sudarsan');
        await page.fill('#last-name', 'ramachandran');
        await page.fill('#postal-code', '641012');
        await page.waitForTimeout(2000);
        await page.click('#continue');
        await page.waitForTimeout(2000);

        // Wait for the finish button and click it
        await page.waitForSelector('#finish');
        await page.click('#finish');

        // Wait for confirmation page
        await page.waitForSelector('.complete-header');
        console.log('Checkout complete.');

    } catch (error) {
        console.error('Error during automation:', error);
    } finally {
        // Ensure browser is closed, even if an error occurs
        await browser.close();
    }
})();

