import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data.slice(0, 50));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData("https://retoolapi.dev/o5zMs5/data", setXData);
    fetchData("https://retoolapi.dev/gDa8uC/data", setYData);
  }, []);

  useEffect(() => {
    if (xData.length > 0 && yData.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      console.log(chartRef.current)
      
      // Destroy previous instance of Chart, if exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: xData.map(entry => entry.id), // Assuming each element of xData has a 'date' property
          datasets: [{
            label: 'Y-axis Data',
            data: yData.map(entry => entry.RandomNumber),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [xData, yData]);

  return <canvas ref={chartRef} style={{ marginLeft: '400px', width: '500px'}}/>;
};

export default ChartComponent;
