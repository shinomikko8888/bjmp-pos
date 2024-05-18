
import React, { useEffect, useState } from 'react';
import { PDLGeneralProfile } from './components';
import { ColoredCard } from '../dashboard-page/components/overview-section/components';
import { Helmet } from 'react-helmet-async';
import { fetchDataWrapper } from '../../utils';
import { ChartTemplate } from '../../components';
import { color } from 'chart.js/helpers';
import { isoDayOfWeek } from '../../utils/data-management/chart-data/date-management-test';
import { _adapters } from 'chart.js';
import { startOfToday } from 'date-fns';
import { barChartData, barChartOptions, chartDataTest, chartOptionsTest, matrixDataTest, matrixOptionsTest } from '../../utils/data-management/chart-data';

export default function Profile() {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get('id'); 
  const pk = urlparams.get('pk');
  const [pdlData, setPdlData] = useState({});
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    fetchData();
  }, [id]);
  function generateDataMonth() {
    const adapter = new _adapters._date();
    const data = [];
    let dt = adapter.startOf(new Date(), 'month');
    const end = adapter.endOf(dt, 'month');
    while (dt <= end) {
      const iso = adapter.format(dt, 'yyyy-MM-dd');
      data.push({
        x: isoDayOfWeek(dt),
        y: iso,
        d: iso,
        v: Math.random() * 50
      });
      dt = new Date(dt.setDate(dt.getDate() + 1));
    }
    return data;
  }
  function generateDataYear() {
    const data = [];
    const end = startOfToday();
    let dt = new Date(new Date().setDate(end.getDate() - 365));
    while (dt <= end) {
      const iso = dt.toISOString().substr(0, 10);
      data.push({
        x: iso,
        y: isoDayOfWeek(dt),
        d: iso,
        v: Math.random() * 50
      });
      dt = new Date(dt.setDate(dt.getDate() + 1));
    }
    return data;
  }
  const fetchData = async () => {
    try {
      let params = [['id', id]];
      const bjmpBranch = localStorage.getItem('bjmp-branch');
      if (bjmpBranch !== 'BJMPRO-III Main Office') {
          params.push(['br', bjmpBranch]);
      }
      const data = await fetchDataWrapper('get-pdl', params);
      const userImage = data['pdl-image'] ? data['pdl-image'].replace('../api/files/images/pdls/', '') : '';
      setPdlData(data);
      setImageSrc(userImage);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
  const coloredCards = [
    {
        color: 'blue-card profile-height',
        icon: 'fa-solid fa-money-bill fa-3x',
        name: 'Balance',
        data: pdlData['pdl-balance'] ? `₱${parseFloat(pdlData['pdl-balance']).toFixed(2)}` : '₱XX.XX',
        type: 'single',
        noSelector: true,
    },
    {
        color: 'yellow-card profile-height',
        icon: 'fa-solid fa-receipt fa-3x',
        name: 'Total Transactions',
        data: 'Nothing yet...',
        type: 'single'
    },
    {
        color: 'red-card profile-height',
        icon: 'fa-solid fa-box fa-3x',
        name: 'Favorite Product',
        data: 'Nothing yet...',
        type: 'single'
    },
    {
        color: 'green-card profile-height',
        icon: 'fa-solid fa-circle-dollar-to-slot fa-3x',
        name: 'Amount Spent',
        data: 'Nothing yet...',
        type: 'single'
    },
]
const chartData = [
    {   
      chartCtx: 'transactionMetrics',
      chartIcon: 'fa-solid fa-receipt',
      chartName: 'Transaction Metrics',
      chartType: 'matrix',
      chartSelect: [{
          label: 'Per Day',
          id: 0
      },
      {
          label: 'Per Month',
          id: 1
      }],
      chartData: [matrixDataTest(), matrixDataTest()],
      chartOptions: [matrixOptionsTest(), matrixOptionsTest()],
    },
    {   
      chartCtx: 'productOverview',
      chartIcon: 'fa-solid fa-boxes',
      chartName: 'Purchased Products Overview',
      chartType: 'bar',
      chartSelect: [{
        label: 'Today',
        id: 0,
      },
      {
        label: 'This Week',
        id: 1
      },
      {
        label: 'This Month',
        id: 2
      },
      {
        label: 'This Year',
        id: 3
      },
      {
        label: 'All-Time',
        id: 4
      }],
      chartData: [barChartData(), barChartData(), barChartData(), barChartData(), barChartData()],
      chartOptions: [barChartOptions(), barChartOptions(), barChartOptions(), barChartOptions(), barChartOptions()],
    },
  ];
  return (
    <div>
      <Helmet>
        <title>BJMP | PDL Profile</title>
      </Helmet>
      <div className='row d-flex align-items-center'>
            <div className='col-11 d-flex align-items-center'>
              <i className='fa-solid fa-user'></i>
              <h6 className="fw-bold fs-5 m-0 mx-3">PDL Profile</h6>
            </div>
      </div>
      <hr></hr>
      <div className='row d-flex align-items-start'>
          <div className='col-4'>
            <PDLGeneralProfile data={pdlData} imageSrc={imageSrc}/>
          </div>
          <div className='col-8'>
            <div className='row'>
              {coloredCards.map((value, index) => (
                <div key={index} className='col-6 px-2 pb-2'>
                  <ColoredCard props={value} />
                </div>
              ))}
            </div>
          </div>
      </div>
      <div className='row d-flex align-items-start'>
        <div className='col-6'>
            <ChartTemplate data={chartData[0]}/>
        </div>
        <div className='col-6'>
            <ChartTemplate data={chartData[1]}/>
        </div>
      </div>
      <div className='row d-flex align-items-center'>
            <div className='col-11 d-flex align-items-center'>
              <i className='fa-solid fa-tent-arrow-left-right'></i>
              <h6 className="fw-bold fs-5 m-0 mx-3 mt-2">'Paabot' Creditors and Transactions</h6>
            </div>
      </div>
      <hr></hr>
      <div className='row d-flex align-items-start'>
        <div className='col-6'>
            Recent Transactions
        </div>
        <div className='col-6'>
            'Paabot' Creditors
        </div>
      </div>
    </div>
  );
}

