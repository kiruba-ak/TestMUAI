import { test, expect } from '@playwright/test';

test('Drag & Drop Slider validation precise offset', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.click('text=Drag & Drop Sliders');
  await expect(page).toHaveURL(/.*drag-drop-range-sliders-demo/);

  const slider = page.locator('input[type="range"][value="15"]');
  const box = await slider.boundingBox();

  // Slider range is 0–100, width in pixels = box.width
  const pixelsPerUnit = box.width / 100;

  // Target value = 95
  const targetX = box.x + (95 * pixelsPerUnit);
  const centerY = box.y + box.height / 2;

  // Drag knob to target position
  await page.mouse.move(box.x + (15 * pixelsPerUnit), centerY); // start at 15
  await page.mouse.down();
  await page.mouse.move(targetX, centerY, { steps: 10 });
  await page.mouse.up();

  // Validate displayed range value
  await expect(page.locator('#rangeSuccess')).toHaveText('97');

  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'sliderResult2.png'});
});
