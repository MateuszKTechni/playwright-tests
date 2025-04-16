import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.morele.net/');
  await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
  await page.getByRole('searchbox', { name: 'wyszukiwarka' }).fill('Laptop Apple MacBook Air 13');
  await page.getByRole('button', { name: 'szukaj' }).click();
  await page.getByRole('link', { name: 'Laptop Apple MacBook Air 13 M2 / 16 GB / 256 GB (MC7X4ZE/A)' }).first().click();

  await page.waitForTimeout(1500);

  const addToCartButton = await page.locator('a.btn.btn-primary-dark.btn-add-to-basket').first();
  await addToCartButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
    console.log('Przycisk "Dodaj do koszyka" nie stał się widoczny w ciągu 5 sekund.');
  });

  if (await addToCartButton.isVisible()) {
    await addToCartButton.click();

    await page.getByRole('button', { name: 'Nie, dziękuję', timeout: 3000 }).catch(() => {});
    await page.getByRole('button', { name: 'zamknij', exact: true, timeout: 3000 }).catch(() => {});
  } else {
    console.log('Nie można było znaleźć przycisku "Dodaj do koszyka". Sprawdź selektor!');
  }
});