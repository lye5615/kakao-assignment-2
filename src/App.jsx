import { AppHeader } from "./components/AppHeader.jsx";
import { FilterTabs } from "./components/FilterTabs.jsx";
import { TodoForm } from "./components/TodoForm.jsx";
import { TodoList } from "./components/TodoList.jsx";
import { WeekView } from "./components/WeekView.jsx";
import { useTodos } from "./hooks/useTodos.js";

export default function App() {
  const {
    currentFilter,
    filteredTodos,
    selectedDate,
    selectedWeekDates,
    todoCountsByDate,
    actions,
  } = useTodos();

  return (
    <main className="min-h-screen bg-[#0f0c18] px-4 py-8 text-[#f8f6ff]">
      <section className="mx-auto w-full max-w-3xl rounded-lg border border-white/20 bg-[#181225]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
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
        <section className="mt-5 border-t border-white/20 pt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">할 일</h2>
            <span className="text-sm text-[#c7bfdc]">{filteredTodos.length}개</span>
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
