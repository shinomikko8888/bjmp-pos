
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PosTable from './components';
import CheckoutTable from './components/sections/checkout-menu/checkout-table';
import { routes } from '../../config';
import { useLocation } from 'react-router-dom';
import { fetchDataWrapper /*includeCheckoutBar*/ } from '../../utils';
import PurchaseDetails from './components/modals/purchase-details';
import '../../styles/dashboard-page/pos.css'
import { FingerprintModal, SuccessfulActionModal } from '../../components/modals/util-modals';
export default function Pos() {
  const location = useLocation();
  //const isPageHasCheckoutbar = includeCheckoutBar(location, routes);
  const [isPurchaseDetailsModalOpen, setPurchaseDetailsModalOpen] = useState(false);
  const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
  const [isFingerprintModalOpen, setFingerprintModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultValue, setResultValue] = useState('');
  const [commodityData, setCommodityData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const totalPrice = commodityData.reduce((total, item) => {
    return total + (parseFloat(item['commodity-price']) * parseFloat(item['commodity-quantity']));
}, 0).toFixed(2);
  //const [listExtend, setListExtend] = useState(true);

  /*const toggleCheckoutBar = () => {
    setListExtend(!listExtend);
  }*/
  useEffect(() => {
    fetchCommodityData();
  }, [])

  useEffect(() => {
    fetchCommodityData();
  }, [isSubmitted])

  const fetchCommodityData = async() => {
    const rawData = await fetchDataWrapper('get-commodities', [['em', localStorage.getItem('user-email')]]);
    setCommodityData(rawData);
  }
  
  return (
    <div>
        <Helmet>
          <title>BJMP | Point of Sales</title>
        </Helmet>
        <div className='pos-page-container'>
          <PosTable fetchCommodityData={fetchCommodityData} commodityData={commodityData} setErrorMessage={setErrorMessage} isSubmitted={isSubmitted}/>
          <CheckoutTable openModal={() => setPurchaseDetailsModalOpen((prev) => !prev)} fetchCommodityData={fetchCommodityData}
          commodityData={commodityData} errorMessage={errorMessage} setErrorMessage={setErrorMessage} totalPrice={totalPrice}/>
        </div>
          
          {
            /* <CheckoutTable listExtend={listExtend} setListExtend={setListExtend} 
            openModal={() => setPurchaseDetailsModalOpen((prev) => !prev)}/>*/
          }
          
        <PurchaseDetails stateChecker={isPurchaseDetailsModalOpen} stateControl={setPurchaseDetailsModalOpen} commodityData={commodityData}
        totalPrice={totalPrice} isSubmittedControl={() => setIsSubmitted((prev) => !prev)} setResultValue={setResultValue} setFingerprintModalOpen={() => setFingerprintModalOpen((prev) => !prev)}
        isFingerprintModalOpen={isFingerprintModalOpen}/>
        <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)} 
            isSubmitted={isSubmitted} isSubmittedControl={() => setIsSubmitted((prev) => !prev)} actionTitle={'Purchase Transaction Complete!'} 
            actionDescription={`PDL's new balance is: ₱${parseFloat(resultValue).toFixed(2)}`}/>
        
    </div>
  );
}

