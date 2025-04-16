import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.morele.net/');
  await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
  await page.getByRole('link', { name: 'ODBIERZ KOD RABATOWY' }).click();
  await page.locator('#moveToNewsletter').getByRole('textbox').click();
  await page.locator('#moveToNewsletter').getByRole('textbox').fill('jankowalski@gmail.com');
  await page.locator('#moveToNewsletter #newsletter_form span').first().click();
  await page.locator('#moveToNewsletter').getByRole('button', { name: 'Zapisz mnie' }).click();
});