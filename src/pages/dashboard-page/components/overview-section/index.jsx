import React, { useEffect, useState } from "react";
import { ColoredCard } from "./components";
import { color, getHoverColor } from 'chart.js/helpers'
import { _adapters } from "chart.js";
import { ChartTemplate } from "../../../../components";
import { isoDayOfWeek } from "../../../../utils/data-management/chart-data/date-management-test";
import { startOfToday } from "date-fns";
import { scaleMonth, scaleYear } from "../../../../constants/chart-scales";
import { barChartData, barChartOptions, matrixDataTest, matrixOptionsTest} from "../../../../utils/data-management/chart-data";
export default function OverviewSection(){
    const coloredCards = [
        {
            color: 'blue-card',
            icon: 'fa-solid fa-comments-dollar fa-3x',
            name: 'PDL Spending Total',
            data: 'Nothing yet...',
            type: 'single'
        },
        {
            color: 'yellow-card',
            icon: 'fa-solid fa-receipt fa-3x',
            name: 'Total Transactions',
            firstModifier: 'All Time',
            firstData: '0',
            secondModifier: 'This Week',
            secondData: '0',
            type: 'double'
        },
        {
            color: 'red-card',
            icon: 'fa-solid fa-cart-flatbed fa-3x',
            name: 'Most Popular Product',
            data: 'Nothing yet...',
            type: 'single'
        },
        {
            color: 'green-card',
            icon: 'fa-solid fa-money-bill fa-3x',
            name: 'Money in Circulation',
            data: 'Nothing yet...',
            type: 'single'
        },
    ]
    const chartData = [
      {   
          chartCtx: 'spendTotal',
          chartIcon: 'fa-solid fa-comments-dollar',
          chartName: 'Spending Total',
          chartType: 'matrix',
          chartSelect: [
              { label: 'Per Day', id: 0 },
              { label: 'Per Month', id: 1 }
          ],
          chartData: [matrixDataTest(), matrixDataTest()],
          chartOptions: [matrixOptionsTest(), matrixOptionsTest()],
      },
      {   
        chartCtx: 'totalTransac',
        chartIcon: 'fa-solid fa-receipt',
        chartName: 'Total Transactions',
        chartType: 'bar',
        chartSelect: [
            { label: 'Per Day', id: 0 },
            { label: 'Per Month', id: 1 }
        ],
        chartData: [barChartData(), barChartData()],
        chartOptions: [barChartOptions(), barChartOptions()],
    },
    ];
    

    return(
    <>
        <div className='row d-flex align-items-center'>
            <div className='col-11 d-flex align-items-center'>
            <i className='fa-solid fa-chart-simple'></i>
            <h6 className="fw-bold fs-5 m-0 mx-3">Overview</h6>
            </div>
            <div className='col-1 d-flex justify-content-center align-items-center'>
        </div>
      </div>
      <hr></hr>
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            
            {coloredCards.map(value => (
                <div className='col-3'>
                    <ColoredCard key={value.path} props={value} />
                </div>
            ))}
            </div>
            <div className='row mt-3'>
                <div className='col-6'>
                    {<ChartTemplate data={chartData[0]}/>
                    }
                </div>
                <div className='col-6'>
                    {<ChartTemplate data={chartData[1]}/>
                    }
                </div>
            </div>
        </div>
      </div>
    </>);

}