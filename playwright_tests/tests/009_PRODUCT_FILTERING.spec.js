import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.morele.net/');
  await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
  await page.getByRole('searchbox', { name: 'wyszukiwarka' }).fill('Laptop');
  await page.getByRole('button', { name: 'szukaj' }).click();

  const sortButtonFirst = page.getByRole('button', { name: 'Sortuj', exact: true });
  await expect(sortButtonFirst).toBeVisible({ timeout: 10000 });
  await sortButtonFirst.click();

  const priceHighOption = page.getByRole('button', { name: 'Cena - od najwyższej' });
  await expect(priceHighOption).toBeVisible({ timeout: 10000 });
  await priceHighOption.click();

  const sortButtonSecond = page.getByRole('button', { name: 'Sortuj', exact: true });
  await expect(sortButtonSecond).toBeVisible({ timeout: 10000 });
  await sortButtonSecond.click();

  const defaultSortOption = page.getByRole('button', { name: 'Sortowanie domyślne' });
  await expect(defaultSortOption).toBeVisible({ timeout: 10000 });
  await defaultSortOption.click();
});