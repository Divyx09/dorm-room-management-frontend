import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Mock data - replace with actual data from your backend
  const tasks = [
    { id: 1, title: "Pay Rent", dueDate: "2024-03-25", priority: "high" },
    {
      id: 2,
      title: "Clean Common Area",
      dueDate: "2024-03-22",
      priority: "medium",
    },
    { id: 3, title: "Buy Groceries", dueDate: "2024-03-21", priority: "low" },
  ];

  const expenses = [
    { id: 1, title: "Electricity Bill", amount: 120, dueDate: "2024-03-25" },
    { id: 2, title: "Internet", amount: 60, dueDate: "2024-03-30" },
    { id: 3, title: "Water Bill", amount: 45, dueDate: "2024-04-01" },
  ];

  const maintenanceRequests = [
    { id: 1, issue: "Leaking Faucet", status: "pending", date: "2024-03-20" },
    {
      id: 2,
      issue: "AC Not Working",
      status: "in-progress",
      date: "2024-03-19",
    },
  ];

  const potentialRoommates = [
    {
      id: 1,
      name: "Alex Smith",
      compatibility: "95%",
      major: "Computer Science",
    },
    { id: 2, name: "Sarah Johnson", compatibility: "88%", major: "Business" },
  ];

  return (
    <div className='dashboard'>
      {/* Top Stats */}
      <div className='container-fluid py-4'>
        <div className='row g-4 mb-4'>
          <div className='col-xl-3 col-sm-6'>
            <div className='card bg-primary text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Pending Tasks</h5>
                <h2 className='mb-0'>{tasks.length}</h2>
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-sm-6'>
            <div className='card bg-success text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Total Expenses</h5>
                <h2 className='mb-0'>
                  ${expenses.reduce((acc, exp) => acc + exp.amount, 0)}
                </h2>
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-sm-6'>
            <div className='card bg-warning text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Maintenance Requests</h5>
                <h2 className='mb-0'>{maintenanceRequests.length}</h2>
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-sm-6'>
            <div className='card bg-info text-white'>
              <div className='card-body'>
                <h5 className='card-title'>Roommate Matches</h5>
                <h2 className='mb-0'>{potentialRoommates.length}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='row g-4'>
          {/* Tasks */}
          <div className='col-lg-6'>
            <div className='card h-100'>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <h5 className='mb-0'>Tasks</h5>
                <button className='btn btn-sm btn-primary'>Add Task</button>
              </div>
              <div className='card-body'>
                <div className='list-group'>
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    >
                      <div>
                        <h6 className='mb-1'>{task.title}</h6>
                        <small className='text-muted'>
                          Due: {task.dueDate}
                        </small>
                      </div>
                      <span
                        className={`badge bg-${
                          task.priority === "high"
                            ? "danger"
                            : task.priority === "medium"
                            ? "warning"
                            : "success"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className='col-lg-6'>
            <div className='card h-100'>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <h5 className='mb-0'>Expenses</h5>
                <button className='btn btn-sm btn-primary'>Add Expense</button>
              </div>
              <div className='card-body'>
                <div className='list-group'>
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    >
                      <div>
                        <h6 className='mb-1'>{expense.title}</h6>
                        <small className='text-muted'>
                          Due: {expense.dueDate}
                        </small>
                      </div>
                      <span className='badge bg-success'>
                        ${expense.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Requests */}
          <div className='col-lg-6'>
            <div className='card h-100'>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <h5 className='mb-0'>Maintenance Requests</h5>
                <button className='btn btn-sm btn-primary'>New Request</button>
              </div>
              <div className='card-body'>
                <div className='list-group'>
                  {maintenanceRequests.map((request) => (
                    <div
                      key={request.id}
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    >
                      <div>
                        <h6 className='mb-1'>{request.issue}</h6>
                        <small className='text-muted'>
                          Submitted: {request.date}
                        </small>
                      </div>
                      <span
                        className={`badge bg-${
                          request.status === "pending" ? "warning" : "info"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Roommate Matches */}
          <div className='col-lg-6'>
            <div className='card h-100'>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <h5 className='mb-0'>Potential Roommates</h5>
                <Link to='/roommate-finder' className='btn btn-sm btn-primary'>
                  Find More
                </Link>
              </div>
              <div className='card-body'>
                <div className='list-group'>
                  {potentialRoommates.map((roommate) => (
                    <div
                      key={roommate.id}
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                    >
                      <div>
                        <h6 className='mb-1'>{roommate.name}</h6>
                        <small className='text-muted'>{roommate.major}</small>
                      </div>
                      <span className='badge bg-success'>
                        {roommate.compatibility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
