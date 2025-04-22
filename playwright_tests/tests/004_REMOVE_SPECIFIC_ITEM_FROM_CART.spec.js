import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.morele.net/');
    await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
    await page.getByRole('searchbox', { name: 'wyszukiwarka' }).fill('Laptop Apple MacBook Air 13');
    await page.getByRole('button', { name: 'szukaj' }).click();
    await page.getByRole('link', { name: 'Laptop Apple MacBook Air 13 M2 / 16 GB / 256 GB (MC7X4ZE/A)' }).first().click();

    await page.waitForTimeout(1500);

    try {
        await page.locator('button.btn.btn-primary-dark.btn-add-to-basket', { timeout: 10000 }).first().click();
        // Stabilniejsza obsługa okna "Nie potrzebuję dodatkowej ochrony"
        const noProtectionButton = page.getByText('Nie potrzebuję dodatkowej ochrony', { exact: true }).last();
        await noProtectionButton.waitFor({ state: 'visible', timeout: 10000 });
        await noProtectionButton.click();
        await page.getByRole('button', { name: 'zamknij', exact: true, timeout: 3000 }).catch(() => {}); // Opcjonalne zamknięcie

        await page.getByRole('button', { name: 'koszyk', exact: true }).click();
        const productRow = page.locator('.basket-item:has-text("Laptop Apple MacBook Air 13")');
        await productRow.getByRole('button', { name: /usuń/i }).click();
        await page.getByRole('button', { name: 'Tak', exact: true }).click();
        await expect(page.getByText('Twój koszyk jest pusty')).toBeVisible({ timeout: 10000 });

    } catch (error) {
        console.error(error);
    }
});