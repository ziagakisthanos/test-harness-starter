const { test, expect } = require('../fixtures');

test('adds a todo and clears the input', async ({ todo }) => {
  await todo.add('Prepare interview demo');
  await expect(todo.items).toHaveText(['Prepare interview demo']);
  await expect(todo.items.getByRole('checkbox')).not.toBeChecked();
  await expect(todo.input).toHaveValue('');
});

test('marks a todo as completed', async ({ todo }) => {
  await todo.add('Review assertions');
  await todo.items.getByRole('checkbox').check();
  await expect(todo.items.getByRole('checkbox')).toBeChecked();
  await expect(todo.items).toHaveClass(/completed/);
});

test('deletes a todo and leaves the other one', async ({ todo }) => {
  await todo.add('remove this');
  await todo.add('keep this');
  const row = todo.items.filter({ hasText: 'remove this' });
  await row.hover();
  await row.getByRole('button', { name: 'Delete' }).click();
  await expect(todo.items).toHaveText(['keep this']);
});

test('filters active and completed and all todos', async ({ todo,page }) => {
  await todo.add('active task');
  await todo.add('completed task');
  await todo.items.filter({ hasText: 'completed task'}).getByRole('checkbox').check();

  await page.getByRole('link', { name: 'Active' }).click();
  await expect(todo.items).toHaveText([ 'active task']);

  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(todo.items).toHaveText([ 'completed task']);

  await page.getByRole('link', { name: 'All' }).click();
  await expect(todo.items).toHaveText(['active task', 'completed task']);
})

test('rejects whitespace only todo', async ({ todo }) => {
  await todo.add('task');
  await todo.add('   ');
  await expect(todo.items).toHaveText([ 'task' ]);
})

test('persists todo state after reload', async ({ todo,page }) => {
  await todo.add('persist me');
  await todo.items.getByRole('checkbox').check();
  await page.reload();
  await expect(todo.items).toHaveText(['persist me']);
  await expect(todo.items.getByRole('checkbox')).toBeChecked();
  await expect(todo.items).toHaveClass(/completed/);
}) 


// Exercise: implement filter, reject whitespace, and persist after reload.
// Write them yourself with AI assistance before reading reference/additional-tests.js.
