import React, { useState } from 'react';

const MaintenanceRequestForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    location: '',
    images: []
  });

  const [errors, setErrors] = useState({});

  const priorities = [
    { value: 'low', label: 'Low', icon: '🟢' },
    { value: 'medium', label: 'Medium', icon: '🟡' },
    { value: 'high', label: 'High', icon: '🔴' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Request title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
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
            <i className="bi bi-exclamation-circle me-2"></i>
            Request Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter request title"
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">
            <i className="bi bi-exclamation-circle me-2"></i>
            Request Type <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.type ? "is-invalid" : ""}`}
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Enter request type"
          />
          {errors.type && (
            <div className="invalid-feedback">{errors.type}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="location" className="form-label">
            <i className="bi bi-geo-alt me-2"></i>
            Location <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location (e.g., Room 203, Common Area)"
          />
          {errors.location && (
            <div className="invalid-feedback">{errors.location}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label">
            <i className="bi bi-card-text me-2"></i>
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the maintenance issue in detail"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Priority Level
          </label>
          <div className="d-flex gap-3">
            {priorities.map((priority) => (
              <div key={priority.value} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id={`priority-${priority.value}`}
                  name="priority"
                  value={priority.value}
                  checked={formData.priority === priority.value}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`priority-${priority.value}`}
                >
                  {priority.icon} {priority.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <i className="bi bi-camera me-2"></i>
            Upload Photos
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          {formData.images.length > 0 && (
            <div className="image-preview mt-2 d-flex gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="position-relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                    className="rounded"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={() => removeImage(index)}
                    style={{ padding: "0.1rem 0.3rem" }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-send me-2"></i>
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaintenanceRequestForm;