import { TodoItem } from "./TodoItem.jsx";

export function TodoList({ todos, onDeleteTodo, onToggleTodo, onUpdateTodo }) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-white/20 px-4 py-7 text-center text-[#c7bfdc]">
        선택한 날짜에 등록된 Todo가 없습니다.
      </p>
    );
  }

  return (
    <ul className="grid gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}
