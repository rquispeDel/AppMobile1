<template>
  <GridLayout rows="auto, *" class="chart-container">
    <Label row="0" text="Income vs Expenses" class="chart-title" />
    <BarChart
      row="1"
      :data="formattedData"
      :width="chartWidth"
      :height="220"
      :yAxisSuffix="'$'"
      :chartConfig="chartConfig"
    />
  </GridLayout>
</template>

<script lang="ts">
import { computed } from 'vue';
import { screen } from '@nativescript/core';
import { BarChart } from 'react-native-chart-kit';

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    timeframe: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const chartWidth = screen.mainScreen.widthDIPs - 32;

    const formattedData = computed(() => ({
      labels: props.data.labels,
      datasets: [
        {
          data: props.data.income,
          color: () => '#22c55e',
          label: 'Income'
        },
        {
          data: props.data.expenses,
          color: () => '#ef4444',
          label: 'Expenses'
        }
      ]
    }));

    const chartConfig = {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#fafafa'
      }
    };

    return {
      chartWidth,
      formattedData,
      chartConfig
    };
  }
};
</script>

<style scoped>
.chart-container {
  background-color: white;
  border-radius: 16;
  padding: 16;
  margin: 8 0;
}

.chart-title {
  font-size: 16;
  font-weight: bold;
  margin-bottom: 8;
  color: #1f2937;
}
</style>