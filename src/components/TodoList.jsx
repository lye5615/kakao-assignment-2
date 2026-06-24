import { TodoItem } from "./TodoItem.jsx";

export function TodoList({
  editingId,
  todos,
  onDeleteTodo,
  onStartEditingTodo,
  onStopEditingTodo,
  onToggleTodo,
  onUpdateTodo,
}) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--line-color)] px-4 py-7 text-center text-[var(--subtle-text)]">
        선택한 날짜에 등록된 Todo가 없습니다.
      </p>
    );
  }

  return (
    <ul className="grid gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          isEditing={editingId === todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onStartEditingTodo={onStartEditingTodo}
          onStopEditingTodo={onStopEditingTodo}
          onToggleTodo={onToggleTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}
