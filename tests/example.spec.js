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
  await page.fill('#ap_email', ''); //Enter email address inside the quotes
  await page.click('#continue');
  //await page.waitForTimeout(2000);
  await page.fill('#ap_password', ''); //Enter password inside the quotes
  await page.click('#signInSubmit');
  await page.waitForTimeout(5000);

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
     test.setTimeout(150000);
     await page.goto("https://amazon.in");
     page.setDefaultNavigationTimeout(60000)

     // Click on the account link in the navigation bar to login
     await page.click('id=nav-link-accountList-nav-line-1');
     await page.waitForTimeout(3000);
     
     // Fill in login details
     await page.fill('#ap_email', '');//Enter email address inside the quotes
     await page.click('#continue');
     await page.waitForTimeout(2000);
     await page.fill('#ap_password', '');//Enter password inside the quotes
     await page.click('#signInSubmit');
     await page.waitForTimeout(5000);
     await page.click('//a[contains(text(),"Best Sellers")]'); // Click on Best Sellers
     await page.waitForTimeout(3000);
     await page.click('css=._p13n-zg-nav-tree-all_style_zg-browse-item__1rdKf:nth-child(11) > a'); // Click on Electronics category
     await page.waitForTimeout(5000);
     await page.click('css=#B07WHRHBLH .\_cDEzb_p13n-sc-css-line-clamp-4_2q2cc'); // Click on a product in the category
     await page.waitForTimeout(5000);
     await page.click('id=add-to-wishlist-button-submit') // Click on Add to wishlist
     await page.waitForTimeout(3000);
     await page.waitForSelector('//a[contains(text(),"View Your List")]', { timeout: 120000 });
     await page.click('//a[contains(text(),"View Your List")]'); // Click on View Your List button
     await page.waitForTimeout(5000);
     await page.click('//a[contains(text(),"Add to Cart")]')  // Click on the Add to cart button
     await page.waitForTimeout(5000);
     await page.click('css=.g-cart-checkout-btn > .a-button-inner span') // Click on the Proceed to checkout button
     await page.waitForTimeout(5000);
 
     // Validation: Check if the checkout page is loaded
     const checkoutPageTitle = await page.title();
     expect(checkoutPageTitle).toContain('Select a delivery address');
 });
 
 // Test for Search Functionality
 test('Search Functionality - Validate Search Result', async ({ page }) => {
     // Navigate to Amazon.in
     await page.goto("https://amazon.in");
     test.setTimeout(120000);
     page.setDefaultNavigationTimeout(60000)
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
     await page.fill('#ap_email', '');//Enter email address inside the quotes
     await page.click('#continue');
     await page.waitForTimeout(2000);
     await page.fill('#ap_password', '');//Enter password inside the quotes
     await page.click('#signInSubmit');
     await page.waitForTimeout(5000); 
     await page.click('//a[contains(text(),"Best Sellers")]'); // Click on Best Sellers
     await page.waitForTimeout(3000);
     await page.click('css=._p13n-zg-nav-tree-all_style_zg-browse-item__1rdKf:nth-child(11) > a'); // Click on Electronics category
     await page.waitForTimeout(5000);
     await page.click('css=#B07WHRHBLH .\_cDEzb_p13n-sc-css-line-clamp-4_2q2cc'); // Click on a product in the category
     await page.waitForTimeout(5000);
     await page.click('id=add-to-wishlist-button-submit'); // Click on Add to Wishlist button
     await page.waitForTimeout(3000);
     await page.waitForSelector('//a[contains(text(),"View Your List")]', { timeout: 120000 });
     await page.click('//a[contains(text(),"View Your List")]'); // Click on View Your List button
     await page.waitForTimeout(5000);
 
     // Validation: Check if the product is added to wishlist
     const wishlistItem = await page.waitForSelector('.a-link-normal');
     expect(wishlistItem).not.toBeNull();
 });
 





