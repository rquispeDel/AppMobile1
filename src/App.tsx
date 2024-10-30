import React from 'react';
import { TransactionsProvider } from './context/TransactionsContext';
import { CategoriesProvider } from './context/CategoriesContext';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <CategoriesProvider>
      <TransactionsProvider>
        <div className="min-h-screen bg-gray-50">
          <HomeScreen />
        </div>
      </TransactionsProvider>
    </CategoriesProvider>
  );
}