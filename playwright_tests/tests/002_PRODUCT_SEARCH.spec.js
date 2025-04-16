import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.morele.net/');
  await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
  await expect(page.getByRole('searchbox', { name: 'wyszukiwarka' })).toBeVisible({ timeout: 5000 });
  await page.getByRole('searchbox', { name: 'wyszukiwarka' }).focus();
  await page.getByRole('searchbox', { name: 'wyszukiwarka' }).fill('Laptop');
  await page.getByRole('button', { name: 'szukaj' }).click();
  await page.locator('.cat-product-left').first().click();
});