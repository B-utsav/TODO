import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('Please enter a title!');
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      completed: false
    });

    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
        />
      </div>
      <button type="submit" className="btn-add">
        + Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
