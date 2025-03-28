
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import '../../styles/dashboard-page/general.css'
import { InventorySection, OverviewSection, PDLSection } from './components';
import { fetchDataWrapper } from '../../utils';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [tableData, setTableData] = useState({
    pdlsWithLowBalance: [],
    highestSpenders: [],
    popularItems: [],
    lowStockedItems: [],
  });
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

    const pdlsWithLowBalance = data['pdls-with-low-balance'] || [];
    const mappedPdlsWithLowBalance = pdlsWithLowBalance.map(pdl => ({
      name: `${pdl['pdl-last-name'].toUpperCase()}, ${pdl['pdl-first-name']} ${pdl['pdl-middle-name']}`,
      balance: parseFloat(pdl['pdl-balance']).toFixed(2),
    }));
    const highestSpenders = data['highest-spenders'] || [];
    const mappedHighestSpenders = highestSpenders.map(pdl => ({
      name: `${pdl['pdl-last-name'].toUpperCase()}, ${pdl['pdl-first-name']} ${pdl['pdl-middle-name']}`,
      spendingTotal: parseFloat(pdl['total_spending']).toFixed(2),
    }));
    const popularItems = data['popular-items'] || [];
    const mappedPopularItems = popularItems.map(item => ({
      productName: `${item['product-name']} (${item['product-type']})`,
      sold: item['sales'],
    }));
    const lowStockedItems = data['low-stocked-items'] || [];
    const mappedLowStockedItems = lowStockedItems.map(item => ({
      productName: `${item['item-name']} (${item['item-type']})`,
      status: (() => {
        const remainingStock = parseInt(item['item-remaining-stock']);
        const criticalThreshold = parseInt(item['item-critical-threshold']);
        const halfCriticalThreshold = Math.round(criticalThreshold / 2);

        if (remainingStock > criticalThreshold) return 'Healthy';
        else if (remainingStock === criticalThreshold || (remainingStock < criticalThreshold && remainingStock > halfCriticalThreshold)) return 'Critical';
        else if (remainingStock < halfCriticalThreshold && remainingStock !== 0) return 'Severe';
        else if (remainingStock === 0) return 'Unavailable';
        else return 'Unavailable';
      
      })(),
      remStock: item['item-remaining-stock'],
    }));
    setTableData(prevState => ({
      ...prevState,
      pdlsWithLowBalance: mappedPdlsWithLowBalance,
      highestSpenders: mappedHighestSpenders,
      popularItems: mappedPopularItems,
      lowStockedItems: mappedLowStockedItems
    }));
  }
  console.log(tableData);
  return (
    <>
      <Helmet>
        <title>BJMP | Dashboard</title>
      </Helmet>
      <div>
        <OverviewSection data={dashboardData}/>
        <PDLSection data={tableData}/>
        <InventorySection data={tableData}/>
    </div>
    </>

  );
}

