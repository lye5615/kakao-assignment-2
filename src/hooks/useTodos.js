import { useEffect, useMemo, useState } from "react";
import { createTodoId, getFilteredTodos, getTodoCountsByDate } from "../utils/todo.js";
import { getTodayDateValue, getWeekDateValues, getWeekStartDateValue, moveDateByDays } from "../utils/date.js";

const TODO_STORAGE_KEY = "todo-vanilla-items";

function loadStoredTodos() {
  const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (!storedTodos) {
    return [];
  }

  try {
    return JSON.parse(storedTodos).map((todo) => ({
      ...todo,
      date: todo.date || getTodayDateValue(),
    }));
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(loadStoredTodos);
  const [selectedDate, setSelectedDate] = useState(getTodayDateValue);
  const [currentFilter, setCurrentFilter] = useState("all");

  const selectedWeekStart = useMemo(() => getWeekStartDateValue(selectedDate), [selectedDate]);
  const selectedWeekDates = useMemo(() => getWeekDateValues(selectedWeekStart), [selectedWeekStart]);
  const filteredTodos = useMemo(() => getFilteredTodos(todos, selectedDate, currentFilter), [todos, selectedDate, currentFilter]);
  const todoCountsByDate = useMemo(() => getTodoCountsByDate(todos), [todos]);

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((currentTodos) => [
      {
        id: createTodoId(),
        text,
        date: selectedDate,
        isCompleted: false,
      },
      ...currentTodos,
    ]);
  };

  const deleteTodo = (todoId) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  };

  const toggleTodo = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const updateTodo = (todoId, nextText, nextDate) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: nextText, date: nextDate } : todo
      )
    );
  };

  const changeFilter = (nextFilter) => {
    setCurrentFilter(nextFilter);
  };

  const moveWeek = (weekAmount) => {
    setSelectedDate((currentDate) => {
      const currentWeekStart = getWeekStartDateValue(currentDate);

      return moveDateByDays(currentWeekStart, weekAmount * 7);
    });
  };

  return {
    currentFilter,
    filteredTodos,
    selectedDate,
    selectedWeekDates,
    todoCountsByDate,
    actions: {
      addTodo,
      changeFilter,
      deleteTodo,
      moveWeek,
      selectDate: setSelectedDate,
      toggleTodo,
      updateTodo,
    },
  };
}
