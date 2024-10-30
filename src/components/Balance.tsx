import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTransactions } from '../context/TransactionsContext';

const Balance = () => {
  const { transactions } = useTransactions();
  
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Income</p>
            <p className="text-2xl font-bold text-gray-900">${income.toFixed(2)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <ArrowUpRight className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="text-2xl font-bold text-gray-900">${expenses.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <ArrowDownRight className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <div className={`${balance >= 0 ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-full`}>
            {balance >= 0 ? (
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            ) : (
              <ArrowDownRight className="w-6 h-6 text-red-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;