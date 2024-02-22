
import React from 'react';
import { Helmet } from "react-helmet-async";
import '../../styles/dashboard-page/general.css'
import { InventorySection, OverviewSection, PDLSection } from './components';

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>BJMP | Dashboard</title>
      </Helmet>
      <div>
        <OverviewSection />
        <PDLSection/>
        <InventorySection/>
    </div>
    </>

  );
}

