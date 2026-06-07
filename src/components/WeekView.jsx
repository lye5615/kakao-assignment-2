import { formatDisplayDate, getDateNumber, getWeekdayName, isToday } from "../utils/date.js";

export function WeekView({ selectedDate, selectedWeekDates, todoCountsByDate, onMoveWeek, onSelectDate }) {
  return (
    <section className="mb-5" aria-label="주간 Todo 날짜 선택">
      <div className="mb-3 grid gap-2 sm:grid-cols-[92px_1fr_92px]">
        <button className="rounded-lg border border-white/20 bg-white/10 py-3 font-bold" type="button" onClick={() => onMoveWeek(-1)}>
          이전 주
        </button>
        <p className="rounded-lg border border-white/20 bg-white/10 py-3 text-center font-bold">
          {formatDisplayDate(selectedDate)}
        </p>
        <button className="rounded-lg border border-white/20 bg-white/10 py-3 font-bold" type="button" onClick={() => onMoveWeek(1)}>
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
                  ? "border-[#672be0] bg-[#672be0]/40 shadow-[0_0_22px_rgba(103,43,224,0.42)]"
                  : "border-white/20 bg-white/10"
              } ${today ? "border-white" : ""}`}
              onClick={() => onSelectDate(dateValue)}
            >
              <span className="text-xs font-bold text-[#c7bfdc]">{getWeekdayName(dateValue)}</span>
              <span className={today ? "text-lg font-bold text-white" : "text-lg font-bold"}>{getDateNumber(dateValue)}</span>
              <span className="text-xs text-[#c7bfdc]">{todoCountsByDate[dateValue] || 0}개</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
