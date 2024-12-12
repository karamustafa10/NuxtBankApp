<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

// Gerekli Chart.js bileşenlerini kaydediyoruz
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const chartData = ref({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Total",
      data: [65, 59, 80, 81, 56, 55, 65, 67, 78, 90, 69, 67],
      fill: false,
      borderColor: "#0177fb",
      tension: 0.4,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  scales: {
    y: {
      min: 50, // Y ekseni için minimum değer
      max: 100, // Y ekseni için maksimum değer
    },
  },
});
</script>
