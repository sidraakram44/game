import './App.css';
import TicTacToe from './Component/TicTacToe';
import TodoList from './Component/TodoList';
import React, { useState } from 'react';

function App() {
  const [view, setView] = useState('todo');

  return (
    <div className="App">
      <div style={{ margin: '1rem' }}>
        <button onClick={() => setView('todo')} disabled={view === 'todo'}>To-Do List</button>
        <button onClick={() => setView('game')} disabled={view === 'game'} style={{ marginLeft: '0.5rem' }}>Tic Tac Toe</button>
      </div>
      {view === 'todo' ? <TodoList /> : <TicTacToe />}
    </div>
  );
}

export default App;
