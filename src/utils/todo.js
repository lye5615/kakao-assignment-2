export function createTodoId() {
  if (globalThis.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getFilteredTodos(todos, selectedDate, currentFilter) {
  const dateTodos = todos.filter((todo) => todo.date === selectedDate);

  if (currentFilter === "active") {
    return dateTodos.filter((todo) => !todo.isCompleted);
  }

  if (currentFilter === "completed") {
    return dateTodos.filter((todo) => todo.isCompleted);
  }

  return dateTodos;
}

export function getTodoCountsByDate(todos) {
  return todos.reduce((countsByDate, todo) => {
    countsByDate[todo.date] = (countsByDate[todo.date] || 0) + 1;
    return countsByDate;
  }, {});
}
