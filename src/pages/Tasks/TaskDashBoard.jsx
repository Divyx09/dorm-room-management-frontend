import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleShowUsersTask = async () => {
    try {
      const response = await fetch(
        "http://localhost:8082/api/user/getusertasks",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const result = await response.json();
      console.log("Fetched Tasks:", result);

      // Ensure tasks have a valid id
      if (Array.isArray(result)) {
        setTasks(
          result.map((task) => ({
            id: task.id, // Ensure correct mapping
            title: task.title,
            description: task.description,
            status: task.status || "pending",
            assignedTo: task.assignedTo || "Unassigned",
            dueDate: task.dueDate || new Date().toISOString(),
            category: task.category || "General",
            priority: task.priority || "low",
          }))
        );
      } else {
        console.error("Invalid task response format:", result);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, status: "pending" }]);
    setShowForm(false);
  };

  const handleToggleStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  const handleDeleteTask = async (taskId) => {
    console.log("Deleting Task ID:", taskId);

    try {
      const response = await fetch(`http://localhost:8082/api/tasks/${taskId}`, {
        method: "DELETE", // Corrected method (was GET)
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }else{

      alert("Task deleted successfully");

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  const getPriorityColor = (priority, dueDate) => {
    if (isOverdue(dueDate)) return "var(--bs-danger)";
    switch (priority) {
      case "high":
        return "var(--bs-warning)";
      case "medium":
        return "var(--bs-info)";
      default:
        return "var(--bs-success)";
    }
  };

  useEffect(() => {
    handleShowUsersTask();
  }, []);

  return (
    <div className="task-dashboard container py-4">
      <div className="dashboard-header mb-4">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="mb-0">Dorm Tasks</h2>
            <p className="text-muted mb-0">
              Manage your shared responsibilities
            </p>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              <i className="bi bi-plus-lg me-2"></i>Add New Task
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="row mb-4">
          <div className="col-12">
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-body">
              <h3 className="stat-number">{tasks.length}</h3>
              <p className="stat-label">Total Tasks</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-body">
              <h3 className="stat-number">
                {tasks.filter((t) => t.status === "completed").length}
              </h3>
              <p className="stat-label">Completed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-body">
              <h3 className="stat-number">
                {tasks.filter((t) => t.status === "pending").length}
              </h3>
              <p className="stat-label">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-card-body">
              <h3 className="stat-number">
                {tasks.filter((t) => isOverdue(t.dueDate)).length}
              </h3>
              <p className="stat-label">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-6 col-lg-4">
            <div
              className={`task-card ${
                task.status === "completed" ? "completed" : ""
              }`}
            >
              <div className="task-card-header">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={task.status === "completed"}
                    onChange={() => handleToggleStatus(task.id)}
                  />
                  <h5 className="task-title mb-0">{task.title}</h5>
                </div>
                <div
                  className="task-priority"
                  style={{
                    backgroundColor: getPriorityColor(
                      task.priority,
                      task.dueDate
                    ),
                  }}
                ></div>
              </div>

              <div className="task-card-body">
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <div className="task-meta-item">
                    <i className="bi bi-person me-2"></i>
                    {task.assignedTo}
                  </div>
                  <div className="task-meta-item">
                    <i className="bi bi-calendar me-2"></i>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div className="task-meta-item">
                    <i className="bi bi-tag me-2"></i>
                    {task.category}
                  </div>
                </div>
              </div>

              <div className="task-card-footer">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
