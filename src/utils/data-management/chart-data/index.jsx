import { color } from "chart.js/helpers";
import { scaleMonth, scaleYear } from "../../../constants/chart-scales";
import { _adapters } from "chart.js";
import { isoDayOfWeek } from "./date-management-test";
import { startOfDay, startOfToday } from "date-fns";
import { Chart } from "react-chartjs-2";
import { MONTHS } from "../../../constants";



export const barChartData = (data) => {
  // Check if data is defined and is an array
  if (!Array.isArray(data) || data.length === 0) {
      return {
          labels: [],
          datasets: []
      };
  }

  // Sort the data by sales in descending order
  data.sort((a, b) => b.sales - a.sales);

  // Extract products and sales from the sorted data
  const products = data.map(item => item.product);
  const sales = data.map(item => item.sales);

  return {
      labels: products,
      datasets: [
          {
              label: "Sales",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              data: sales,
          }
      ]
  };
};



export const barChartOptions = () => {
    return {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        maintainAspectRatio: false, // Allow chart to resize to container
        responsive: true, // Enable responsiveness
        legend: {
            display: true,
            position: 'top',
            labels: {
                fontColor: '#333',
                fontSize: 14
            }
        }
    }
}

export const lineChartData = (data) => {
  const labels = [];
  const revenueData = [];
  const costsData = [];
  const profitData = [];

  // Process data to fill labels and datasets
  data.forEach((periodData) => {
    labels.push(periodData.start);
    revenueData.push(periodData.revenue);
    costsData.push(periodData.costs);
    profitData.push(periodData.profit);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        data: revenueData,
        fill: true,
      },
      {
        label: "Costs",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        data: costsData,
        fill: true,
      },
      {
        label: "Profit",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        data: profitData,
        fill: true,
      },
    ],
  };
};

export const lineChartOptions = () => {
  return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          x: {
              grid: {
                  display: false,
              },
              ticks: {
                  color: "#333",
              },
          },
          y: {
              grid: {
                  color: "rgba(200, 200, 200, 0.2)",
              },
              ticks: {
                  beginAtZero: true,
                  color: "#333",
              },
          },
      },
      plugins: {
          legend: {
              display: true,
              position: "top",
              labels: {
                  color: "#333",
                  fontSize: 14,
              },
          },
          tooltip: {
              enabled: true,
              mode: "index",
              intersect: false,
          },
          hover: {
              mode: "nearest",
              intersect: true,
          },
      },
  }
}

export const pieChartData = (data) => {
  if (!Array.isArray(data)) {
      // If data is not an array, return an empty dataset
      return {
          labels: [],
          datasets: []
      };
  }

  const colors = {
      "Senior": "rgba(16, 6, 159, 0.2)",
      "PWD": "rgba(228, 0, 43, 0.2)",
      "LGBT": "rgba(255, 223, 0, 0.2)",
      "Regular": "rgba(68, 150, 0, 0.2)"
  };

  const labels = data.map(item => item.label);
  const values = data.map(item => parseInt(item.value));

  const backgroundColors = labels.map(label => colors[label]);
  const borderColors = labels.map(label => colors[label].replace("0.2", "0.5"));

  return {
      labels: labels,
      datasets: [
          {
              label: "Frequency",
              data: values,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
          }
      ]
  };
}

export const pieChartOptions = () => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'top',
            labels: {
                fontColor: '#333',
                fontSize: 14
            }
        },
        tooltips: {
            enabled: true,
        }
    }
}


export const matrixDateMonth = (data, bgColor) => {
    return {
        datasets: [{
          data: data,
          backgroundColor({raw}) {
            const alpha = (10 + raw.v) / (raw.v + 10 * 10);
            return color(bgColor).alpha(alpha).rgbString();
          },
          borderColor({raw}) {
            const alpha = (10 + raw.v) / (raw.v + 10 * 10);
            return color('black').alpha(alpha).darken(0.3).rgbString();
          },
          borderWidth: 1,
          hoverBackgroundColor: 'yellow',
          hoverBorderColor: 'yellowgreen',
          width: ({chart}) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 3,
          height: ({chart}) =>(chart.chartArea || {}).height / chart.scales.y.ticks.length - 3
        }]
      };
}

export const matrixDateMonthOption = (date, ctx) =>{
    return {
        plugins: {
            legend: false,
            tooltip: {
              displayColors: false,
              callbacks: {
                title() {
                  return '';
                },
                label(context) {
                  const v = context.dataset.data[context.dataIndex];
                  return ['d: ' + v.d, 'v: ' + v.v.toFixed(2)];
                }
              }
            },
          },
          scales: scaleMonth(date, ctx),
          layout: {
            padding: {
              top: 10,
            }
          }
    }
}

export const matrixDateYear = (data, bgColor, year) => {
    return {
        datasets: [{
            label: `${year}`,
            data: data,
            backgroundColor(c) {
              const value = c.dataset.data[c.dataIndex].v;
              const alpha = (10 + value) / (value + 10 * 10);
              return color(bgColor).alpha(alpha).rgbString();
            },
            borderColor(c) {
              const value = c.dataset.data[c.dataIndex].v;
              const alpha = (10 + value) / (value + 10 * 10);
              return color(bgColor).alpha(alpha).darken(0.3).rgbString();
            },
            borderWidth: 1,
            hoverBackgroundColor: 'yellow',
            hoverBorderColor: 'yellowgreen',
            width(c) {
              const a = c.chart.chartArea || {};
              return (a.right - a.left) / 53; // Adjust this value as needed
            },
            height(c) {
              const a = c.chart.chartArea || {};
              return (a.bottom - a.top) / 7; // Adjust this value as needed
            }
          }]
    }
}

export const matrixDateYearOption = (date, ctx) => {
    return{
        aspectRatio: 5,
        plugins: {
          legend: false,
          tooltip: {
            displayColors: false,
            callbacks: {
              title() {
                return '';
              },
              label(context) {
                const v = context.dataset.data[context.dataIndex];
                return ['d: ' + v.d, 'v: ' + v.v.toFixed(2)];
              }
            }
          },
        },
        scales: scaleYear(date, ctx),
        layout: {
          padding: {
            top: 10
          }
        }
    }
}
