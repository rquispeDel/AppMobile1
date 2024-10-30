import React, { useState } from 'react';
import BarChart from '../components/BarChart';
import Balance from '../components/Balance';
import TimeframeSelector from '../components/TimeframeSelector';
import TransactionList from '../components/TransactionList';
import AddTransactionButton from '../components/AddTransactionButton';
import { useTransactions } from '../context/TransactionsContext';

const HomeScreen = () => {
  const [timeframe, setTimeframe] = useState<'month' | 'year'>('month');
  const { getChartData } = useTransactions();
  const chartData = getChartData(timeframe);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <TimeframeSelector
        selected={timeframe}
        onSelect={setTimeframe}
      />
      <div className="mb-8">
        <BarChart data={chartData} />
      </div>
      <Balance />
      <TransactionList />
      <AddTransactionButton />
    </div>
  );
};

export default HomeScreen;