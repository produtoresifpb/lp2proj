// @ts-check
const { test, expect } =  require('@playwright/test');
const crypto = require('crypto');
const CPF = require('cpf');

const hash = crypto.randomBytes(20).toString('hex');
const cpf = CPF.generate(false, false);

test('A conta deve ser criada', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/registro');
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill('Mateus');
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill(cpf);
  await page.getByRole('textbox', { name: 'Data de Nascimento' }).fill('2006-08-10');
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(`${hash}@teste.teste`);
  await page.getByRole('textbox', { name: 'Senha', exact: true }).click();
  await page.getByRole('textbox', { name: 'Senha', exact: true }).fill('123456789');
  await page.getByRole('textbox', { name: 'Confirmação de Senha' }).click();
  await page.getByRole('textbox', { name: 'Confirmação de Senha' }).fill('123456789');
  await page.getByRole('button', { name: 'Registrar' }).click();
  await page.getByRole('textbox', { name: 'Código' }).fill('12345');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page.locator('#swal2-title')).toContainText('Conta criada com sucesso');
});