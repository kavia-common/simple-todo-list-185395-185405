# Todo App Frontend (React)

A modern, responsive Todo app UI that connects to the backend at `http://localhost:3001`. It supports adding, listing, editing, deleting, and toggling completion of todos.

## Quick Start

1. Install
   npm install

2. Configure backend URL (optional)
   Create a `.env` file in this folder if your backend URL differs:
   REACT_APP_API_BASE_URL=http://localhost:3001

3. Run (port 3000)
   npm start

Open http://localhost:3000 in your browser.

## Features

- Add new todos
- Edit, delete, and toggle complete
- Loading and error states
- Responsive design
- Themed using:
  - Primary: #3b82f6
  - Success: #06b6d4
  - Secondary: #64748b
  - Error: #EF4444

## Project Structure

- src/api/client.js: API client
- src/hooks/useTodos.js: Global state hook for todos
- src/components/TodoInput.jsx: Add form
- src/components/TodoItem.jsx: Single todo item with edit/delete/toggle
- src/components/TodoList.jsx: List renderer
- src/styles/todo.css: Themed styles
- src/App.js: Main app

## Notes

- Ensure your backend enables CORS for http://localhost:3000
- If you change the backend port/host, set REACT_APP_API_BASE_URL accordingly.
