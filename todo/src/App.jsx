import { useState } from 'react'
import Task from "./components/Task.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");

  const addTask = () => {
    if (!newTask || !deadline) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        time: deadline,
        completed: false,
      },
    ]);
    setNewTask("");
    setDeadline("");
  };  

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-xl bg-white shadow p-4 rounded">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Task Description"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
        />
        <input
          type="time"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={addTask}
          disabled={!newTask || !deadline}
          className={`px-4 py-1 rounded ${
            newTask && deadline
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onToggle={toggleComplete} />
        ))}
      </div>
    </div>
  </div>
);

}

export default App
