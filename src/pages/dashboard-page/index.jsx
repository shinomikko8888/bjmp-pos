
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import '../../styles/dashboard-page/general.css'
import { InventorySection, OverviewSection, PDLSection } from './components';
import { fetchDataWrapper } from '../../utils';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = async () => {
    let params = [
      ['fw', 'dashboard'], 
      ['em', localStorage.getItem('user-email')],
    ];
    const bjmpBranch = localStorage.getItem('bjmp-branch');
      if (bjmpBranch !== 'BJMPRO-III Main Office') {
          params.push(['br', bjmpBranch]);
      }
    const data = await fetchDataWrapper('get-details', params);
    const mostPopularProducts = data['most-popular-products'];
    let mostPopularProduct = null;
    let highestQuantity = 0;
    for (const productName in mostPopularProducts) {
        const productQuantity = parseInt(mostPopularProducts[productName]);
        if (productQuantity > highestQuantity) {
            highestQuantity = productQuantity;
            mostPopularProduct = productName;
        }
    }
    data['most-popular-product'] = {
        'name': mostPopularProduct,
        'qty': highestQuantity
    };
    
    setDashboardData(data);
  }
  
  return (
    <>
      <Helmet>
        <title>BJMP | Dashboard</title>
      </Helmet>
      <div>
        <OverviewSection data={dashboardData}/>
        <PDLSection/>
        <InventorySection />
    </div>
    </>

  );
}

