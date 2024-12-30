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
import { useI18n } from "vue-i18n";

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
const { t } = useI18n();

const updateChartData = () => {
  const incomingAmounts = Array(14).fill(0);
  const outgoingAmounts = Array(14).fill(0);

  getTransactionStore.transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (!isNaN(transactionDate.getTime())) {
      const daysAgo = Math.floor(
        (new Date().setHours(0, 0, 0, 0) -
          transactionDate.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      );

      if (daysAgo >= 0 && daysAgo < 14) {
        const amount = Number(transaction.amount);
        if (amount > 0) {
          incomingAmounts[13 - daysAgo] += amount;
        } else if (amount < 0) {
          outgoingAmounts[13 - daysAgo] += Math.abs(amount);
        }
      }
    }
  });

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

const ws = new WebSocket("ws://localhost:8080");

ws.onopen;

ws.onerror = (error) => {
  console.error("WebSocket error in chart.vue:", error);
};

ws.onmessage = async (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "transaction") {
    await getTransactionStore.fetchTransactions();
    updateChartData();
  }
};

ws.onclose;

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
      label: t("income"),
      backgroundColor: "green",
      data: [],
    },
    {
      label: t("expense"),
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
