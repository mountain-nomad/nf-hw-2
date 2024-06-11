'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask = { id: tasks.length + 1, text: newTaskText, completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    const activeTasks = tasks.filter(task => !task.completed);
    setTasks(activeTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const uncompletedTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
              <div className="flex items-center">
                <button
                  className="w-6 h-6 my-auto mr-6"
                  onClick={() => handleToggleTask(task.id)}
                >
                  <Image
                    src={task.completed ? "/images/circle-cheked.svg" : "/images/circle.svg"}
                    alt="Task status"
                    width={30}
                    height={30}
                  />
                </button>
                <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.text}</span>
              </div>
              <button onClick={() => handleDeleteTask(task.id)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{uncompletedTasksCount} items left</span>
          <div>
            <button onClick={() => handleFilterChange('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => handleFilterChange('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => handleFilterChange('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={handleClearCompleted}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
