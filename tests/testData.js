function uniqueTodo(label) {
  return `${label} ${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

module.exports = { uniqueTodo };
