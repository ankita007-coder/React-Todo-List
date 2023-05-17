import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });
      setTodos([response.data, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: true,
      });
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = true;
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <div className='input-container'>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            {!todo.completed && (
              <>
                <button onClick={() => updateTodo(todo.id)}>Complete</button>
                <button onClick={() => deleteTodo(todo.id)} style={{backgroundColor: 'red'}}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
