# rt-automation

(https://www.saucedemo.com/) automation code using Playwright(Nodejs) for rt-campus :

Description:
This repository contains automation scripts for interacting with the (https://www.saucedemo.com/) using Playwright and Node.js. The scripts automate various tasks such as logging in, searching for products, adding them to the cart and wishlist, and performing checkout actions.

Setup:

1.Clone the Repository:

bash
git clone https://github.com/SudarsanRamachandran/rt-automation.git

2.Install Dependencies:
Navigate to the project directory and install the required dependencies using npm:

cd rt-automation
npm install

3.Configuration:
Update the test script (example.spec.js & scripts.js) with your Amazon login credentials and any other necessary configurations.

Running the Code Locally:
To run the automation script locally, follow these steps:

1. To run the automation scripts :
   node scripts.js

2. To run the automation script validation tests:
   npx playwright test

3. To run a specicfic test :
   npx playwright test --grep "TestName"

4. To view the test results:
   View the html file in playwright-report.
