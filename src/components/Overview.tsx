import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../types';

interface OverviewProps {
  transactions: Transaction[];
}

const Overview: React.FC<OverviewProps> = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Income</p>
            <p className="text-xl font-bold text-gray-900">${income.toFixed(2)}</p>
          </div>
          <div className="bg-green-100 p-2 rounded-full">
            <ArrowUpRight className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="text-xl font-bold text-gray-900">${expenses.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 p-2 rounded-full">
            <ArrowDownRight className="w-5 h-5 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;