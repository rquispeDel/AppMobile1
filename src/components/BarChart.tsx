import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';

interface Props {
  data: ChartData;
}

const BarChart = ({ data }: Props) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    Income: data.income[index],
    Expenses: data.expense[index],
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#22c55e" />
          <Bar dataKey="Expenses" fill="#ef4444" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;