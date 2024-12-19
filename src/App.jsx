import React, { useEffect, useState } from 'react';
import './App.css';
import { SQLiteService } from './services/SQLiteService';
import { Toast } from '@capacitor/toast';
import { Haptics } from '@capacitor/haptics';

const sqliteService = new SQLiteService();

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    sqliteService.initializeDB().then(() => {
      loadTodos();
    });
  }, []);

  const loadTodos = async () => {
    const data = await sqliteService.getTodos();
    setTodos(data);
    console.log(JSON.stringify(data));

  };

  const addTodo = async () => {
    if (task.trim()) {
      await sqliteService.addTodo(task);
      setTask('');
      loadTodos();
      showToast('Todo Added');
      Haptics.vibrate();
    }
  };

  const markAsDone = async (id, isDone) => {
    await sqliteService.markAsDone(id, isDone);
    loadTodos();
    showToast('Todo state changed');
    Haptics.vibrate();
  };

  const deleteTodo = async (id) => {
    await sqliteService.deleteTodo(id);
    loadTodos();
    showToast('Todo Deleted');
    Haptics.vibrate();
  };

  const showToast = (message) => {
    Toast.show({ text: message });
  };

  return (
    <>
      <div>
        <div className="todo-app">
          <input
            type="text"
            placeholder="Add Todo"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo</button>
          <p></p>
        </div>
      </div>
      <p></p>
      <p></p>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
              <div>
                <p
                  style={{
                    maxWidth: "250px",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal"
                  }}
                >{todo.task}</p>
              </div>
              <div>
                <button onClick={() => markAsDone(todo.id, todo.isDone)} style={{ marginBottom: "4px", backgroundColor: todo.isDone ? "#f44336" : "green" }}>{todo.isDone ? "Unmark" : "Done"}</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoApp;
