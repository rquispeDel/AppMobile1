import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';
import { Transaction, ChartData } from '../types';

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  getChartData: (timeframe: 'month' | 'year') => ChartData;
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    try {
      const stored = localStorage.getItem('transactions');
      if (stored) {
        setTransactions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const saveTransactions = (newTransactions: Transaction[]) => {
    try {
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    const newTransactions = [...transactions, newTransaction];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const deleteTransaction = (id: string) => {
    const newTransactions = transactions.filter(t => t.id !== id);
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const updateTransaction = (transaction: Transaction) => {
    const newTransactions = transactions.map(t =>
      t.id === transaction.id ? transaction : t
    );
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const getChartData = (timeframe: 'month' | 'year'): ChartData => {
    const now = new Date();
    let start: Date;
    let end: Date;
    let labels: string[];

    if (timeframe === 'month') {
      start = startOfMonth(now);
      end = endOfMonth(now);
      labels = Array.from({ length: end.getDate() }, (_, i) => (i + 1).toString());
    } else {
      start = startOfYear(now);
      end = endOfYear(now);
      labels = eachMonthOfInterval({ start, end }).map(date => 
        format(date, 'MMM')
      );
    }

    const income = new Array(labels.length).fill(0);
    const expense = new Array(labels.length).fill(0);

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const index = timeframe === 'month' 
        ? date.getDate() - 1
        : date.getMonth();

      if (transaction.type === 'income') {
        income[index] += transaction.amount;
      } else {
        expense[index] += transaction.amount;
      }
    });

    return { labels, income, expense };
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        getChartData,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};