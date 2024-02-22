import React from "react";
import { ColoredCard, SpendingChart, TransactionsChart } from "./components";
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
            <div className='row mt-2'>
                <div className='col-6'>
                    <SpendingChart />
                </div>
                <div className='col-6'>
                    <TransactionsChart />
                </div>
            </div>
        </div>
      </div>
    </>);

}