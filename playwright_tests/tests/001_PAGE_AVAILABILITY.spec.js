import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.morele.net/');
  await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
});