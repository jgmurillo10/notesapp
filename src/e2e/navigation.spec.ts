import { test, expect } from '@playwright/test';

test('should navigate to the Assistants page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Assistants');
  await expect(page).toHaveURL('/en/assistants');
  await expect(page.locator('h1')).toContainText('Assistants');
});

test('should navigate to the Home page and redirect to english locale', async ({
  page,
}) => {
  await page.goto('/');
  await page.click('text=Assistants');
  await expect(page).toHaveURL('/en');
  await expect(page.locator('h1')).toContainText(
    'AI assistants to improve your productivity',
  );
});

test('should have Home, Assistants and the Playground pages in the menu', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL('/en');
  await expect(page.locator('nav')).toContainText('Home');
  await expect(page.locator('nav')).toContainText('Assistants');
  await expect(page.locator('nav')).toContainText('Playground');
});

test('should navigate to the Playground page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Playground');
  await expect(page).toHaveURL('/en/playground');
  await expect(page.locator('h1')).toContainText('Playground');
});
