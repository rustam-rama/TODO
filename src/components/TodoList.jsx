import { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const delay = new Promise(resolve => setTimeout(resolve, 2000));
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные');
        }
        
        const data = await response.json();
        await delay;
        
        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-title">Список задач</h1>
      
      {isLoading && (
        <div className="loading">Загрузка...</div>
      )}
      
      {error && (
        <div className="error">Произошла ошибка: {error}</div>
      )}
      
      {!isLoading && !error && (
        <div className="todo-list">
          {todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <div className="todo-content">
                <span 
                  className={`status-indicator ${
                    todo.completed ? 'status-completed' : 'status-pending'
                  }`}
                />
                <span className="todo-text">{todo.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;