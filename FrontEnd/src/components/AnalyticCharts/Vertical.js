import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Vertical({ data1, data2, label }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expense vs Income Data Analysis in Vertical Chart",
      },
    },
  };

  const labels = label.map((item) => new Date(item).toLocaleDateString());

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: data1.map((item) => item.amount),
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
      {
        label: "Income",
        data: data2.map((item) => item.amount),
        backgroundColor: "rgba(52, 211, 153, 1)",
        borderColor: "rgba(52, 211, 153, 1)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
