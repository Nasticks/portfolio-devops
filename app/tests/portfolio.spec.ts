import { test, expect } from '@playwright/test';

test('La page d\'accueil a le bon titre et contient Nasticks', async ({ page }) => {
  // 👇 CORRECTION : On utilise '/' pour dire "la racine du site configuré"
  // Playwright utilisera automatiquement le baseURL du fichier de config
  await page.goto('/');

  // Vérifications
  await expect(page).toHaveTitle(/Nasticks/);

  // Vérifie qu'un titre (h1, h2...) avec "Nasticks" est visible
  await expect(page.getByRole('heading', { name: 'Nasticks' })).toBeVisible();

  // Optionnel : Si tu as ce texte sur ta page, garde-le, sinon commente-le
  // await expect(page.getByText('4+ ans d\'exp.')).toBeVisible();
});