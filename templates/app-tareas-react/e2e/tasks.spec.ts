// ============================================================
// Lab 12B: Tests E2E con Playwright
// ============================================================
// Archivo de ejemplo para testing E2E y Visual Regression
// El alumno escribira los tests siguiendo el guion del Lab 12B

import { test, expect } from '@playwright/test';

test.describe('Sistema de Tareas - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header with title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Sistema de Tareas');
  });

  test('should show initial tasks', async ({ page }) => {
    const taskCards = page.locator('.task-card');
    await expect(taskCards).toHaveCount(3);
  });

  test('should add a new task', async ({ page }) => {
    const input = page.locator('.task-form__input');
    const select = page.locator('.task-form__select');
    const button = page.locator('.task-form__button');

    await input.fill('Nueva tarea de prueba');
    await select.selectOption('high');
    await button.click();

    const newTask = page.locator('.task-card').filter({ hasText: 'Nueva tarea de prueba' });
    await expect(newTask).toBeVisible();
  });

  test('should change task status', async ({ page }) => {
    const firstTask = page.locator('.task-card').first();
    const statusSelect = firstTask.locator('.task-card__status');

    await statusSelect.selectOption('completed');

    await expect(firstTask).toHaveClass(/task-card--completed/);
  });

  test('should delete a task', async ({ page }) => {
    const initialCount = await page.locator('.task-card').count();

    const firstTask = page.locator('.task-card').first();
    await firstTask.locator('.task-card__delete').click();

    await expect(page.locator('.task-card')).toHaveCount(initialCount - 1);
  });

  test('should filter tasks by status', async ({ page }) => {
    // Test para Lab 4A - filtros
    // await page.locator('.filter-pending').click();
    // await expect(page.locator('.task-card')).toHaveCount(1);
  });
});

test.describe('Visual Regression', () => {
  test('header matches screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.app-header')).toHaveScreenshot('header.png');
  });

  test('task list matches screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.task-list')).toHaveScreenshot('task-list.png');
  });
});
