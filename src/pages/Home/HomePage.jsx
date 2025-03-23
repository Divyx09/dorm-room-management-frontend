import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaMoneyBill, FaTools, FaUserFriends } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [potentialRoommates, setPotentialRoommates] = useState([]);

  // Calculate total pending expenses
  const calculateTotalExpenses = () => {
    return expenses
      .filter((exp) => exp.status === "pending")
      .reduce((acc, exp) => acc + exp.amount, 0);
  };

  // Load initial data
  useEffect(() => {
    // In a real app, these would be API calls
    setTasks([
      {
        id: 1,
        title: "Pay Rent",
        dueDate: "2024-03-25",
        priority: "high",
        status: "pending",
      },
      {
        id: 2,
        title: "Clean Common Area",
        dueDate: "2024-03-22",
        priority: "medium",
        status: "pending",
      },
      {
        id: 3,
        title: "Buy Groceries",
        dueDate: "2024-03-21",
        priority: "low",
        status: "completed",
      },
    ]);

    setExpenses([
      {
        id: 1,
        title: "Electricity Bill",
        amount: 120,
        dueDate: "2024-03-25",
        status: "pending",
      },
      {
        id: 2,
        title: "Internet",
        amount: 60,
        dueDate: "2024-03-30",
        status: "pending",
      },
      {
        id: 3,
        title: "Water Bill",
        amount: 45,
        dueDate: "2024-04-01",
        status: "paid",
      },
    ]);

    setMaintenanceRequests([
      { id: 1, issue: "Leaking Faucet", status: "pending", date: "2024-03-20" },
      {
        id: 2,
        issue: "AC Not Working",
        status: "in-progress",
        date: "2024-03-19",
      },
    ]);

    setPotentialRoommates([
      {
        id: 1,
        name: "Alex Smith",
        compatibility: "95%",
        major: "Computer Science",
        avatar: "/avatars/alex.jpg",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        compatibility: "88%",
        major: "Business",
        avatar: "/avatars/sarah.jpg",
      },
    ]);
  }, []);

  // Handler functions
  const handleTaskAction = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task,
      ),
    );
  };

  const handleExpenseAction = (expenseId) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              status: expense.status === "pending" ? "paid" : "pending",
            }
          : expense,
      ),
    );
  };

  const handleMaintenanceAction = (requestId) => {
    navigate(`/dashboard/maintenance/${requestId}`);
  };

  const handleRoommateAction = (roommateId) => {
    navigate(`/roommate-finder/${roommateId}`);
  };

  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  console.log(user.name);

  return (
    <div className='dashboard-container'>
      {/* Welcome Section */}
      <div className='welcome-section mb-4'>
        <h1>
          Welcome back, <span className='text-primary'>{user.name}</span> 👋
        </h1>
        <p className='text-muted'>
          Here's what's happening in your dormitory today
        </p>
      </div>

      {/* Stats Overview */}
      <div className='stats-grid'>
        <div className='stat-card bg-white'>
          <div className='stat-icon tasks'>
            <FaTasks />
          </div>
          <div className='stat-content'>
            <h3>{tasks.filter((t) => t.status === "pending").length}</h3>
            <p>Pending Tasks</p>
            <div className='progress' style={{ height: "4px" }}>
              <div
                className='progress-bar bg-primary'
                style={{
                  width: `${
                    (tasks.filter((t) => t.status === "pending").length /
                      tasks.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='stat-card bg-white'>
          <div className='stat-icon expenses'>
            <FaMoneyBill />
          </div>
          <div className='stat-content'>
            <h3>${calculateTotalExpenses()}</h3>
            <p>Pending Expenses</p>
            <div className='progress' style={{ height: "4px" }}>
              <div
                className='progress-bar bg-success'
                style={{
                  width: `${
                    (expenses.filter((e) => e.status === "paid").length /
                      expenses.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='stat-card bg-white'>
          <div className='stat-icon maintenance'>
            <FaTools />
          </div>
          <div className='stat-content'>
            <h3>{maintenanceRequests.length}</h3>
            <p>Maintenance Requests</p>
            <div className='progress' style={{ height: "4px" }}>
              <div
                className='progress-bar bg-warning'
                style={{
                  width: `${
                    (maintenanceRequests.filter(
                      (r) => r.status === "in-progress",
                    ).length /
                      maintenanceRequests.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='stat-card bg-white'>
          <div className='stat-icon roommates'>
            <FaUserFriends />
          </div>
          <div className='stat-content'>
            <h3>{potentialRoommates.length}</h3>
            <p>Roommate Matches</p>
            <div className='progress' style={{ height: "4px" }}>
              <div
                className='progress-bar bg-info'
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='row g-4 mt-4'>
        {/* Tasks */}
        <div className='col-lg-6'>
          <div className='card dashboard-card h-100'>
            <div className='card-header bg-transparent border-0 d-flex justify-content-between align-items-center'>
              <h5 className='mb-0'>
                <FaTasks className='me-2 text-primary' />
                Tasks
              </h5>
              <Link
                to='/dashboard/tasks'
                className='btn btn-sm btn-primary rounded-pill px-3'
              >
                View All
              </Link>
            </div>
            <div className='card-body'>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className='task-item p-3 mb-2 rounded-3 bg-light'
                >
                  <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                      <h6 className='mb-1'>{task.title}</h6>
                      <small className='text-muted'>Due: {task.dueDate}</small>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <span className={`priority-badge ${task.priority}`}>
                        {task.priority}
                      </span>
                      <button
                        className={`btn btn-sm ${
                          task.status === "completed"
                            ? "btn-success"
                            : "btn-outline-success"
                        }`}
                        onClick={() => handleTaskAction(task.id)}
                      >
                        {task.status === "completed"
                          ? "Completed"
                          : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className='col-lg-6'>
          <div className='card dashboard-card h-100'>
            <div className='card-header bg-transparent border-0 d-flex justify-content-between align-items-center'>
              <h5 className='mb-0'>
                <FaMoneyBill className='me-2 text-success' />
                Expenses
              </h5>
              <Link
                to='/dashboard/expenses'
                className='btn btn-sm btn-success rounded-pill px-3'
              >
                View All
              </Link>
            </div>
            <div className='card-body'>
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className='expense-item p-3 mb-2 rounded-3 bg-light'
                >
                  <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                      <h6 className='mb-1'>{expense.title}</h6>
                      <small className='text-muted'>
                        Due: {expense.dueDate}
                      </small>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <span className='fw-bold'>${expense.amount}</span>
                      <button
                        className={`btn btn-sm ${
                          expense.status === "paid"
                            ? "btn-success"
                            : "btn-outline-success"
                        }`}
                        onClick={() => handleExpenseAction(expense.id)}
                      >
                        {expense.status === "paid" ? "Paid" : "Mark Paid"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className='col-lg-6'>
          <div className='card dashboard-card h-100'>
            <div className='card-header bg-transparent border-0 d-flex justify-content-between align-items-center'>
              <h5 className='mb-0'>
                <FaTools className='me-2 text-warning' />
                Maintenance
              </h5>
              <Link
                to='/dashboard/maintenance'
                className='btn btn-sm btn-warning rounded-pill px-3 text-white'
              >
                View All
              </Link>
            </div>
            <div className='card-body'>
              {maintenanceRequests.map((request) => (
                <div
                  key={request.id}
                  className='maintenance-item p-3 mb-2 rounded-3 bg-light cursor-pointer'
                  onClick={() => handleMaintenanceAction(request.id)}
                >
                  <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                      <h6 className='mb-1'>{request.issue}</h6>
                      <small className='text-muted'>
                        Submitted: {request.date}
                      </small>
                    </div>
                    <span className={`status-badge ${request.status}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roommates */}
        <div className='col-lg-6'>
          <div className='card dashboard-card h-100'>
            <div className='card-header bg-transparent border-0 d-flex justify-content-between align-items-center'>
              <h5 className='mb-0'>
                <FaUserFriends className='me-2 text-info' />
                Potential Roommates
              </h5>
              <Link
                to='/roommate-finder'
                className='btn btn-sm btn-info rounded-pill px-3 text-white'
              >
                Find More
              </Link>
            </div>
            <div className='card-body'>
              {potentialRoommates.map((roommate) => (
                <div
                  key={roommate.id}
                  className='roommate-item p-3 mb-2 rounded-3 bg-light cursor-pointer'
                  onClick={() => handleRoommateAction(roommate.id)}
                >
                  <div className='d-flex justify-content-between align-items-center w-100'>
                    <div className='d-flex align-items-center gap-3'>
                      <img
                        src={roommate.avatar}
                        alt={roommate.name}
                        className='roommate-avatar'
                        onError={(e) => (e.target.src = "/avatars/default.jpg")}
                      />
                      <div>
                        <h6 className='mb-1'>{roommate.name}</h6>
                        <small className='text-muted'>{roommate.major}</small>
                      </div>
                    </div>
                    <div className='compatibility'>
                      <span className='match-percentage'>
                        {roommate.compatibility}
                      </span>
                      <small className='text-muted d-block'>Match</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
