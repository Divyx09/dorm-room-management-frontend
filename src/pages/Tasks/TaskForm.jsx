import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    dueDate: initialData.dueDate || format(new Date(), 'yyyy-MM-dd'),
    assignedTo: initialData.assignedTo || '',
    priority: initialData.priority || 'medium',
    category: initialData.category || 'general'
  });

  const [errors, setErrors] = useState({});

  const roommates = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' }
  ];

  const categories = [
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'general', label: 'General' }
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    if (!formData.assignedTo) {
      newErrors.assignedTo = 'Please assign this task to someone';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">
            Task Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter task description"
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="assignedTo" className="form-label">
              Assign To <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select ${errors.assignedTo ? 'is-invalid' : ''}`}
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <option value="">Select Roommate</option>
              {roommates.map(roommate => (
                <option key={roommate.id} value={roommate.id}>
                  {roommate.name}
                </option>
              ))}
            </select>
            {errors.assignedTo && (
              <div className="invalid-feedback">{errors.assignedTo}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="dueDate" className="form-label">
              Due Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={format(new Date(), 'yyyy-MM-dd')}
            />
            {errors.dueDate && (
              <div className="invalid-feedback">{errors.dueDate}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              className="form-select"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;