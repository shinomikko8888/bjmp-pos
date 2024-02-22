import React, { useState, useEffect, useRef } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function SpendingChart(){
    const [selectedPeriod, setSelectedPeriod] = useState('Weekly');

    const BarChart = () => {
      const [chartData, setChartData] = useState([]);
      const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
      };
    
      /*useEffect(() => {
        axios.get(selectedPeriod === 'Weekly' ? 
        `${domain}/index.php?action=getWeeklySpending` :
        `${domain}/index.php?action=getMonthlySpending`)
        .then((response) => {
            setChartData(response.data);
        })
        .catch((error) => {
          console.error(`Error fetching ${selectedPeriod} spending data: `, error);
        })
  
      }, [])*/
      const titleText = selectedPeriod === 'Weekly' ? 'Weekly Spending Total' : 'Monthly Spending Total';
  
      const labels = selectedPeriod === 'Weekly' ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] : 
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
      const data = {
        labels,
        datasets: [
          {
            label: "Spending Amount in PHP" ,
            data: (23, 24, 66, 44, 96, 34, 20),
            backgroundColor: ['#10069F'],
            borderRadius: 50,
            barThickness: 10,
          },
        ],
      };
      console.log(data);
      const options = {
        
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `PHP ${value.toFixed(2)}`,
            },
          },
        },
        maintainAspectRatio: false, // Allow chart to resize to container
        responsive: true, // Enable responsiveness
      };
  
      const totalSpendingSum = chartData.reduce(
        (accumulator, entry) => accumulator + parseFloat(entry.total_spending),
        0
      );
      return (
        <div className='fourth-card'>
        <div className='row d-flex align-items-center position-relative'>
            <div className='col-8'>
              <p className="fw-bold ms-3 p-1 fs-6" 
              style={{ position: 'relative', top: '5px', textAlign: 'left' }}>
                {titleText}
              </p>
            </div>
            <div className='col-4 align-items-end justify-content-end'>
              <div className="position-absolute mb-5 top-0 end-0 p-2">
                <select
                  id="durationSelector"
                  className="form-select form-select-sm"
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                {/* Move the span for the specified week to the top right */}
              </div>
            </div>
            <div className='chart-container'>
            {totalSpendingSum !== 0  ? (
                <div style={{ height: '100%' }}>
                  <Bar data={data} options={options} />
                </div>
              ) : (
                <div className="text-center p-3">
                  <p className="text-muted mb-0" style={{padding: '100px'}}>No data available for the selected period.</p>
                </div>
              )}
          </div>
          </div>
      </div>
      );
    }
    return (
        <div>
            <div className='mt-2'>
                <BarChart selectedPeriod={selectedPeriod} />
            </div>
        </div>
    );
}