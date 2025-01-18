import { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const delay = new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные');
        }
        
        const data = await response.json();
        await delay;
        
        setTodo(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, []);

 
  return (
    <div className="todo-container">
      <h1 className="todo-title">Задача</h1>
    
      {isLoading && (
        <div className="loading">Загрузка...</div>
      )}
      
      {error && (
        <div className="error">Произошла ошибка: {error}</div>
      )}
      
      {!isLoading && !error && todo && (
        <div className="todo-card">
          <div className="todo-content">
            <span 
              className={`status-indicator ${
                todo.completed ? 'status-completed' : 'status-pending'
              }`}
            />
            <span className="todo-text">{todo.title}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;