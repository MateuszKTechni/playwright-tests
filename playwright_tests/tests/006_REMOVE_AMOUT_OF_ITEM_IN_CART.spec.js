import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.morele.net/');
    await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
    await page.getByRole('searchbox', { name: 'wyszukiwarka' }).fill('Laptop Apple MacBook Air 13');
    await page.getByRole('button', { name: 'szukaj' }).click();
    await page.getByRole('link', { name: 'Laptop Apple MacBook Air 13 M2 / 16 GB / 256 GB (MC7X4ZE/A)' }).first().click();

    try {
        await page.locator('button.btn.btn-primary-dark.btn-add-to-basket', { timeout: 2000 }).first().click();
        await page.getByRole('button', { name: 'Nie, dziękuję', timeout: 2000 }).catch(() => {});
        await page.getByRole('button', { name: 'zamknij', exact: true, timeout: 2000 }).catch(() => {});
        await page.getByRole('button', { name: 'koszyk', exact: true }).click();

        const quantityInput = page.locator('.quantity-input input');
        await quantityInput.click();
        await quantityInput.fill('2');
        await page.locator('.basket-summary').click();

        const decreaseButton = page.locator('.quantity-input').locator('.btn-minus');
        await decreaseButton.click();
        await page.waitForTimeout(500);
        await expect(quantityInput).toHaveValue('1', { timeout: 2000 });

    } catch (error) {
        console.error(error);
    }
});