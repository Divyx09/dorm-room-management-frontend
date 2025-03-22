import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";

const ExpenseDashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Groceries",
      amount: 120.5,
      date: "2024-03-20",
      paidBy: "John Doe",
      settled: false,
      participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    },
    {
      id: 2,
      name: "Internet Bill",
      amount: 60.0,
      date: "2024-03-15",
      paidBy: "Jane Smith",
      settled: true,
      participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    },
    {
      id: 3,
      name: "Cleaning Supplies",
      amount: 45.75,
      date: "2024-03-18",
      paidBy: "Mike Johnson",
      settled: false,
      participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    },
  ]);

  const calculateBalances = () => {
    const balances = {
      "John Doe": 0,
      "Jane Smith": 0,
      "Mike Johnson": 0,
    };

    expenses.forEach((expense) => {
      if (!expense.settled) {
        const perPersonShare = expense.amount / expense.participants.length;

        // Add full amount to payer
        balances[expense.paidBy] += expense.amount;

        // Subtract share from each participant
        expense.participants.forEach((person) => {
          balances[person] -= perPersonShare;
        });
      }
    });

    return balances;
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([
      ...expenses,
      {
        ...newExpense,
        id: Date.now(),
        settled: false,
      },
    ]);
    setShowExpenseForm(false);
  };

  const handleToggleSettle = (expenseId) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === expenseId
          ? { ...expense, settled: !expense.settled }
          : expense,
      ),
    );
  };

  const balances = calculateBalances();

  return (
    <div className='expense-dashboard container py-4'>
      {/* Balance Summary */}
      <div className='row mb-4'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='mb-0'>Balance Summary</h5>
            </div>
            <div className='card-body'>
              <div className='row'>
                {Object.entries(balances).map(([person, balance]) => (
                  <div key={person} className='col-md-4'>
                    <div className='balance-card'>
                      <h6>{person}</h6>
                      <span
                        className={`balance-amount ${
                          balance >= 0 ? "positive" : "negative"
                        }`}
                      >
                        {balance >= 0 ? "+" : ""}
                        {balance.toFixed(2)}
                      </span>
                      <span className='balance-status'>
                        {balance > 0
                          ? "to be reimbursed"
                          : balance < 0
                          ? "owes"
                          : "settled"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className='card'>
        <div className='card-header d-flex justify-content-between align-items-center'>
          <h5 className='mb-0'>Expense History</h5>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => setShowExpenseForm(true)}
          >
            <i className='bi bi-plus-lg me-2'></i>
            Add Expense
          </button>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Paid By</th>
                  <th>Participants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.paidBy}</td>
                    <td>
                      <small>{expense.participants.join(", ")}</small>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          expense.settled ? "settled" : "pending"
                        }`}
                      >
                        {expense.settled ? "Settled" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          expense.settled
                            ? "btn-outline-warning"
                            : "btn-outline-success"
                        }`}
                        onClick={() => handleToggleSettle(expense.id)}
                      >
                        {expense.settled ? "Unsettle" : "Mark Settled"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className='floating-add-button'
        onClick={() => setShowExpenseForm(true)}
      >
        <i className='bi bi-plus-lg'></i>
      </button>

      {/* Add Expense Modal */}
      {showExpenseForm && (
        <div className='modal-overlay'>
          <div className='modal-wrapper'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Add New Expense</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setShowExpenseForm(false)}
                  />
                </div>
                <div className='modal-body'>
                  <ExpenseForm
                    onSubmit={handleAddExpense}
                    onCancel={() => setShowExpenseForm(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDashboard;
