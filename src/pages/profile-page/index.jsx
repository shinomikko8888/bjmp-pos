
import React, { useEffect, useState } from 'react';

import { ColoredCard } from '../dashboard-page/components/overview-section/components';
import { Helmet } from 'react-helmet-async';
import { fetchDataWrapper } from '../../utils';
import { ChartTemplate, SectionTitle } from '../../components';
import { color } from 'chart.js/helpers';
import { isoDayOfWeek } from '../../utils/data-management/chart-data/date-management-test';
import { _adapters } from 'chart.js';
import { startOfToday } from 'date-fns';
import { barChartData, barChartOptions, chartDataTest, chartOptionsTest, matrixDataTest, matrixOptionsTest } from '../../utils/data-management/chart-data';
import { LenderModal, PDLGeneralProfile, PaabotCreditors, RecentTransactions } from './components';
import { ADD_DESCRIPTION, ADD_TITLE, EDIT_DESCRIPTION, EDIT_TITLE } from '../../constants';
import { SuccessfulActionModal } from '../../components/modals/util-modals';

export default function Profile() {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get('id'); 
  const pk = urlparams.get('pk');
  const [pdlData, setPdlData] = useState({});
  const [imageSrc, setImageSrc] = useState(null);
  const [isLenderModalOpen, setLenderModalOpen] = useState(false);
  const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false)
  const [lenderModalSubmitted, setLenderModalSubmitted] = useState(false);
  const [creditorId, setCreditorId] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [primaryKey, setPrimaryKey] = useState('');
  const [modifyControl, setModifyControl] = useState({
    view: false,
    add: false,
    edit: false,
  })
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
      chartSelector: [{
        isDate: true,
      }]
    },
    {   
      chartCtx: 'productOverview',
      chartIcon: 'fa-solid fa-boxes',
      chartName: 'Purchased Products Overview',
      chartType: 'bar',
      chartSelector: [{
        isDate: true,
      }]
    },
  ];

  const submissionDetails = {
    title: `Creditor ${modifyControl.edit ? EDIT_TITLE : modifyControl.add ? ADD_TITLE : ''}`,
    description: `Creditor ${modifyControl.edit ? EDIT_DESCRIPTION : modifyControl.add ? ADD_DESCRIPTION : ""}`,
  }
  return (
    <div>
      <Helmet>
        <title>BJMP | PDL Profile</title>
      </Helmet>
      <div className='row d-flex align-items-center'>
        <SectionTitle title="PDL Profile" icon="fa-solid fa-user"/>
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
      <div className='row d-flex align-items-center mt-4'>
        <SectionTitle title="'Paabot' Creditors and Transactions" icon="fa-solid fa-tent-arrow-left-right"/>
      </div>
      <hr></hr>
      <div className='row d-flex align-items-start'>
        <div className='col-6'>
            <RecentTransactions branchLocation={pdlData['pdl-branch-location']} pid={id}/>
        </div>
        <div className='col-6'>
            <PaabotCreditors openLenderModal={() => setLenderModalOpen((prev) => !prev)} modifyControl={modifyControl} setModifyControl={setModifyControl}
             pid={id} branchLocation={pdlData['pdl-branch-location']} isSuccessfulActionModalOpen={isSuccessfulActionModalOpen} setCreditorId={setCreditorId}
             setSelectedRows={setSelectedRows} isSubmitted={lenderModalSubmitted}/>
        </div>
      </div>
      <LenderModal stateChecker={isLenderModalOpen} stateControl={() => setLenderModalOpen((prev) => !prev)} modifyControl={modifyControl}
      isSubmittedControl={() => setLenderModalSubmitted((prev) => !prev)} pid={id} branchLocation={pdlData['pdl-branch-location']} id={creditorId}/>
      <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)}
      isSubmitted={lenderModalSubmitted} isSubmittedControl={() => setLenderModalSubmitted((prev) => !prev)} actionTitle={submissionDetails.title} 
      actionDescription={submissionDetails.description}/>
    </div>
  );
}

