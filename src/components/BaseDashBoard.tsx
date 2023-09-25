'use client'
import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Row } from 'react-bootstrap';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const labels = ['January', 'February', 'March', 'April', 'May'];

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      boarderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.7)',
      borderWidth: 2,
      fill: false,
      data: [13545, 15467, 17657, 12546, 15768],
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      backgroundColor: '#5f90f1',
      data: [24565, 28609, 18569, 19708, 21098],
      boarderColor: 'white',
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

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);
  return (
    <Row><Chart ref={chartRef} type='bar' data={data}/><Chart ref={chartRef} type='bar' data={data}/></Row>
  );
};

export default BaseDashBoard;