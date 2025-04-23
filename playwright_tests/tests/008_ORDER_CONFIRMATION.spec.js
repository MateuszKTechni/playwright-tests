import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.morele.net/');
    await page.getByRole('button', { name: 'Akceptuję wszystko' }).click();
    await page.getByRole('searchbox', { name: 'wyszukiwarka' }).fill('Laptop Apple MacBook Air 13');
    await page.getByRole('button', { name: 'szukaj' }).click();
    await page.getByRole('link', { name: 'Laptop Apple MacBook Air 13 M2 / 16 GB / 256 GB (MC7X4ZE/A)' }).first().click();

    try {
        await page.locator('button.btn.btn-primary-dark.btn-add-to-basket', { timeout: 10000 }).first().click();
        
        const noProtectionButton = page.getByText('Nie potrzebuję dodatkowej ochrony', { exact: true }).last();
        await noProtectionButton.waitFor({ state: 'visible', timeout: 1000 });
        await noProtectionButton.click();
        await page.getByRole('button', { name: 'zamknij', exact: true, timeout: 1000 }).catch(() => {}); 

        await page.getByRole('button', { name: 'koszyk', exact: true }).click();

        await page.getByRole('button', { name: 'Wybierz dostawę i płatność' }).click();
        await page.getByText('Kontynuuj bez dodawania usług').click({ timeout: 5000 });
        await page.getByText('Kup bez rejestracji').click({ timeout: 5000 });
        await page.getByRole('textbox', { name: 'imię' }).fill('Jan');
        await page.getByRole('textbox', { name: 'nazwisko' }).fill('Kowalski');
        await page.getByRole('textbox', { name: 'adres e-mail' }).fill('jankowalski@gmail.com');
        await page.getByRole('textbox', { name: 'nr telefonu komórkowego' }).fill('+48 512 789 520');
        await page.getByRole('textbox', { name: 'ulica' }).fill('Narutowicza');
        await page.getByRole('textbox', { name: 'numer domu/lokalu' }).fill('55');
        await page.getByRole('textbox', { name: 'kod pocztowy' }).fill('20-456');
        await page.getByRole('textbox', { name: 'miejscowość' }).fill('Lublin');
        await page.getByText('Lublin', { exact: true }).click();

        const deliveryRadio = page.locator('div:nth-child(2) > .col-10 > .name-col > .form-control-input > .radio > .input').first();
        await expect(deliveryRadio).toBeVisible({ timeout: 1000 });
        await deliveryRadio.click();
        await expect(deliveryRadio).toBeChecked({ timeout: 1000 });

        const blikRadio = page.locator('label').filter({ hasText: 'Blik' }).locator('span').first();
        await expect(blikRadio).toBeVisible({ timeout: 1000 });
        await blikRadio.click();
        await expect(blikRadio).toBeChecked({ timeout: 1000 });

        await page.getByRole('button', { name: 'Przejdź dalej' }).click();
        const termsCheckbox = page.locator('#fixed-box span').first();
        await expect(termsCheckbox).toBeVisible({ timeout: 1000 });
        await termsCheckbox.click();
        await page.getByRole('button', { name: 'Zamawiam i płacę' }).click();
        await page.getByRole('link', { name: 'Przejdź do płatności', timeout: 1500 }).click();

    } catch (error) {
        console.error(error);
    }
});