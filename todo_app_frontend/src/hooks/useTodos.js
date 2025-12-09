import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

/**
/ PUBLIC_INTERFACE
 * useTodos - global-like state management using a custom hook.
 * Exposes todos, loading, error, and CRUD actions that call the backend.
 */
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyIds, setBusyIds] = useState(new Set());
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTodo = useCallback(async (title) => {
    if (!title || !title.trim()) return;
    setError(null);
    try {
      const created = await api.addTodo(title.trim());
      setTodos((prev) => [created, ...prev]);
    } catch (e) {
      setError(e.message || 'Failed to add todo');
    }
  }, []);

  const updateBusy = useCallback((id, isBusy) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (isBusy) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const toggleTodo = useCallback(async (id, completed) => {
    updateBusy(id, true);
    setError(null);
    try {
      const updated = await api.toggleTodo(id, completed);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError(e.message || 'Failed to toggle todo');
    } finally {
      updateBusy(id, false);
    }
  }, [updateBusy]);

  const editTodo = useCallback(async (id, title) => {
    if (!title || !title.trim()) return;
    updateBusy(id, true);
    setError(null);
    try {
      const updated = await api.updateTodo(id, { title: title.trim() });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError(e.message || 'Failed to update todo');
    } finally {
      updateBusy(id, false);
    }
  }, [updateBusy]);

  const deleteTodo = useCallback(async (id) => {
    updateBusy(id, true);
    setError(null);
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message || 'Failed to delete todo');
    } finally {
      updateBusy(id, false);
    }
  }, [updateBusy]);

  const state = useMemo(() => ({
    todos,
    loading,
    error,
    busyIds,
  }), [todos, loading, error, busyIds]);

  const actions = useMemo(() => ({
    refresh,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
  }), [refresh, addTodo, toggleTodo, editTodo, deleteTodo]);

  return { ...state, ...actions };
}
