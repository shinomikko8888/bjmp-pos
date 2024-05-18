import { color } from "chart.js/helpers";
import { scaleMonth, scaleYear } from "../../../constants/chart-scales";
import { _adapters } from "chart.js";
import { isoDayOfWeek } from "./date-management-test";
import { startOfDay, startOfToday } from "date-fns";
import { Chart } from "react-chartjs-2";



//For Testing

  export const matrixDataTest = () => {
    return {
        datasets: [{
          label: 'Basic matrix',
          data: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(200,200,0,0.3)',
          width: ({chart}) => (chart.chartArea || {}).width / 2 - 1,
          height: ({chart}) => (chart.chartArea || {}).height / 2 - 1,
        }],
      }
}

export const matrixOptionsTest = () => {
    return {
        scales: {
          x: {
            display: false,
            min: 0.5,
            max: 2.5,
            offset: false
          },
          y: {
            display: false,
            min: 0.5,
            max: 2.5
          }
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
export const barChartData = () => {
    return{
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Sales",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                data: [450, 520, 610, 590, 710],
            },
            {
                label: "Expenses",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                data: [320, 390, 450, 410, 480],
            }
        ]
    }
}

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

export const lineChartData = () => {
    return {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Sales",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(54, 162, 235, 1)",
                data: [450, 520, 610, 590, 710],
                fill: true,
            },
            {
                label: "Expenses",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255, 99, 132, 1)",
                data: [320, 390, 450, 410, 480],
                fill: true,
            }
        ]
    }
}
export const lineChartOptions = () => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontColor: "#333",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        color: "rgba(200, 200, 200, 0.2)",
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: "#333",
                    },
                },
            ],
        },
        legend: {
            display: true,
            position: "top",
            labels: {
                fontColor: "#333",
                fontSize: 14,
            },
        },
        tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
    }
}

export const pieChartData = () => {
    return {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1,
            }
        ]
    }
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