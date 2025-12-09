import { useEffect, useRef, useState } from 'react';
import '../styles/todo.css';

// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggle, onDelete, onEdit, busy }) {
  /** Renders a single todo item with checkbox, title, inline edit, and action buttons. */
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  useEffect(() => {
    setTitle(todo.title || '');
  }, [todo.title]);

  const save = async () => {
    if (!title.trim() || title === todo.title) {
      setIsEditing(false);
      return;
    }
    await onEdit?.(todo.id, title.trim());
    setIsEditing(false);
  };

  return (
    <li className={`item ${todo.completed ? 'completed' : ''}`} aria-live="polite">
      <input
        className="checkbox"
        type="checkbox"
        checked={!!todo.completed}
        onChange={(e) => onToggle?.(todo.id, e.target.checked)}
        disabled={busy}
        aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />

      <div className="titleWrap">
        {isEditing ? (
          <div className="inlineEdit">
            <input
              ref={inputRef}
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              aria-label="Edit todo title"
            />
            <button className="btn secondary" onClick={save} type="button">
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="itemTitle">{todo.title}</div>
            <div className="meta">{todo.completed ? 'Completed' : 'Pending'}</div>
          </>
        )}
      </div>

      <div className="actions">
        {!isEditing && (
          <button
            className="iconBtn"
            title="Edit"
            onClick={() => setIsEditing(true)}
            disabled={busy}
            aria-label={`Edit ${todo.title}`}
          >
            ✏️
          </button>
        )}
        <button
          className={`iconBtn error`}
          title="Delete"
          onClick={() => onDelete?.(todo.id)}
          disabled={busy}
          aria-label={`Delete ${todo.title}`}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
