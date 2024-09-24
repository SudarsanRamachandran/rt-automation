# rt-automation

(https://www.saucedemo.com/) automation code using Playwright(Nodejs) for rt-campus :

Description:
This repository contains automation scripts for interacting with the (https://www.saucedemo.com/) using Playwright and Node.js. The scripts automate various tasks such as logging in, searching for products, adding them to the cart and wishlist, and performing checkout actions.

Prerequisites:
Node.js (version 14 or higher) - Download Node.js

npm (comes with Node.js) or yarn

Playwright - The project uses Playwright for browser automation. Playwright supports the following browsers:
Chromium
Firefox
WebKit
Playwright will automatically install the browser binaries for these browsers when running tests.

Optional (for video and screenshot recording):
ffmpeg - for audio-video recordings (if you need to combine screen and voice recordings).

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

2. To run the validation tests:
   npx playwright test

3. To run a specicfic test :
   npx playwright test --grep "testName"

4. To run the visual_tests :
   npx playwright test tests/visual_tests.js/testname

5. To run the accesibility_tests :
   npx playwright test tests/accesibility_tests.js/testname

6. To view the test results:
   npx playwright show-report
   or
   View the html file in playwright-report.

   Logs: Playwright logs are automatically generated for each test. You can see detailed logs in your terminal during test execution.

   After running the tests, the traces can be viewed using the following command:
   npx playwright show-trace trace.zip

7. To run tests in headless mode (default):
   npx playwright test --headless

8. To run the tests in headed mode,
   npx playwright test --headed

9. Run Tests with Video Recording:
   npx playwright test --headed
