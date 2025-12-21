import { test, expect } from '@playwright/test';

test('La page d\'accueil charge correctement', async ({ page }) => {
  // 1. Aller sur la page d'accueil
  await page.goto('/');

  // 2. Vérifier le titre de la page (balise <title> dans le <head>)
  // Note : Cela dépend de ton Layout.astro, mais "Nasticks" est dans le props title
  await expect(page).toHaveTitle(/Nasticks/);

  // 3. Vérifier la présence du LOGO (C'est un span, pas un titre)
  // On cherche le texte "Nasticks" qui est visible
  await expect(page.locator('.logo-text')).toHaveText('Nasticks');

  // 4. Vérifier le TITRE PRINCIPAL (H1)
  // Ton code a un <h1 class="hero-title">Ingénieur...</h1>
  // On vérifie qu'il contient "Ingénieur"
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ingénieur');

  // 5. Vérifier un lien de navigation
  // On vérifie que le lien "Projets" est présent
  await expect(page.getByRole('link', { name: 'Projets' })).toBeVisible();
});