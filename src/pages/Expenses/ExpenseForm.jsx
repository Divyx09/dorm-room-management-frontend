import React, { useState } from "react";

const ExpenseForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paidBy: "",
    participants: [],
  });

  const roommates = ["John Doe", "Jane Smith", "Mike Johnson"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  const handleParticipantToggle = (roommate) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.includes(roommate)
        ? prev.participants.filter((p) => p !== roommate)
        : [...prev.participants, roommate],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='expense-form'>
      <div className='mb-3'>
        <label className='form-label'>Expense Name</label>
        <input
          type='text'
          className='form-control'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className='mb-3'>
        <label className='form-label'>Amount</label>
        <div className='input-group'>
          <span className='input-group-text'>$</span>
          <input
            type='number'
            step='0.01'
            className='form-control'
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className='mb-3'>
        <label className='form-label'>Date</label>
        <input
          type='date'
          className='form-control'
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className='mb-3'>
        <label className='form-label'>Paid By</label>
        <select
          className='form-select'
          value={formData.paidBy}
          onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
          required
        >
          <option value=''>Select who paid</option>
          {roommates.map((roommate) => (
            <option key={roommate} value={roommate}>
              {roommate}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-3'>
        <label className='form-label'>Participants</label>
        <div className='participant-toggles'>
          {roommates.map((roommate) => (
            <div key={roommate} className='form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id={`participant-${roommate}`}
                checked={formData.participants.includes(roommate)}
                onChange={() => handleParticipantToggle(roommate)}
              />
              <label
                className='form-check-label'
                htmlFor={`participant-${roommate}`}
              >
                {roommate}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='d-flex justify-content-end gap-2'>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-primary'>
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
