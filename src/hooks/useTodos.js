import { useEffect, useMemo, useState } from "react";
import { createTodoId, getFilteredTodos, getTodoCountsByDate } from "../utils/todo.js";
import { getTodayDateValue, getWeekDateValues, getWeekStartDateValue, moveDateByDays } from "../utils/date.js";

const TODO_STORAGE_KEY = "todo-react-items";
const TODO_VIEW_STORAGE_KEY = "todo-react-view";

function loadStoredTodos() {
  const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (!storedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(storedTodos);

    if (!Array.isArray(parsedTodos)) {
      return [];
    }

    return parsedTodos.map((todo) => ({
      ...todo,
      date: todo.date || getTodayDateValue(),
    }));
  } catch {
    return [];
  }
}

function loadStoredViewState() {
  const todayDate = getTodayDateValue();
  const fallbackViewState = {
    selectedDate: todayDate,
    weekStartDate: getWeekStartDateValue(todayDate),
  };
  const storedViewState = localStorage.getItem(TODO_VIEW_STORAGE_KEY);

  if (!storedViewState) {
    return fallbackViewState;
  }

  try {
    const parsedViewState = JSON.parse(storedViewState);
    const selectedDate = parsedViewState.selectedDate || fallbackViewState.selectedDate;
    const weekStartDate = parsedViewState.weekStartDate || getWeekStartDateValue(selectedDate);

    return {
      selectedDate,
      weekStartDate,
    };
  } catch {
    return fallbackViewState;
  }
}

export function useTodos() {
  const [storedViewState] = useState(loadStoredViewState);
  const [todos, setTodos] = useState(loadStoredTodos);
  const [selectedDate, setSelectedDate] = useState(storedViewState.selectedDate);
  const [weekStartDate, setWeekStartDate] = useState(storedViewState.weekStartDate);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const selectedWeekDates = useMemo(() => getWeekDateValues(weekStartDate), [weekStartDate]);
  const filteredTodos = useMemo(() => getFilteredTodos(todos, selectedDate, currentFilter), [todos, selectedDate, currentFilter]);
  const todoCountsByDate = useMemo(() => getTodoCountsByDate(todos), [todos]);

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(
      TODO_VIEW_STORAGE_KEY,
      JSON.stringify({
        selectedDate,
        weekStartDate,
      })
    );
  }, [selectedDate, weekStartDate]);

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
    setEditingId((currentEditingId) => (currentEditingId === todoId ? null : currentEditingId));
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
    setEditingId(null);
  };

  const changeFilter = (nextFilter) => {
    setCurrentFilter(nextFilter);
    setEditingId(null);
  };

  const moveWeek = (weekAmount) => {
    const nextWeekStartDate = moveDateByDays(weekStartDate, weekAmount * 7);

    setWeekStartDate(nextWeekStartDate);
    setSelectedDate(nextWeekStartDate);
    setEditingId(null);
  };

  const moveDate = (dayAmount) => {
    const nextDate = moveDateByDays(selectedDate, dayAmount);

    setSelectedDate(nextDate);
    setWeekStartDate(getWeekStartDateValue(nextDate));
    setEditingId(null);
  };

  const selectDate = (nextDate) => {
    setSelectedDate(nextDate);
    setWeekStartDate(getWeekStartDateValue(nextDate));
    setEditingId(null);
  };

  const startEditingTodo = (todoId) => {
    setEditingId(todoId);
  };

  const stopEditingTodo = () => {
    setEditingId(null);
  };

  return {
    currentFilter,
    editingId,
    filteredTodos,
    selectedDate,
    selectedWeekDates,
    todoCountsByDate,
    actions: {
      addTodo,
      changeFilter,
      deleteTodo,
      moveDate,
      moveWeek,
      selectDate,
      startEditingTodo,
      stopEditingTodo,
      toggleTodo,
      updateTodo,
    },
  };
}
