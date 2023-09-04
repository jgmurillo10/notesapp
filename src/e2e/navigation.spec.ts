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
