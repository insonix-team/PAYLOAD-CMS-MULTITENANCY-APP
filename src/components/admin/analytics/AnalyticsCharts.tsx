'use client';

import { BarChart3, Users } from 'lucide-react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ColumnChartProps = {
  title: string;
  data: { key: string; value: number }[];
};

export const ColumnChart = ({ title, data }: ColumnChartProps) => {
  const categories = data.map((item) => item?.key);
  const seriesData = data.map((item) => item.value);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: '12px',
          colors: '#333',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: '#333',
        },
      },
    },
    grid: { strokeDashArray: 4 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} users`,
      },
    },
    colors: ['#4945ff'],
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' },
          },
        },
      },
    ],
  };

  const series = [{ name: 'Users', data: seriesData }];

  return (
    <div
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: 12,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#555',
        }}
      >
        <BarChart3 size={16} style={{ marginRight: 8 }} />
        {title}
      </h3>

      <Chart options={options} series={series} type="bar" height={220} />
    </div>
  );
};

type PieChartProps = {
  title: string;
  data: { key: string; value: string | number }[];
};

export const PieChart = ({ title, data }: PieChartProps) => {
  const labels = data.map((item) => item?.key);
  const series = data.map((item) => Number(item?.value || 0));

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
    },
    labels,
    legend: {
      position: 'bottom',
      fontSize: '13px',
      labels: {
        colors: '#333',
      },
    },
    dataLabels: {
      formatter: (val: number) => `${val.toFixed(0)}%`,
      style: {
        colors: ['#333'],
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} users`,
      },
    },
    stroke: {
      width: 1,
    },
    colors: ['#4945ff', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 260 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  return (
    <div
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: 12,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#555',
        }}
      >
        <Users size={16} style={{ marginRight: 8 }} />
        {title}
      </h3>

      <Chart options={options} series={series} type="donut" height={250} />
    </div>
  );
};
