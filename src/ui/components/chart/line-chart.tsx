import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, StyleProps, useColorModeValue } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Money",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aout",
  "September",
  "November",
  "December",
];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map((el) => el.length * 100 * 2),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map((el) => el.length * 100),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function LineChart({
  sx = {},
  data = [],
}: {
  sx?: StyleProps;
  data: any[];
}) {
  const bgColor = useColorModeValue("white.900", "black.800");
  return (
    <Box sx={{ p: 5, bgColor, ...sx }}>
      <Line
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "Debits",
              data: data.map((el) => el[0].amount),
              borderColor: "red",
              backgroundColor: "red",
            },
            {
              label: "Credits",
              data: data.map((el) => el[1].amount),
              borderColor: "blue",
              backgroundColor: "blue",
            },
          ],
        }}
      />
    </Box>
  );
}
