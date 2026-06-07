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
            className={`min-h-10 rounded-lg border font-bold ${
              isActive
                ? "border-[#672be0] bg-[#672be0] text-white shadow-[0_0_22px_rgba(103,43,224,0.42)]"
                : "border-white/20 bg-white/10 text-[#f8f6ff]"
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
