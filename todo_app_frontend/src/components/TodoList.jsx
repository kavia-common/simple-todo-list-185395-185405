import '../styles/todo.css';
import TodoItem from './TodoItem';

// PUBLIC_INTERFACE
export default function TodoList({ todos, busyIds, onToggle, onDelete, onEdit, loading }) {
  /** Renders the list of todos and handles loading/empty states. */
  if (loading) {
    return <div className="empty" role="status" aria-live="polite">Loading your tasks...</div>;
  }

  if (!todos || todos.length === 0) {
    return <div className="empty">No tasks yet. Add your first one above!</div>;
  }

  return (
    <ul className="list" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          busy={busyIds?.has?.(t.id)}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
