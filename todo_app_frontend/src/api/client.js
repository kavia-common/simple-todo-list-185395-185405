const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * Wrap fetch with JSON handling, error normalization, and CORS support.
 * All requests default to JSON content-type, and responses are parsed as JSON when possible.
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  let body = options.body;
  if (body && typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  const resp = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body,
    credentials: 'include',
    mode: 'cors',
  });

  let data = null;
  const text = await resp.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!resp.ok) {
    const message = (data && (data.message || data.error)) || `Request failed with status ${resp.status}`;
    const error = new Error(message);
    error.status = resp.status;
    error.data = data;
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export const api = {
  /** Get all todos */
  // PUBLIC_INTERFACE
  async getTodos() {
    return request('/todos');
  },
  /** Create a todo */
  // PUBLIC_INTERFACE
  async addTodo(title) {
    return request('/todos', {
      method: 'POST',
      body: { title, completed: false },
    });
  },
  /** Update a todo */
  // PUBLIC_INTERFACE
  async updateTodo(id, updates) {
    return request(`/todos/${id}`, {
      method: 'PUT',
      body: updates,
    });
  },
  /** Toggle completion */
  // PUBLIC_INTERFACE
  async toggleTodo(id, completed) {
    return request(`/todos/${id}`, {
      method: 'PATCH',
      body: { completed },
    });
  },
  /** Delete a todo */
  // PUBLIC_INTERFACE
  async deleteTodo(id) {
    return request(`/todos/${id}`, { method: 'DELETE' });
  },
};

export default api;
