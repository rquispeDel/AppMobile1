<template>
  <GridLayout rows="auto" columns="*, *, *" class="balance-container">
    <StackLayout col="0" class="balance-card">
      <Label text="Income" class="card-title" />
      <Label :text="'$' + income.toFixed(2)" class="income-amount" />
      <Label text="↑" class="arrow up" />
    </StackLayout>
    
    <StackLayout col="1" class="balance-card">
      <Label text="Expenses" class="card-title" />
      <Label :text="'$' + expenses.toFixed(2)" class="expense-amount" />
      <Label text="↓" class="arrow down" />
    </StackLayout>
    
    <StackLayout col="2" class="balance-card">
      <Label text="Balance" class="card-title" />
      <Label :text="'$' + balance" :class="balanceClass" />
      <Label :text="balance >= 0 ? '↑' : '↓'" :class="balanceArrowClass" />
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  props: {
    income: {
      type: Number,
      required: true
    },
    expenses: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const balance = computed(() => (props.income - props.expenses).toFixed(2));
    const balanceClass = computed(() => ({
      'balance-amount': true,
      'positive': props.income >= props.expenses,
      'negative': props.income < props.expenses
    }));
    const balanceArrowClass = computed(() => ({
      'arrow': true,
      'up': props.income >= props.expenses,
      'down': props.income < props.expenses
    }));

    return {
      balance,
      balanceClass,
      balanceArrowClass
    };
  }
};
</script>

<style scoped>
.balance-container {
  margin: 8 0;
}

.balance-card {
  background-color: white;
  border-radius: 16;
  padding: 16;
  margin: 4;
}

.card-title {
  font-size: 14;
  color: #6b7280;
}

.income-amount {
  font-size: 20;
  font-weight: bold;
  color: #22c55e;
}

.expense-amount {
  font-size: 20;
  font-weight: bold;
  color: #ef4444;
}

.balance-amount {
  font-size: 20;
  font-weight: bold;
}

.balance-amount.positive {
  color: #22c55e;
}

.balance-amount.negative {
  color: #ef4444;
}

.arrow {
  font-size: 24;
  font-weight: bold;
}

.arrow.up {
  color: #22c55e;
}

.arrow.down {
  color: #ef4444;
}
</style>