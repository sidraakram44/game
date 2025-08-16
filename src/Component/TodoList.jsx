import React, { useEffect, useState } from 'react'
import './TodoList.css'

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem('todo-list')
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      return []
    }
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('todo-list', JSON.stringify(tasks))
    } catch (err) {
      // ignore
    }
  }, [tasks])

  const addTask = () => {
    const text = input.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed))
  }

  return (
    <div className="todo-container">
      <h2 className="todo-title">To-Do List</h2>
      <div className="todo-input-row">
        <input
          className="todo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task..."
          aria-label="Add a task"
        />
        <button className="todo-add" onClick={addTask}>Add</button>
      </div>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <label className="todo-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="todo-text">{task.text}</span>
            </label>
            <button className="todo-delete" onClick={() => removeTask(task.id)} aria-label={`Delete ${task.text}`}>✕</button>
          </li>
        ))}
      </ul>
      {tasks.some(t => t.completed) && (
        <button className="todo-clear" onClick={clearCompleted}>Clear completed</button>
      )}
    </div>
  )
}

export default TodoList