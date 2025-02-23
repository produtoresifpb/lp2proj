const { test, expect } =  require('@playwright/test');

test('O codigo de login deve ser errado', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill('adsfeqqee12@dsa.com');
  await page.getByRole('textbox', { name: 'Senha' }).click();
  await page.getByRole('textbox', { name: 'Senha' }).fill('123456789');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('textbox', { name: 'Código' }).fill('1111111111');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page.locator('#swal2-title')).toContainText('Código de verificação incorreto!');
});