import { formatDisplayDate, getTodayDateValue, isToday } from "../utils/date.js";

export function AppHeader({ selectedDate, onMoveDate, onSelectDate }) {
  const selectedDateLabel = isToday(selectedDate)
    ? `오늘, ${formatDisplayDate(selectedDate)}`
    : formatDisplayDate(selectedDate);

  return (
    <header className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <div>
        <p className="mb-2 text-sm font-bold text-[#d8ccff]">Productivity</p>
        <h1 className="text-3xl font-bold">Todo List</h1>
        <p className="mt-2 text-sm font-bold text-[#f8f6ff]">{selectedDateLabel}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          className="min-h-10 rounded-lg border border-white/20 bg-white/10 px-3 font-bold"
          type="button"
          onClick={() => onMoveDate(-1)}
        >
          이전
        </button>
        <button
          className="min-h-10 rounded-lg border border-[#672be0] bg-[#672be0] px-3 font-bold text-white"
          type="button"
          onClick={() => onSelectDate(getTodayDateValue())}
        >
          오늘
        </button>
        <button
          className="min-h-10 rounded-lg border border-white/20 bg-white/10 px-3 font-bold"
          type="button"
          onClick={() => onMoveDate(1)}
        >
          다음
        </button>
      </div>
    </header>
  );
}
