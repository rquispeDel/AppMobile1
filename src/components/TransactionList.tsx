import React from 'react';
import { ShoppingBag, Briefcase, Car } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return <ShoppingBag className="w-5 h-5" />;
    case 'salary':
      return <Briefcase className="w-5 h-5" />;
    case 'transport':
      return <Car className="w-5 h-5" />;
    default:
      return <ShoppingBag className="w-5 h-5" />;
  }
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map(transaction => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.category}</p>
                <p className="text-sm text-gray-500">{transaction.note}</p>
              </div>
            </div>
            <p className={`font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;