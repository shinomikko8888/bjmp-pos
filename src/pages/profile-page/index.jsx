
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
import { FingerprintModal, RemoveFingerprintModal, SuccessfulActionModal } from '../../components/modals/util-modals';

export default function Profile() {
  const urlparams = new URLSearchParams(window.location.search);
  const id = urlparams.get('id'); 
  const pk = urlparams.get('pk');
  const [pdlData, setPdlData] = useState({});
  const [imageSrc, setImageSrc] = useState(null);
  const [isLenderModalOpen, setLenderModalOpen] = useState(false);
  const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
  const [isFSuccessfullActionModalOpen, setFSuccessfulActionModalOpen] = useState(false);
  const [isFingerprintModalOpen, setFingerprintModalOpen] = useState(false);
  const [isRemoveFingerprintModalOpen, setRemoveFingerprintModalOpen] = useState(false);
  const [lenderModalSubmitted, setLenderModalSubmitted] = useState(false);
  const [fingerprintModalSubmitted, setFingerprintModalSubmitted] = useState(false);
  const [creditorId, setCreditorId] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [primaryKey, setPrimaryKey] = useState('');
  const [modifyControl, setModifyControl] = useState({
    view: false,
    add: false,
    edit: false,
  }) 
  const [cardData, setCardData] = useState({})


  useEffect(() => {
    fetchData();
  }, [pk]);
  
  const fetchData = async () => {
    try {
      let params = [['id', pk], ['fw', 'profile'], ];
      const bjmpBranch = localStorage.getItem('bjmp-branch');
      if (bjmpBranch !== 'BJMPRO-III Main Office') {
          params.push(['br', bjmpBranch]);
      }
      const data = await fetchDataWrapper('get-pdl', params);
      const userImage = data['pdl-image'] ? data['pdl-image'].replace('../api/files/images/pdls/', '') : '';
      setPdlData(data);
      setImageSrc(userImage);
      const cData = await fetchDataWrapper('get-details', params);
      setCardData(cData);


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
        data: cardData['pdl-total-transactions'] ? cardData['pdl-total-transactions'] : 'XX' ,
        type: 'single',
        noSelector: true
        
    },
    {
        color: 'red-card profile-height',
        icon: 'fa-solid fa-box fa-3x',
        name: 'Favorite Product',
        data: cardData['favorite-product'] ? cardData['favorite-product'].name : 'XXXXXXX' ,
        type: 'single',
        noSelector: true
    },
    {
        color: 'green-card profile-height',
        icon: 'fa-solid fa-circle-dollar-to-slot fa-3x',
        name: 'Amount Spent',
        data: cardData['amount-spent'] ? `₱${parseFloat(cardData['amount-spent']).toFixed(2)}` : '₱XX.XX',
        type: 'single',
        noSelector: true
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
      }],
      chartColor: '#449600'
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

  const fingerprintDetails = {
    title: `Fingerprint Uploaded`,
    description: `PDL's Fingerprint has been uploaded!`
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
            <PDLGeneralProfile data={pdlData} imageSrc={imageSrc} setFingerprintModalOpen={() => setFingerprintModalOpen((prev) => !prev)}
              setRemoveFingerprintModalOpen={() => setRemoveFingerprintModalOpen((prev) => !prev)}/>
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
            <RecentTransactions branchLocation={pdlData['pdl-branch-location']} pid={pk}/>
        </div>
        <div className='col-6'>
            <PaabotCreditors openLenderModal={() => setLenderModalOpen((prev) => !prev)} modifyControl={modifyControl} setModifyControl={setModifyControl}
             pid={pk} branchLocation={pdlData['pdl-branch-location']} isSuccessfulActionModalOpen={isSuccessfulActionModalOpen} setCreditorId={setCreditorId}
             setSelectedRows={setSelectedRows} isSubmitted={lenderModalSubmitted}/>
        </div>
      </div>
      <LenderModal stateChecker={isLenderModalOpen} stateControl={() => setLenderModalOpen((prev) => !prev)} modifyControl={modifyControl}
      isSubmittedControl={() => setLenderModalSubmitted((prev) => !prev)} pid={pk} branchLocation={pdlData['pdl-branch-location']} id={creditorId}/>
      <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)}
      isSubmitted={lenderModalSubmitted} isSubmittedControl={() => setLenderModalSubmitted((prev) => !prev)} actionTitle={submissionDetails.title} 
      actionDescription={submissionDetails.description}/>
      <SuccessfulActionModal stateChecker={isFSuccessfullActionModalOpen} stateControl={() => setFSuccessfulActionModalOpen((prev) => !prev)}
      isSubmitted={fingerprintModalSubmitted} isSubmittedControl={() => setFingerprintModalSubmitted((prev) => !prev)} actionTitle={fingerprintDetails.title} 
      actionDescription={fingerprintDetails.description}/>
      <FingerprintModal stateChecker={isFingerprintModalOpen} stateControl={() => setFingerprintModalOpen()} type="create" pdlData={pdlData}
      isSubmittedControl={() => setFingerprintModalSubmitted()} isSubmitted={fingerprintModalSubmitted} fetchData={() => fetchData()} />
      <RemoveFingerprintModal stateChecker={isRemoveFingerprintModalOpen} stateControl={() => setRemoveFingerprintModalOpen()} pid={pk} fetchData={() => fetchData()} />
    </div>
  );
}

