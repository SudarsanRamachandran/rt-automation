// // @ts-check
// const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

const { test, expect } = require('@playwright/test');

test('amazon login validation', async ({ page }) => {
  // Navigate to Amazon login page
  await page.goto('https://amazon.in');
  test.setTimeout(120000);
  page.setDefaultNavigationTimeout(60000)

  // Click on the account link to go to the login page
  await page.click('#nav-link-accountList-nav-line-1');
  await page.waitForTimeout(3000);

  // Fill in login details
  await page.fill('#ap_email', 'sudarsanramachandran7@gmail.com');
  await page.click('#continue');
  //await page.waitForTimeout(2000);
  await page.fill('#ap_password', 'Kishore@78');
  await page.click('#signInSubmit');
  //await page.waitForTimeout(5000);

  // Validate login by checking the presence of an element in the account menu that indicates the user is logged in
  const accountMenu = page.locator('#nav-link-accountList');
  await expect(accountMenu).toBeVisible();
  await page.waitForTimeout(12000);

  // Open the account dropdown to check for elements only available when logged in
  await accountMenu.hover();
  await page.waitForTimeout(2000);

  // Check for an element that indicates the user is logged in, e.g., "Your Orders"
  const yourOrders = page.locator('text=Your Orders');
  await expect(yourOrders).toBeVisible();
 });


 // Test for Product Checkout functionality
 test('Product Checkout - Should be able to add product to cart and perform checkout action', async ({ page }) => {
     // Navigate to Amazon.in
     test.setTimeout(120000);
     await page.goto("https://amazon.in");
     page.setDefaultNavigationTimeout(60000)
   
     // Click on the account link in the navigation bar to login
     await page.click('id=nav-link-accountList-nav-line-1');
     await page.waitForTimeout(3000);
     // Fill in login details
     await page.fill('#ap_email', 'sudarsanramachandran7@gmail.com');
     await page.click('#continue');
     //await page.waitForTimeout(2000);
     await page.fill('#ap_password', 'Kishore@78');
     await page.click('#signInSubmit');
     //await page.waitForTimeout(5000);
 
     // Your steps for adding product to cart and performing checkout action
     await page.click('css=.nav-a:nth-child(6)'); // Click on Best Sellers
     await page.waitForTimeout(3000);
     await page.click('css=._p13n-zg-nav-tree-all_style_zg-browse-item__1rdKf:nth-child(11) > a'); // Click on Electronics category
     await page.waitForTimeout(5000);
     await page.click('css=#B07WHRHBLH .\_cDEzb_p13n-sc-css-line-clamp-4_2q2cc'); // Click on a product in the category
     await page.waitForTimeout(5000);
     await page.click('css=.a-section > #addToCart_feature_div #add-to-cart-button'); // Click on Add to Cart button
     await page.waitForTimeout(5000);
     await page.click('css=#sc-buy-box-ptc-button .a-button-input'); // Click on Proceed to Checkout button
     await page.waitForTimeout(5000);
 
     // Validation: Check if the checkout page is loaded
     const checkoutPageTitle = await page.title();
     expect(checkoutPageTitle).toContain('Checkout');
 });
 
 // Test for Search Functionality
 test('Search Functionality - Validate Search Result', async ({ page }) => {
     // Navigate to Amazon.in
     await page.goto("https://amazon.in");
     test.setTimeout(120000);
     page.setDefaultNavigationTimeout(60000)
   
     // Your steps for searching a product and validating search results
     await page.fill('#twotabsearchtextbox', 'laptops'); // Fill in the search bar with 'laptops'
     await page.waitForTimeout(5000);
     await page.press('#twotabsearchtextbox', 'Enter'); // Press "Enter" key
     await page.waitForTimeout(5000);
 
     // Validation: Check if search results are displayed
     const searchResults = await page.$$('.s-main-slot');
     expect(searchResults.length).toBeGreaterThan(0);
 });
 
 // Test for Wishlist Functionality
 test('Wishlist Functionality - Validate Product Wishlist functionality', async ({ page }) => {
     // Navigate to Amazon.in
     await page.goto("https://amazon.in");
     test.setTimeout(120000);
     page.setDefaultNavigationTimeout(60000)
   
     // Click on the account link in the navigation bar to login
     await page.click('id=nav-link-accountList-nav-line-1');
     await page.waitForTimeout(3000);

      //Fill in login details
     await page.fill('#ap_email', 'sudarsanramachandran7@gmail.com');
     await page.click('#continue');
     await page.waitForTimeout(2000);
     await page.fill('#ap_password', 'Kishore@78');
     await page.click('#signInSubmit');
     await page.waitForTimeout(5000);
 
     // Your steps for adding product to wishlist and validating wishlist functionality
     await page.click('css=.nav-a:nth-child(6)'); // Click on Best Sellers
     await page.waitForTimeout(3000);
     await page.click('css=._p13n-zg-nav-tree-all_style_zg-browse-item__1rdKf:nth-child(11) > a'); // Click on Electronics category
     await page.waitForTimeout(5000);
     await page.click('css=#B07WHRHBLH .\_cDEzb_p13n-sc-css-line-clamp-4_2q2cc'); // Click on a product in the category
     await page.waitForTimeout(5000);
     await page.click('id=add-to-wishlist-button-submit'); // Click on Add to Wishlist button
     await page.waitForTimeout(3000);
     await page.click('css=#huc-view-your-list-button .a-button-text'); // Click on View Your List button
     await page.waitForTimeout(5000);
 
     // Validation: Check if the product is added to wishlist
     const wishlistItem = await page.waitForSelector('.a-link-normal');
     expect(wishlistItem).not.toBeNull();
 });
 





