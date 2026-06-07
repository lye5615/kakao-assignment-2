import { formatDisplayDate, getDateNumber, getWeekdayName, isToday } from "../utils/date.js";

export function WeekView({ selectedDate, selectedWeekDates, todoCountsByDate, onMoveWeek, onSelectDate }) {
  return (
    <section className="mb-5" aria-label="주간 Todo 날짜 선택">
      <div className="mb-3 grid gap-2 sm:grid-cols-[92px_1fr_92px]">
        <button className="rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] py-3 font-bold" type="button" onClick={() => onMoveWeek(-1)}>
          이전 주
        </button>
        <p className="rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] py-3 text-center font-bold">
          {formatDisplayDate(selectedDate)}
        </p>
        <button className="rounded-lg border border-[var(--line-color)] bg-[var(--control-background)] py-3 font-bold" type="button" onClick={() => onMoveWeek(1)}>
          다음 주
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-7">
        {selectedWeekDates.map((dateValue) => {
          const isSelected = dateValue === selectedDate;
          const today = isToday(dateValue);

          return (
            <button
              key={dateValue}
              type="button"
              className={`grid min-h-[74px] gap-1 rounded-lg border p-2 text-center ${
                isSelected
                  ? "border-[var(--primary-color)] bg-[var(--primary-color)]/40 shadow-[var(--primary-glow)]"
                  : "border-[var(--line-color)] bg-[var(--control-background)]"
              } ${today ? "border-[var(--text-color)]" : ""}`}
              onClick={() => onSelectDate(dateValue)}
            >
              <span className="text-xs font-bold text-[var(--subtle-text)]">{getWeekdayName(dateValue)}</span>
              <span className={today ? "text-lg font-bold text-[var(--text-color)]" : "text-lg font-bold"}>{getDateNumber(dateValue)}</span>
              <span className="text-xs text-[var(--subtle-text)]">{todoCountsByDate[dateValue] || 0}개</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
