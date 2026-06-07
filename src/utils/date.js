export function getDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayDateValue() {
  return getDateValue(new Date());
}

export function getDateFromValue(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function getWeekStartDateValue(dateValue) {
  const date = getDateFromValue(dateValue);
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  date.setDate(date.getDate() + mondayOffset);
  return getDateValue(date);
}

export function getWeekDateValues(weekStartValue) {
  const weekStartDate = getDateFromValue(weekStartValue);

  return Array.from({ length: 7 }, (_, index) => {
    const weekDate = new Date(weekStartDate);

    weekDate.setDate(weekStartDate.getDate() + index);
    return getDateValue(weekDate);
  });
}

export function moveDateByDays(dateValue, dayAmount) {
  const date = getDateFromValue(dateValue);

  date.setDate(date.getDate() + dayAmount);
  return getDateValue(date);
}

export function formatDisplayDate(dateValue) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(getDateFromValue(dateValue));
}

export function getWeekdayName(dateValue) {
  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
  }).format(getDateFromValue(dateValue));
}

export function getDateNumber(dateValue) {
  return getDateFromValue(dateValue).getDate();
}

export function isToday(dateValue) {
  return dateValue === getTodayDateValue();
}
