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

  return (
    <form className="grid gap-2 sm:grid-cols-[1fr_92px]" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todoInput">
        새 Todo 입력
      </label>
      <textarea
        id="todoInput"
        className="min-h-12 resize-y rounded-lg border border-white/20 bg-white/10 px-4 py-3 leading-normal outline-none focus:border-white/60"
        rows="1"
        placeholder={GUIDE_MESSAGES[guideIndex]}
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
      />
      <button className="rounded-lg bg-[#672be0] font-bold text-white" type="submit">
        추가
      </button>
      {message && <p className="text-sm font-bold text-[#ff6363] sm:col-span-2">{message}</p>}
    </form>
  );
}
