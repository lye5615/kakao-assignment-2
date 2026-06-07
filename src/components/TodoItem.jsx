import { useState } from "react";

export function TodoItem({ todo, onDeleteTodo, onToggleTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDate, setEditDate] = useState(todo.date);
  const [editMessage, setEditMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!editText.trim() || !editDate) {
      setEditMessage("수정할 Todo 내용과 날짜를 입력해주세요.");
      return;
    }

    onUpdateTodo(todo.id, editText.trim(), editDate);
    setEditMessage("");
    setIsEditing(false);
  };

  const openEditMode = () => {
    setEditText(todo.text);
    setEditDate(todo.date);
    setEditMessage("");
    setIsEditing(true);
  };

  const closeEditMode = () => {
    setEditMessage("");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] p-3">
        <form className="grid gap-2 sm:grid-cols-[1fr_160px_auto]" onSubmit={handleSubmit}>
          <textarea
            className="min-h-10 rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] px-3 py-2 outline-none focus:border-[var(--primary-color)]"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
          />
          <input
            className="min-h-10 rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] px-3 outline-none [color-scheme:dark] focus:border-[var(--primary-color)] in-[main[data-theme='light']]:[color-scheme:light]"
            type="date"
            value={editDate}
            onChange={(event) => setEditDate(event.target.value)}
          />
          <div className="flex gap-2">
            <button className="rounded-lg bg-[var(--primary-color)] px-3 font-bold text-white shadow-[var(--primary-glow)]" type="submit">
              저장
            </button>
            <button
              className="rounded-lg bg-[var(--control-background)] px-3 font-bold"
              type="button"
              onClick={closeEditMode}
            >
              취소
            </button>
          </div>
          {editMessage && (
            <p className="text-sm font-bold text-[var(--danger-color)] sm:col-span-3">{editMessage}</p>
          )}
        </form>
      </li>
    );
  }

  return (
    <li className="grid gap-3 rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] p-3 sm:grid-cols-[1fr_auto]">
      <span className={`whitespace-pre-wrap leading-normal ${todo.isCompleted ? "text-[var(--completed-text)] line-through" : ""}`}>
        {todo.text}
      </span>
      <div className="flex gap-2">
        <button className="rounded-lg bg-[var(--control-background)] px-3 py-2 font-bold" type="button" onClick={openEditMode}>
          수정
        </button>
        <button
          className={`rounded-lg px-3 py-2 font-bold ${todo.isCompleted ? "bg-[var(--primary-color)] text-white shadow-[var(--primary-glow)]" : "bg-[var(--control-background)]"}`}
          type="button"
          onClick={() => onToggleTodo(todo.id)}
        >
          {todo.isCompleted ? "취소" : "완료"}
        </button>
        <button className="rounded-lg bg-[var(--control-background)] px-3 py-2 font-bold" type="button" onClick={() => onDeleteTodo(todo.id)}>
          삭제
        </button>
      </div>
    </li>
  );
}
