"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Row } from "react-bootstrap";
import { getData } from "@/utils/metrics";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const date = new Date();
let dailyAmount: number[] = [];

// function setData() {
//   dailyAmount = getData() as unknown as number[];
// }

const labels = [
  new Date(date.setDate(date.getDate())).toDateString(),
  new Date(date.setDate(date.getDate() - 1)).toDateString(),
  new Date(date.setDate(date.getDate() - 1)).toDateString(),
  new Date(date.setDate(date.getDate() - 1)).toDateString(),
  new Date(date.setDate(date.getDate() - 1)).toDateString(),
].reverse();

export const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      boarderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.7)",
      borderWidth: 2,
      fill: false,
      data: [0, 0, 0, 0, 0],
    },
    {
      type: "bar" as const,
      label: "Dataset 2",
      backgroundColor: "#5f90f1",
      data: [
        dailyAmount[0],
        dailyAmount[1],
        dailyAmount[2],
        dailyAmount[3],
        dailyAmount[4],
      ],
      boarderColor: "white",
      boarderWidth: 2,
    },
  ],
};

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 1,
        },
        {
          datasetIndex: 1,
          index: 1,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      }
    );
  }

  chart.update();
}

const BaseDashBoard = async () => {
  const chartRef = useRef<ChartJS>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setData();
  //   setLoading(false);
  // }, [data])

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.config.options = {
        scales: {
          x: {
            grid: {
              color: "#bfc1c5",
            },
            ticks: {
              color: "#bfc1c5",
            },
          },
          y: {
            grid: {
              color: "#bfc1c5",
            },
            ticks: {
              color: "#bfc1c5",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#bfc1c5",
            },
          },
        },
      };
    }

    triggerTooltip(chart);
  }, []);
  return (
    <Row>
      {loading ? (<></>) : (<Chart ref={chartRef} type="bar" data={data} />)}
    </Row>
  );
};

export default BaseDashBoard;
