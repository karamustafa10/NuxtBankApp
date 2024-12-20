<template>
  <Bar :data="data" :options="options" />
</template>

<script setup lang="ts">
import { GetTransactionStore } from "@/stores/transactionStore";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import { watch } from "vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getTransactionStore = GetTransactionStore();
const transactionCount = ref(0);

const updateChartData = () => {
  const incomingAmounts = Array(14).fill(0);
  const outgoingAmounts = Array(14).fill(0);

  // Process transactions
  getTransactionStore.transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (!isNaN(transactionDate.getTime())) {
      // Calculate the number of days ago the transaction occurred
      const daysAgo = Math.floor(
        (new Date().setHours(0, 0, 0, 0) -
          transactionDate.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      );

      if (daysAgo >= 0 && daysAgo < 14) {
        const amount = Number(transaction.amount); // Convert to number
        if (amount > 0) {
          incomingAmounts[13 - daysAgo] += amount; // Incoming
        } else if (amount < 0) {
          outgoingAmounts[13 - daysAgo] += Math.abs(amount); // Outgoing
        }
      }
    }
  });

  // Update chart data reactively
  data.value = {
    ...data.value,
    datasets: [
      { ...data.value.datasets[0], data: incomingAmounts },
      { ...data.value.datasets[1], data: outgoingAmounts },
    ],
  };
};

onMounted(async () => {
  await getTransactionStore.fetchTransactions();
  transactionCount.value = getTransactionStore.transactions.length;
  updateChartData();
});

watch(
  () => getTransactionStore.transactions.length,
  async (newLength, oldLength) => {
    if (newLength > oldLength) {
      await getTransactionStore.fetchTransactions();
      updateChartData();
    }
  }
);

// Reactive data
const data = ref<{
  labels: string[];
  datasets: { label: string; backgroundColor: string; data: number[] }[];
}>({
  labels: Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return date.toLocaleDateString();
  }),
  datasets: [
    {
      label: "Income",
      backgroundColor: "green",
      data: [],
    },
    {
      label: "Outcome",
      backgroundColor: "red",
      data: [],
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
