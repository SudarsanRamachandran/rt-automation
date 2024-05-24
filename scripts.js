const {chromium} = require('playwright');

(async ()=> {

 // Launch Chromium browser with headless mode disabled
const browser = await chromium.launch({ headless: false });

// Create a new browsing context
const context = await browser.newContext();

// Create a new page within the browsing context
const page = await context.newPage();

     // Navigate to Amazon.in
     await page.goto("https://amazon.in");

     await page.waitForTimeout(2000);
    
     // Click on the account link in the navigation bar
     await page.click('id=nav-link-accountList-nav-line-1')
     await page.waitForTimeout(3000);

     // Fill in the email field
     await page.fill('id=ap_email','') //Enter email address inside the quotes
     await page.waitForTimeout(3000);

     // Click on the continue button
     await page.click('id=continue')
     await page.waitForTimeout(3000);

     // Fill in the password
     await page.fill('id=ap_password','') //Enter password inside the quotes
     await page.waitForTimeout(3000);

     // Click on the signin button
     await page.click('id=signInSubmit')
     await page.waitForTimeout(20000) //added some extra time to enter otp/captcha if appears

     // Click on the best sellers 
     await page.click('//a[contains(text(),"Best Sellers")]')
     await page.waitForTimeout(3000);

     // Click on the Electronics category
     await page.click('css=.\_p13n-zg-nav-tree-all_style_zg-browse-item__1rdKf:nth-child(11) > a')
     await page.waitForTimeout(5000);

     // Click on the product in the category
     await page.click('css=#B07WHRHBLH .\_cDEzb_p13n-sc-css-line-clamp-4_2q2cc')
     await page.waitForTimeout(5000);

     // Click on Add to wishlist
     await page.click('id=add-to-wishlist-button-submit')
     await page.waitForTimeout(3000);

     // Click on View your list 
     await page.click('//a[contains(text(),"View Your List")]')
     await page.waitForTimeout(5000);

   
     // Click on the Add to cart button
     await page.click('//a[contains(text(),"Add to Cart")]')
     await page.waitForTimeout(5000);

     // Click on the Proceed to checkout button
     await page.click('css=.g-cart-checkout-btn > .a-button-inner span')
     await page.waitForTimeout(5000);

     // Go back to the previous page
     await page.goBack()
     await page.waitForTimeout(3000);

     // Fill in the search bar with laptops
     await page.fill('#twotabsearchtextbox', 'laptops');
     await page.waitForTimeout(5000);

     // Press "Enter" key
     await page.press('#twotabsearchtextbox', 'Enter');
     await page.waitForTimeout(5000);

     // Wait for results to load
     await page.waitForSelector('.s-main-slot', { timeout: 10000 });

     // Close the browser
     await browser.close();

})();

