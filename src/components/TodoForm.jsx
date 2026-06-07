import { useState } from "react";

const GUIDE_MESSAGES = [
  "헛되이 보낸 오늘 하루는 언젠가 반드시 나에게 복수한다 - 윈스터 처칠",
  "꿈꾸던 나를 상상해보세요",
  "시작이 어렵지 하는 건 쉬워요",
  "멈추지 않는 게 중요해요",
];

export function TodoForm({ onAddTodo }) {
  const [todoText, setTodoText] = useState("");
  const [guideIndex, setGuideIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [isComposingTodoText, setIsComposingTodoText] = useState(false);

  const moveGuideMessage = () => {
    setGuideIndex((currentIndex) => (currentIndex + 1) % GUIDE_MESSAGES.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!todoText.trim()) {
      setMessage(GUIDE_MESSAGES[guideIndex]);
      moveGuideMessage();
      return;
    }

    onAddTodo(todoText.trim());
    setTodoText("");
    setMessage("");
    moveGuideMessage();
  };

  const handleTodoInputKeyDown = (event) => {
    const isComposingText =
      event.isComposing || isComposingTodoText || event.keyCode === 229;

    if (event.key !== "Enter" || event.shiftKey || isComposingText) {
      return;
    }

    event.preventDefault();
    event.currentTarget.form.requestSubmit();
  };

  return (
    <form className="grid gap-2 sm:grid-cols-[1fr_92px]" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todoInput">
        새 Todo 입력
      </label>
      <textarea
        id="todoInput"
        className="min-h-12 resize-y rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] px-4 py-3 leading-normal outline-none placeholder:text-[var(--subtle-text)] focus:border-[var(--primary-color)]"
        rows="1"
        placeholder={GUIDE_MESSAGES[guideIndex]}
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
        onCompositionStart={() => setIsComposingTodoText(true)}
        onCompositionEnd={() => setIsComposingTodoText(false)}
        onKeyDown={handleTodoInputKeyDown}
      />
      <button className="rounded-lg bg-[var(--primary-color)] font-bold text-white shadow-[var(--primary-glow)]" type="submit">
        추가
      </button>
      {message && <p className="text-sm font-bold text-[var(--danger-color)] sm:col-span-2">{message}</p>}
    </form>
  );
}
