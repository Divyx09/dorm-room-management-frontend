import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentManagement = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      roomNumber: '304',
      status: 'active',
      checkInDate: '2024-01-15'
    },
    // Add more mock data as needed
  ]);

  const [filterRoom, setFilterRoom] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStudents = students
    .filter(student => filterRoom ? student.roomNumber.includes(filterRoom) : true)
    .filter(student => filterStatus === 'all' ? true : student.status === filterStatus);

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="main-content flex-grow-1 bg-light">
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0">Student Management</h1>
            <p className="text-muted mb-0">Manage dormitory residents</p>
          </div>
          <Link to="/admin/students/new" className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>
            Add Student
          </Link>
        </div>

        {/* Filters */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by room..."
                  value={filterRoom}
                  onChange={(e) => setFilterRoom(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Students</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Room</th>
                    <th>Status</th>
                    <th>Check-in Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm bg-primary-subtle rounded-circle me-2">
                            {student.name.charAt(0)}
                          </div>
                          {student.name}
                        </div>
                      </td>
                      <td>{student.email}</td>
                      <td>{student.roomNumber}</td>
                      <td>
                        <span className={`badge bg-${student.status === 'active' ? 'success' : 'secondary'}`}>
                          {student.status}
                        </span>
                      </td>
                      <td>{new Date(student.checkInDate).toLocaleDateString()}</td>
                      <td>
                        <div className="btn-group">
                          <Link to={`/admin/students/${student.id}/edit`} className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;