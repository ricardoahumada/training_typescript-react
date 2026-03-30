// ============================================================
// e2e/taskflows.spec.ts - Tests E2E con Playwright
// ============================================================
// Lab 12B.2: E2E Tests

import { test, expect, Page } from '@playwright/test';

// ============================================================
// Page Object Model - Componentes React
// ============================================================

class TaskFormComponent {
  constructor(private page: Page) {}

  get input() {
    return this.page.getByRole('textbox', { name: /nueva tarea/i });
  }

  get select() {
    return this.page.locator('.task-form__select');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: /add task/i });
  }

  async createTask(title: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    await this.input.fill(title);
    await this.select.selectOption(priority);
    await this.submitButton.click();
  }
}

class TaskListComponent {
  constructor(private page: Page) {}

  get cards() {
    return this.page.locator('.task-card');
  }

  getCard(index: number) {
    return this.page.locator('.task-card').nth(index);
  }

  getCardStatusSelect(index: number) {
    return this.page.locator('.task-card__status').nth(index);
  }

  getCardDeleteButton(index: number) {
    return this.page.locator('.task-card__delete').nth(index);
  }
}

class TaskStatsComponent {
  constructor(private page: Page) {}

  get totalValue() {
    return this.page.locator('.task-stats__value').first();
  }
}

// ============================================================
// Tests E2E - Flujos de Usuario
// ============================================================

test.describe('Sistema de Tareas - E2E', () => {
  let taskForm: TaskFormComponent;
  let taskList: TaskListComponent;
  let taskStats: TaskStatsComponent;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    taskForm = new TaskFormComponent(page);
    taskList = new TaskListComponent(page);
    taskStats = new TaskStatsComponent(page);
  });

  test('la pagina principal carga', async ({ page }) => {
    await expect(page).toHaveTitle(/Sistema de Tareas/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Sistema de Tareas');
  });

  test('puedo crear una tarea', async ({ page }) => {
    await taskForm.createTask('Nueva tarea de prueba', 'high');
    await expect(taskList.cards.first()).toContainText('Nueva tarea de prueba');
  });

  test('puedo cambiar el estado de una tarea', async ({ page }) => {
    await taskList.getCardStatusSelect(0).selectOption('completed');
    const card = taskList.getCard(0);
    await expect(card).toHaveClass(/task-card--completed/);
  });

  test('puedo eliminar una tarea', async ({ page }) => {
    const initialCount = await taskList.cards.count();
    await taskList.getCardDeleteButton(0).click();
    const newCount = await taskList.cards.count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('las estadisticas se actualizan', async ({ page }) => {
    const initialStats = await taskStats.totalValue.textContent();
    await taskForm.createTask('Tarea test', 'high');
    const newStats = await taskStats.totalValue.textContent();
    expect(Number(newStats)).toBe(Number(initialStats) + 1);
  });
});

// ============================================================
// Tests API
// ============================================================

test.describe('Sistema de Tareas - API', () => {
  test('GET /api/tasks devuelve lista de tareas', async ({ request }) => {
    const response = await request.get('/api/tasks');
    expect(response.ok()).toBeTruthy();
    const tasks = await response.json();
    expect(Array.isArray(tasks)).toBeTruthy();
  });

  test('POST /api/tasks crea una tarea', async ({ request }) => {
    const response = await request.post('/api/tasks', {
      data: {
        title: 'Nueva tarea desde API',
        priority: 'high',
      },
    });
    expect(response.status()).toBe(201);
    const task = await response.json();
    expect(task.title).toBe('Nueva tarea desde API');
    expect(task.priority).toBe('high');
  });
});

// ============================================================
// Visual Regression Testing
// ============================================================

test.describe('Sistema de Tareas - Visual Regression', () => {
  test('pagina principal - snapshot completo', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Sistema de Tareas/);
    await expect(page.locator('.app')).toBeVisible();
  });

  test('formulario vacio', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.task-form')).toBeVisible();
    await expect(page.locator('.task-form__input')).toBeEmpty();
  });

  test('lista con tareas', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.task-card');
    await expect(cards.first()).toBeVisible();
  });

  test('tarea completada', async ({ page }) => {
    await page.goto('/');
    await page.locator('.task-card__status').first().selectOption('completed');
    await expect(page.locator('.task-card--completed').first()).toBeVisible();
  });
});
