// app/page.tsx
import React, { useState } from 'react';

type Expense = {
  id: number;
  description: string;
  amount: number;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description.trim() || !amount.trim()) return;
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    const newExpense: Expense = {
      id: Date.now(), // Using timestamp as a unique ID
      description: description.trim(),
      amount: numericAmount,
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const handleRemoveExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalCost = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Expense Tracker</h1>

        {/* Summary Section */}
        <div className="mb-4 text-center">
          <p className="text-gray-700 mb-1">
            Total Expenses: <span className="font-bold">{expenses.length}</span>
          </p>
          <p className="text-gray-700">
            Total Cost: <span className="font-bold">${totalCost.toFixed(2)}</span>
          </p>
        </div>

        {/* Form to add a new expense */}
        <form onSubmit={handleAddExpense} className="mb-6">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Expense description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Expense
          </button>
        </form>

        {/* Expenses List */}
        <ul>
          {expenses.map(expense => (
            <li key={expense.id} className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-gray-600">${expense.amount.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleRemoveExpense(expense.id)}
                className="text-red-500 hover:text-red-700 font-bold text-lg"
              >
                X
              </button>
            </li>
          ))}
          {expenses.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No expenses added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
