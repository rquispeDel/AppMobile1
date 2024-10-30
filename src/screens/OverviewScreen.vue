<template>
  <ScrollView>
    <StackLayout class="p-4">
      <TimeframeSelector
        :selected="timeframe"
        @select="onTimeframeChange"
      />
      <ChartView
        :data="chartData"
        :timeframe="timeframe"
      />
      <BalanceCards
        :income="totalIncome"
        :expenses="totalExpenses"
      />
      <RecentTransactions
        :transactions="recentTransactions"
      />
    </StackLayout>
  </ScrollView>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useTransactions } from '../composables/useTransactions';
import TimeframeSelector from '../components/TimeframeSelector.vue';
import ChartView from '../components/ChartView.vue';
import BalanceCards from '../components/BalanceCards.vue';
import RecentTransactions from '../components/RecentTransactions.vue';

export default {
  components: {
    TimeframeSelector,
    ChartView,
    BalanceCards,
    RecentTransactions
  },
  setup() {
    const { transactions, getChartData } = useTransactions();
    const timeframe = ref('month');

    const chartData = computed(() => getChartData(timeframe.value));
    const totalIncome = computed(() => 
      transactions.value
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    );
    const totalExpenses = computed(() => 
      transactions.value
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    );
    const recentTransactions = computed(() => 
      [...transactions.value]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
    );

    const onTimeframeChange = (value: string) => {
      timeframe.value = value;
    };

    return {
      timeframe,
      chartData,
      totalIncome,
      totalExpenses,
      recentTransactions,
      onTimeframeChange
    };
  }
};
</script>