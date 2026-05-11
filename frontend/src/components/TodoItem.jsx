import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleUpdate = () => {
    if (editTitle.trim() === '') {
      alert('Title cannot be empty!');
      return;
    }

    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      completed: todo.completed
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          className="edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className="edit-textarea"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          rows="2"
        />
        <div className="edit-actions">
          <button className="btn-save" onClick={handleUpdate}>
            ✓ Save
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            ✕ Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button
          className="btn-edit"
          onClick={() => setIsEditing(true)}
          title="Edit"
        >
          ✏️
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this todo?')) {
              onDelete(todo.id);
            }
          }}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
