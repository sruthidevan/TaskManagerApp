import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", isCompleted: false });
  
  // Fetch tasks from the API
  useEffect(() => {
    axios.get("http://localhost:5000/api/task")
      .then(response => setTasks(response.data))
      .catch(error => console.log(error));
  }, []);

  const addTask = () => {
    axios.post("http://localhost:5000/api/task", newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: "", description: "", isCompleted: false });
      })
      .catch(error => console.log(error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/task/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
