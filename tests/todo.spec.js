const { test, expect } = require('../fixtures');
const { uniqueTodo } = require('./testData');

test('adds a todo and clears the input', { tag: '@smoke' }, async ({ todo }) => {
  const text = uniqueTodo('prepare interview demo');
  await todo.add(text);
  await expect(todo.items).toHaveText([text]);
  await expect(todo.items.getByRole('checkbox')).not.toBeChecked();
  await expect(todo.input).toHaveValue('');
});

test('marks a todo as completed', { tag: '@smoke' }, async ({ todo }) => {
  const text = uniqueTodo('review assertions');
  await todo.add(text);
  await todo.items.getByRole('checkbox').check();
  await expect(todo.items.getByRole('checkbox')).toBeChecked();
  await expect(todo.items).toHaveClass(/completed/);
});

test('deletes a todo and leaves the other one', { tag: '@regression' }, async ({ todo }) => {
  const toRemove = uniqueTodo('remove this');
  const toKeep = uniqueTodo('keep this');
  await todo.add(toRemove);
  await todo.add(toKeep);
  const row = todo.items.filter({ hasText: toRemove });
  await row.hover();
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect(todo.items).toHaveText([toKeep]);
});

test('filters active and completed and all todos', { tag: '@regression' }, async ({ todo, page }) => {
  const active = uniqueTodo('active task');
  const completed = uniqueTodo('completed task');
  await todo.add(active);
  await todo.add(completed);
  await todo.items.filter({ hasText: completed }).getByRole('checkbox').check();

  await page.getByRole('link', { name: 'Active' }).click();
  await expect(todo.items).toHaveText([active]);

  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(todo.items).toHaveText([completed]);

  await page.getByRole('link', { name: 'All' }).click();
  await expect(todo.items).toHaveText([active, completed]);
});

test('rejects whitespace only todo', { tag: '@regression' }, async ({ todo }) => {
  const text = uniqueTodo('task');
  await todo.add(text);
  await todo.add('   ');
  await expect(todo.items).toHaveText([text]);
});

test('persists todo state after reload', { tag: '@regression' }, async ({ todo, page }) => {
  const text = uniqueTodo('persist me');
  await todo.add(text);
  await todo.items.getByRole('checkbox').check();
  await page.reload();
  await expect(todo.items).toHaveText([text]);
  await expect(todo.items.getByRole('checkbox')).toBeChecked();
  await expect(todo.items).toHaveClass(/completed/);
});
