import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

const API_URL = '/api/todos/';

const getCsrfToken = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];

  return cookieValue || '';
};

const api = axios.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

api.interceptors.request.use((config) => {
  const token = getCsrfToken();
  if (token) {
    config.headers['X-CSRFToken'] = token;
  }
  return config;
});

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_URL);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running!');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (todoData) => {
    try {
      const response = await api.post(API_URL, todoData);
      setTodos([response.data, ...todos]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  // Update a todo
  const updateTodo = async (id, todoData) => {
    try {
      const response = await api.put(`${API_URL}${id}/`, todoData);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Toggle todo completion
  const toggleComplete = async (id) => {
    try {
      const response = await api.post(`${API_URL}${id}/toggle_complete/`);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      setError(null);
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`${API_URL}${id}/`);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-title">📝 My Todo App</h1>
        <p className="app-subtitle">Stay organized and get things done!</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <TodoForm onAdd={addTodo} />

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleComplete}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        )}

        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(t => t.completed).length}</span>
          <span>Pending: {todos.filter(t => !t.completed).length}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
