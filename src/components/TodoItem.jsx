import { useState } from "react";

export function TodoItem({ todo, onDeleteTodo, onToggleTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDate, setEditDate] = useState(todo.date);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!editText.trim() || !editDate) {
      return;
    }

    onUpdateTodo(todo.id, editText.trim(), editDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="rounded-lg border border-white/20 bg-white/10 p-3">
        <form className="grid gap-2 sm:grid-cols-[1fr_160px_auto]" onSubmit={handleSubmit}>
          <textarea
            className="min-h-10 rounded-lg border border-white/20 bg-white/10 px-3 py-2 outline-none"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
          />
          <input
            className="min-h-10 rounded-lg border border-white/20 bg-white/10 px-3 outline-none [color-scheme:dark]"
            type="date"
            value={editDate}
            onChange={(event) => setEditDate(event.target.value)}
          />
          <div className="flex gap-2">
            <button className="rounded-lg bg-[#672be0] px-3 font-bold text-white" type="submit">
              저장
            </button>
            <button
              className="rounded-lg bg-white/10 px-3 font-bold"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="grid gap-3 rounded-lg border border-white/20 bg-white/10 p-3 sm:grid-cols-[1fr_auto]">
      <span className={`whitespace-pre-wrap leading-normal ${todo.isCompleted ? "text-[#c7bfdc] line-through" : ""}`}>
        {todo.text}
      </span>
      <div className="flex gap-2">
        <button className="rounded-lg bg-white/10 px-3 py-2 font-bold" type="button" onClick={() => setIsEditing(true)}>
          수정
        </button>
        <button
          className={`rounded-lg px-3 py-2 font-bold ${todo.isCompleted ? "bg-[#672be0] text-white" : "bg-white/10"}`}
          type="button"
          onClick={() => onToggleTodo(todo.id)}
        >
          {todo.isCompleted ? "취소" : "완료"}
        </button>
        <button className="rounded-lg bg-white/10 px-3 py-2 font-bold" type="button" onClick={() => onDeleteTodo(todo.id)}>
          삭제
        </button>
      </div>
    </li>
  );
}
