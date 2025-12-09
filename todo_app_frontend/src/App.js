import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/todo.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

/**
/ PUBLIC_INTERFACE
 * App - Entry point for the Todo application UI.
 * Provides theme toggle, renders the main card, and wires hooks to components.
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme attribute for potential future theming
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const { todos, loading, error, busyIds, addTodo, toggleTodo, editTodo, deleteTodo, refresh } = useTodos();

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="header">
            <div>
              <h1 className="title">Simple Todo</h1>
              <p className="subtitle">A clean, modern todo list with edit, delete, and complete.</p>
            </div>
            <div className="toolbar">
              <button className="btn secondary" onClick={refresh} aria-label="Refresh todos">Refresh</button>
              <button
                className="btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>

          <TodoInput onAdd={addTodo} />

          {error && (
            <div className="status error" role="alert">
              {error}
            </div>
          )}

          <TodoList
            todos={todos}
            busyIds={busyIds}
            loading={loading}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          <div className="footerNote">Backend: http://localhost:3001 • Frontend: http://localhost:3000</div>
        </div>
      </div>
    </div>
  );
}

export default App;
