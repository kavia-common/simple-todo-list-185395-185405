import { useState } from 'react';
import '../styles/todo.css';

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** This component renders an input and button to add a new todo. */
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim() || busy) return;
    setBusy(true);
    await onAdd?.(value);
    setValue('');
    setBusy(false);
  };

  return (
    <form onSubmit={handleSubmit} className="inputRow" aria-label="Add todo form">
      <input
        className="input"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="New todo title"
      />
      <button type="submit" className="btn" disabled={!value.trim() || busy} aria-busy={busy}>
        {busy ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
