<template>
  <Frame>
    <Page>
      <ActionBar title="Spendee" />
      <GridLayout>
        <TabView :selectedIndex="selectedTab" @selectedIndexChange="onTabChange">
          <TabViewItem title="Overview">
            <OverviewScreen />
          </TabViewItem>
          <TabViewItem title="Transactions">
            <TransactionsScreen />
          </TabViewItem>
          <TabViewItem title="Categories">
            <CategoriesScreen />
          </TabViewItem>
        </TabView>
        <FAB @tap="showAddTransaction" />
      </GridLayout>
    </Page>
  </Frame>
</template>

<script lang="ts">
import { ref } from 'vue';
import OverviewScreen from './screens/OverviewScreen.vue';
import TransactionsScreen from './screens/TransactionsScreen.vue';
import CategoriesScreen from './screens/CategoriesScreen.vue';
import FAB from './components/FAB.vue';

export default {
  components: {
    OverviewScreen,
    TransactionsScreen,
    CategoriesScreen,
    FAB
  },
  setup() {
    const selectedTab = ref(0);

    const onTabChange = (args: any) => {
      selectedTab.value = args.value;
    };

    const showAddTransaction = () => {
      // Show modal for adding transaction
    };

    return {
      selectedTab,
      onTabChange,
      showAddTransaction
    };
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #6366f1;
  color: white;
}

TabView {
  tab-text-color: #6b7280;
  selected-tab-text-color: #6366f1;
  tab-background-color: white;
  android-selected-tab-highlight-color: #6366f1;
}
</style>