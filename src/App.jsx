import { useEffect, useState } from "react";
import { AppHeader } from "./components/AppHeader.jsx";
import { FilterTabs } from "./components/FilterTabs.jsx";
import { TodoForm } from "./components/TodoForm.jsx";
import { TodoList } from "./components/TodoList.jsx";
import { WeekView } from "./components/WeekView.jsx";
import { useTodos } from "./hooks/useTodos.js";

const THEME_STORAGE_KEY = "todo-react-theme";

function loadStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || "dark";
}

export default function App() {
  const [theme, setTheme] = useState(loadStoredTheme);
  const {
    currentFilter,
    filteredTodos,
    selectedDate,
    selectedWeekDates,
    todoCountsByDate,
    actions,
  } = useTodos();
  const isLightTheme = theme === "light";

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <main
      className="min-h-screen px-4 py-8 text-[var(--text-color)] transition-colors"
      data-theme={theme}
    >
      <section className="relative mx-auto w-full max-w-3xl rounded-lg border border-[var(--line-color)] bg-[var(--panel-color)] p-6 shadow-[var(--panel-shadow)]">
        <button
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-[var(--line-color)] bg-[var(--control-background)] text-lg shadow-[var(--soft-glow)]"
          type="button"
          aria-label={isLightTheme ? "다크모드로 변경" : "라이트모드로 변경"}
          onClick={toggleTheme}
        >
          {isLightTheme ? "🌙" : "☀️"}
        </button>
        <AppHeader
          selectedDate={selectedDate}
          onMoveDate={actions.moveDate}
          onSelectDate={actions.selectDate}
        />
        <WeekView
          selectedDate={selectedDate}
          selectedWeekDates={selectedWeekDates}
          todoCountsByDate={todoCountsByDate}
          onMoveWeek={actions.moveWeek}
          onSelectDate={actions.selectDate}
        />
        <TodoForm onAddTodo={actions.addTodo} />
        <section className="mt-5 border-t border-[var(--line-color)] pt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">할 일</h2>
            <span className="text-sm text-[var(--subtle-text)]">{filteredTodos.length}개</span>
          </div>
          <FilterTabs currentFilter={currentFilter} onChangeFilter={actions.changeFilter} />
          <TodoList
            todos={filteredTodos}
            onDeleteTodo={actions.deleteTodo}
            onToggleTodo={actions.toggleTodo}
            onUpdateTodo={actions.updateTodo}
          />
        </section>
      </section>
    </main>
  );
}
