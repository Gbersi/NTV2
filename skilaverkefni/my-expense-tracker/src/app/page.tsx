"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Expense = {
  id: number;
  description: string;
  amount: number;
  date: Date;
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim() || !amount.trim()) return;
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    const newExpense: Expense = {
      id: Date.now(),
      description: description.trim(),
      amount: numericAmount,
      date: new Date(),
    };

 
    setExpenses((prev) => [newExpense, ...prev]);
    setDescription("");
    setAmount("");
  };

  const handleRemoveExpense = (id: number) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const totalCost = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const expenseCount = expenses.length;

  return (
    <div className="min-h-screen bg-dynamic transition-colors duration-500">
      {/* Header */}
      <header className="w-full py-6 bg-gray-800 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center">
          Expense Dashboard
        </h1>
      </header>

      {/* Main Content Container */}
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Summary Section */}
        <section className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-blue-700">
              Total Expenses
            </h2>
            <p className="mt-2 text-5xl font-bold text-gray-800">
              {expenseCount}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-blue-700">
              Total Cost
            </h2>
            <p className="mt-2 text-5xl font-bold text-gray-800">
              ${totalCost.toFixed(2)}
            </p>
          </div>
        </section>

        {/* Expense Form Section */}
        <section className="w-full max-w-2xl mb-8">
          <div className="w-full bg-white rounded-lg shadow-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Add New Expense
              </h2>
            </div>
            <form onSubmit={handleAddExpense} className="space-y-4 text-center">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groceries"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ color: "black" }}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black placeholder-black text-center"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50.75"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ color: "black" }}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black placeholder-black text-center"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold py-3 rounded shadow-2xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Add Expense
              </button>
            </form>
          </div>
        </section>

        {/* Expense List Section */}
        <section className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
              Expense List
            </h2>
            {expenses.length > 0 ? (
              <AnimatePresence>
                <ul className="divide-y divide-gray-300">
                  {expenses.map((exp) => (
                    <motion.li
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="py-4 flex justify-between items-center"
                    >
                      <div className="text-left">
                        <p className="text-xl font-medium text-gray-800">
                          {exp.description}
                        </p>
                        <p className="text-lg text-gray-600">
                          ${exp.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {exp.date.toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveExpense(exp.id)}
                        className="ml-4 !text-red-600 hover:!text-red-800 text-3xl font-bold transition-colors cursor-pointer"
                      >
                        &times;
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </AnimatePresence>
            ) : (
              <p className="text-center text-gray-500">
                No expenses yet. Add one above!
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
