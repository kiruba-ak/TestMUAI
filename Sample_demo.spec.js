// tests/simpleFormDemo.spec.js
import { test, expect } from '@playwright/test';

test('Simple Form Demo validation', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.click('text=Simple Form Demo');
  await expect(page).toHaveURL(/.*simple-form-demo/);

  const message = "Welcome to TestMu AI";
  await page.fill('#user-message', message);
  await page.click('button:has-text("Get Checked Value")');

  const displayedMessage = await page.textContent('#message');
  expect(displayedMessage).toBe(message);

});
