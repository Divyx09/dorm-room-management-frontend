import React, { useState, useEffect } from "react";
import MaintenanceRequestForm from "./MaintainanceForm";

const MaintenanceDashboard = () => {
  const [requests, setRequests] = useState([
  ]);
  
    console.log(requests);

  const [activeFilter, setActiveFilter] = useState("all");
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const filteredRequests =
    activeFilter === "all"
      ? requests
      : requests.filter(
          (request) =>
            request.status.toLowerCase() === activeFilter.toLowerCase()
        );


  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "var(--status-pending)";
      case "in-progress":
        return "var(--status-in-progress)";
      case "resolved":
        return "var(--status-resolved)";
      default:
        return "var(--status-pending)";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const handleShowUsersRequest = async() => {
    const response = await fetch("http://localhost:8082/api/user/getuserrequests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const result = await response.json();
    console.log(result);
    setRequests(result);
  }

  const handleNewRequest = async(formData) => {
  //   const newRequest = {
  //     id: requests.length + 1,
  //     ...formData,
  //     status: "pending",
  //     submittedDate: new Date().toISOString().slice(0, 10),
  //   };

    const response = await fetch("http://localhost:8082/api/user/addrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title:formData.title,
        description:formData.description,
        requestType:formData.type,
        status:"pending"
      }),
    });

    const result  = await response.text();
    console.log(result)
    alert(result)
  };

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (showNewRequestModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    handleShowUsersRequest();

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showNewRequestModal]);

  return (
    <div className='maintenance-dashboard'>
      {/* Header Section */}
      <div className='dashboard-header'>
        <div className='header-content'>
          <div className='title-section'>
            <h1>Maintenance Requests</h1>
            <p className='text-muted'>
              Track and manage your maintenance requests
            </p>
          </div>
          <button
            className='btn-new-request'
            onClick={() => setShowNewRequestModal(true)}
          >
            <i className='bi bi-plus-lg'></i>
            New Request
          </button>
        </div>

        {/* Stats Section */}
        <div className='stats-container'>
          <div className='stat-card'>
            <div className='stat-value'>
              {requests.filter((r) => r.status === "pending").length}
            </div>
            <div className='stat-label'>Pending</div>
          </div>
          <div className='stat-card'>
            <div className='stat-value'>
              {requests.filter((r) => r.status === "in-progress").length}
            </div>
            <div className='stat-label'>In Progress</div>
          </div>
          <div className='stat-card'>
            <div className='stat-value'>
              {requests.filter((r) => r.status === "resolved").length}
            </div>
            <div className='stat-label'>Resolved</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className='filter-section'>
          <div className='filter-pills'>
            <button
              className={`filter-pill ${
                activeFilter === "all" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Requests
            </button>
            <button
              className={`filter-pill ${
                activeFilter === "pending" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`filter-pill ${
                activeFilter === "in-progress" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("in-progress")}
            >
              In Progress
            </button>
            <button
              className={`filter-pill ${
                activeFilter === "resolved" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("resolved")}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className='requests-grid'>
        {filteredRequests.map((request) => (
          <div key={request.id} className='request-card'>
            <div className='request-header'>
              <div
                className='priority-indicator'
                title={`Priority: ${request.priority}`}
              >
                {getPriorityIcon(request.priority)}
              </div>
              <div
                className='status-badge'
                style={{ backgroundColor: getStatusColor(request.status) }}
              >
                {request.status}
              </div>
            </div>

            <div className='request-content'>
              <h3 className='request-title'>{request.title}</h3>
              <p className='request-description'>{request.description}</p>

              <div className='request-meta'>
                <div className='meta-item'>
                  <i className='bi bi-geo-alt'></i>
                  {request.location}
                </div>
                <div className='meta-item'>
                  <i className='bi bi-calendar'></i>
                  {new Date(request.submittedDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className='request-actions'>
              <button className='btn-action'>
                <i className='bi bi-chat'></i>
                Comment
              </button>
              <button className='btn-action'>
                <i className='bi bi-info-circle'></i>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <>
          <div
            className='modal-overlay'
            onClick={() => setShowNewRequestModal(false)}
          />
          <div className='modal-wrapper'>
            <div className='modal-dialog modal-lg'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>New Maintenance Request</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setShowNewRequestModal(false)}
                  />
                </div>
                <div className='modal-body'>
                  <MaintenanceRequestForm
                    onSubmit={handleNewRequest}
                    onCancel={() => setShowNewRequestModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MaintenanceDashboard;
