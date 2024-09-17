import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTodo = () => {
    if (input.trim() && dueDate) {
      setTodos([...todos, { text: input, dueDate, completed: false }]);
      setInput('');
      setDueDate('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Todo App</h2>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="datetime-local"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleAddTodo}>
          Add Todo
        </button>

        <ul className="list-group mt-4">
          {todos.length === 0 && <p className="text-center">No tasks available</p>}
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`}
            >
              <div>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <br />
                <small className="text-muted">
                  Due: {new Date(todo.dueDate).toLocaleString()}
                </small>
              </div>
              <div>
                <button
                  className="btn btn-outline-success btn-sm me-2"
                  onClick={() => toggleComplete(index)}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteTodo(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
