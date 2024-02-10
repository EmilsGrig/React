import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [tasks, setTasks] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    setTasks((currentTasks) => {
      return [
        ...currentTasks,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    setNewItem("");
  }

  function toggleTask(id, completed) {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed }
        }

        return task
      });
    });
  }

    function deleteTask(id) {
    setTasks((currentTasks) => {
      return currentTasks.filter(task => task.id !== id)
    })}

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {tasks.length === 0 && "No Tasks"}
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => toggleTask(task.id, e.target.checked)}
                />
                {task.title}
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  );
}
