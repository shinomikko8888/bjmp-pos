
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PosTable from './components';
import CheckoutTable from './components/sections/checkout-menu/checkout-table';
import { routes } from '../../config';
import { useLocation } from 'react-router-dom';
import { includeCheckoutBar } from '../../utils';
import PurchaseDetails from './components/modals/purchase-details';

export default function Pos() {
  const location = useLocation();
  const isPageHasCheckoutbar = includeCheckoutBar(location, routes);
  const [isPurchaseDetailsModalOpen, setPurchaseDetailsModalOpen] = useState(false);
  const [listExtend, setListExtend] = useState(false);
  const checkoutClass = isPageHasCheckoutbar ? (listExtend ? 'checkout-table-open' : 'checkout-table-closed') : '';
  const toggleCheckoutBar = () => {
    setListExtend(!listExtend);
  }
  return (
    <div>
        <Helmet>
          <title>BJMP | Point of Sales</title>
        </Helmet>
        {isPageHasCheckoutbar && <CheckoutTable listExtend={listExtend} setListExtend={setListExtend} 
        openModal={() => setPurchaseDetailsModalOpen((prev) => !prev)}/>}
        <div className={checkoutClass}>
          <PosTable />
        </div>
        <PurchaseDetails stateChecker={isPurchaseDetailsModalOpen} stateControl={setPurchaseDetailsModalOpen}/>
    </div>
  );
}

