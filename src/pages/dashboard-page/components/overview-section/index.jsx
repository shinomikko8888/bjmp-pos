import React, { useEffect, useState } from "react";
import { ColoredCard } from "./components";
import { color, getHoverColor } from 'chart.js/helpers'
import { _adapters } from "chart.js";
import { ChartTemplate, SectionTitle } from "../../../../components";
import { isoDayOfWeek } from "../../../../utils/data-management/chart-data/date-management-test";
import { isDate, startOfToday } from "date-fns";
import { scaleMonth, scaleYear } from "../../../../constants/chart-scales";
import { barChartData, barChartOptions, matrixDataTest, matrixDateMonth, matrixDateMonthOption, matrixDateYear, matrixDateYearOption, matrixOptionsTest} from "../../../../utils/data-management/chart-data";
import { fetchDataWrapper } from "../../../../utils";

export default function OverviewSection(props){
    const {data} = props

    const coloredCards = [
        {
            color: 'blue-card',
            icon: 'fa-solid fa-comments-dollar fa-3x',
            name: `All Time PDL Spending Total ${
                localStorage.getItem('bjmp-branch') !== 'BJMPRO-III Main Office' ? 
                `for ${localStorage.getItem('bjmp-branch')}` : ''}`,
            data: `₱${parseFloat(data['all-time-pdl-spending-total']).toFixed(2)}`,
            type: 'single',
            noSelector: true,
        },
        {
            color: 'yellow-card',
            icon: 'fa-solid fa-receipt fa-3x',
            name: 'All Time Total Transactions',
            data: data['all-time-total-transactions'],
            type: 'single',
            noSelector: true
        },
        {
            color: 'red-card',
            icon: 'fa-solid fa-cart-flatbed fa-3x',
            name: 'Most Popular Product of All Time',
            firstModifier: 'Product (Abbreviated)',
            firstData: data['most-popular-product'] && data['most-popular-product'].name || '',
            secondModifier: 'Sales',
            secondData: data['most-popular-product'] && data['most-popular-product'].qty || '',
            type: 'double',
            noSelector: true,
        },
        {
            color: 'green-card',
            icon: 'fa-solid fa-money-bill fa-3x',
            name: 'Money in Circulation',
            data: `₱${parseFloat(data['money-in-circulation']).toFixed(2)}`,
            type: 'single',
            noSelector: true,
        },
    ]
    const chartData = [
      {   
          chartCtx: 'spendTotal',
          chartIcon: 'fa-solid fa-comments-dollar',
          chartName: 'Spending Total',
          chartType: 'matrix',
          chartSelector: [{
            isDate: true,
          }],
          chartColor: 'blue'
      },
      {   
        chartCtx: 'totalTransac',
        chartIcon: 'fa-solid fa-receipt',
        chartName: 'Total Transactions',
        chartType: 'matrix',
        chartSelector: [{
            isDate: true,
        }],
        chartColor: 'red'

    },
    ];

    return(
    <>
        <div className='row d-flex align-items-center'>
            <SectionTitle title="Overview" icon="fa-solid fa-chart-simple"/>
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