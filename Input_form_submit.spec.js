// tests/input_form_submit.spec.js
import { test, expect } from '@playwright/test';

test('Input Form Submit validation', async ({ page }) => {
  // Step 1: Open Selenium Playground and click “Input Form Submit”
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.click('text=Input Form Submit');
  await expect(page).toHaveURL(/.*input-form-demo/);

  // Step 2: Click “Submit” without filling any field
  await page.click('button:has-text("Submit")');

  // Step 3: Assert browser validation message on Name field
  const validationMessage = await page.locator('input[name="name"]').evaluate(el => el.validationMessage);
  expect(validationMessage).toContain('Please fill'); // cross-browser safe

  // Step 4–5: Fill all fields
  await page.fill('#name', 'John Doe');
  await page.fill('#inputEmail4','john@example.com');
  await page.fill('#inputPassword4', 'Password123');
  await page.fill('#company', 'TestMu AI');
  await page.fill('#websitename', 'https://testmuai.com');
  await page.selectOption('select[name="country"]', { label: 'United States' });
  await page.fill('#inputCity', 'New York');
  await page.fill('#inputAddress1', '123 Main St');
  await page.fill('#inputAddress2', 'Suite 100');
  await page.fill('#inputState', 'NY');
  await page.fill('#inputZip', '10001');

  // Step 6: Submit the form
  await page.click('button:has-text("Submit")');

  // Step 7: Validate success message
  await expect(page.locator('.success-msg')).toHaveText(
    'Thanks for contacting us, we will get back to you shortly.'
  );

  // Optional: Screenshot for proof
  await page.screenshot({ path: 'formSubmitResult.png', fullPage: true });

  await page.waitForTimeout(3000);
});
