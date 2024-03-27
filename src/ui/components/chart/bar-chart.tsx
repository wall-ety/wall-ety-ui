import React from "react";
import { Box, StyleProps, useColorModeValue } from "@chakra-ui/react";
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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => labels.length * 8),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => labels.length / 2),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function BarChart({ sx = {} }: { sx?: StyleProps }) {
  const bgColor = useColorModeValue("white.900", "black.800");

  return (
    <Box sx={{ p: 5, bgColor, ...sx }}>
      <Bar options={options} data={data} />
    </Box>
  );
}
