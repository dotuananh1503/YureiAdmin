import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import AuthContext from "../context";

const colors = [
  "#63f542",
  "#bf1520",
  "#bf15bc",
  "#e327c7",
  "#15bfab",
  "#1534bf",
  "#f2d813",
  "#92f213",
  "#e36227",
  "#2791e3",
  "#39352A",
  "#1E5945",
  "#EA899A",
  "#6C4675",
  "#1F3A3D",
  "#434B4D",
  "#F44611"

];

const Chart = (props) => {
  const { chartTitle = "Thống kê" } = props;
  const authContext = useContext(AuthContext);
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
        position: "top",
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };

  const labels = Object.keys(authContext.totalCountCategories);

  const data = {
    labels,
    datasets: [{
      label: "Số lượng anime",
      data: Object.values(authContext.totalCountCategories),
      backgroundColor: colors,
    }]
  };
  return <Bar options={options} data={data} />;
};

export default Chart;
