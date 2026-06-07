const FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

export function FilterTabs({ currentFilter, onChangeFilter }) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-2" aria-label="Todo 상태 필터">
      {FILTER_OPTIONS.map((filter) => {
        const isActive = filter.value === currentFilter;

        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            className={`min-h-10 rounded-lg border font-bold ${
              isActive
                ? "border-[var(--primary-color)] bg-[var(--primary-color)] text-white shadow-[var(--primary-glow)]"
                : "border-[var(--line-color)] bg-[var(--control-background)] text-[var(--text-color)]"
            }`}
            onClick={() => onChangeFilter(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
