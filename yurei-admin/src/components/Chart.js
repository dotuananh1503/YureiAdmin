import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from "react";
import { Bar } from "react-chartjs-2";
import { colors } from "../constants/colors";

const Chart = (props) => {
  const { chartTitle = "Thống kê", dataToShow } = props;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
      },
      datalabels: {
        display: true,
        color: "#fff",
     },
     showAllTooltips: true
    },
  };

  const labels = Object.keys(dataToShow);

  const data = {
    labels,
    datasets: [{
      label: "",
      data: Object.values(dataToShow),
      backgroundColor: colors,
    }]
  };
  return <Bar redraw fallbackContent={<>Loading...</>} options={options} data={data} />;
};

export default Chart;
