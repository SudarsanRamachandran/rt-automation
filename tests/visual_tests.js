// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   // Runs before each test and signs in each page.
//   await page.goto('https://www.saucedemo.com/');
//   await page.waitForTimeout(2000);
//   await page.fill('id=user-name', 'visual_user');
//   await page.fill('id=password', 'secret_sauce');
//   await page.click('id=login-button');
//   await page.waitForTimeout(2000);
// });

// test('Visual snapshot of inventory page', async ({ page }) => {
//   // Navigate to the inventory page
//   await page.click('id=react-burger-menu-btn');
//   await page.click('id=inventory_sidebar_link');
//   await page.waitForTimeout(2000);
//   await page.click('id=react-burger-cross-btn'); // Close the menu

//   // Capture a visual snapshot of the inventory page
//   await expect(page).toHaveScreenshot('inventory-page.png');
// });

// test('Visual snapshot of cart page', async ({ page }) => {
//   // Add items to the cart
//   const itemsToAdd = ['sauce-labs-backpack', 'sauce-labs-bolt-t-shirt'];
//   for (const item of itemsToAdd) {
//     await page.click(`id=add-to-cart-${item}`);
//   }

//   // Navigate to the cart page and take a snapshot
//   await page.click('id=shopping_cart_container');
//   await expect(page).toHaveScreenshot('cart-page.png');
// });

// test('Visual snapshot of checkout page', async ({ page }) => {
//   // Navigate to checkout
//   await page.click('id=checkout');
//   await page.waitForTimeout(2000);
//   await page.fill('id=first-name', 'sudarsan');
//   await page.fill('id=last-name', 'ramachandran');
//   await page.fill('id=postal-code', '641012');
//   await page.waitForTimeout(2000);
//   await page.click('id=continue');

//   // Take a snapshot of the checkout page
//   await expect(page).toHaveScreenshot('checkout-page.png');
// });

"use strict";

function filteriphone13 (devices) {
  return devices.filter(device => {
    const pattern = /iPhone (\d+)/;
    const match = device.match(pattern);

    if(match) {
      const version = parseInt(match[1] ,10);
      return version === 13;
    }
      return false ;
    });
}

const deviceList = ["Samsung S23", "iPhone 11", "iPhone 13 Pro", "iPhone 15 Plus", "Oppo F9", 
  "iPhone 12", "iPhone 16 Pro Max", "Vivo V21", "iPhone 13"];

  const filteredlist = filteriphone13(deviceList);

  console.log(filteredlist)

  const numbers = [109,6834,472873,783,99,23];

  const ascnumberssort = numbers.sort((a,b) => ( a - b));
  console.log(ascnumberssort);

  const descnumberssort = numbers.sort((a,b) => (b - a));
  console.log(descnumberssort);

  const people = [ 
    {name : 'sudarsan' , age : 26},
    {name : 'Ramachandran' , age : 62},
    {name : 'Sumathi' , age : 58},
    {name : 'kishor' , age : 23}
  ];

  const peoplesort = people.sort((a,b) => (b.age - a.age));
  console.log(peoplesort);

const peoplesortname = people.sort((a,b) => (a.name.localeCompare(b.name)));
console.log(peoplesortname);

  const fruits = [ 'Banana', 'Carrot', 'Pineapple', 'guava', 'mango', 'apple', 'grapes'];

  const sortfruits = fruits.sort((a,b) => (a.toLowerCase().localeCompare(b.toLowerCase())));
  console.log(sortfruits);