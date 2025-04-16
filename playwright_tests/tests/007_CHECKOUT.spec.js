import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.morele.net/');
  await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
  await page.getByRole('searchbox', { name: 'wyszukiwarka' }).fill('Laptop Apple MacBook Air 13');
  await page.getByRole('button', { name: 'szukaj' }).click();
  await page.getByRole('link', { name: 'Laptop Apple MacBook Air 13 M2 / 16 GB / 256 GB (MC7X4ZE/A)' }).first().click();
  await page.locator('a.btn.btn-primary-dark.btn-add-to-basket').first().waitFor({ state: 'visible' });
  await page.locator('a.btn.btn-primary-dark.btn-add-to-basket').first().click();
  await page.getByRole('button', { name: 'Nie, dziękuję', timeout: 10000 }).catch(() => {});
  await page.getByRole('button', { name: 'zamknij', exact: true, timeout: 10000 }).catch(() => {});
  await page.getByRole('button', { name: 'koszyk', exact: true }).click();
  await page.getByRole('button', { name: 'Wybierz dostawę i płatność' }).click();
  await page.getByText('Kontynuuj bez dodawania usług').click({ timeout: 10000 });
  await page.getByText('Kup bez rejestracji').click({ timeout: 10000 });
  await expect(page.locator('h2:has-text("Dane do wysyłki")')).toBeVisible({ timeout: 15000 });
});