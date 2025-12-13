import { test, expect } from '@playwright/test';

test('La page d\'accueil a le bon titre et contient Nasticks', async ({ page }) => {
  // 👇 ON MET L'ADRESSE COMPLÈTE ICI POUR FORCER LE LIEN
  await page.goto('http://localhost:4321/');

  await expect(page).toHaveTitle(/Nasticks/);
  await expect(page.getByRole('heading', { name: 'Nasticks' })).toBeVisible();

  // Si tu as mis "4+ ans", garde cette ligne, sinon supprime-la
  await expect(page.getByText('4+ ans d\'exp.')).toBeVisible();
});