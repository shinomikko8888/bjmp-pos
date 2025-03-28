import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { routes } from "./config";
import { fetchDataWrapper, hideNavBar, hideSideBar /*includeCheckoutBar*/ } from "./utils";
import { SideNavigationBar, TopNavigationBar } from "./components";
import './App.css'
import Modal from "./components/modals";
import { ProtectedRoute, isAuthenticated } from "./utils/auth";
import { Chart as ChartJS, registerables} from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import 'chartjs-adapter-date-fns';
import CheckoutTable from "./pages/pos-page/components/sections/checkout-menu/checkout-table";
import './styles/transitions/general.css'
function App() {
  ChartJS.register(MatrixController, MatrixElement, ...registerables);
  const location = useLocation();
  const isPageHasNavBar = hideNavBar(location, routes);
  const isPageHasSideBar = hideSideBar(location, routes);
  //const isPageHasCheckoutbar = includeCheckoutBar(location, routes);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [listExtend, setListExtend] = useState(false);
  const [userType, setUserType] = useState('');
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleCheckoutBar = () => {
    setListExtend(!listExtend);
  }
  
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  };
  const [display, setDisplay] = useState(true);
  const disableMobileView = () => {
    const isMobile = isMobileDevice();
    if (isMobile) {
      setDisplay(false);
    }
    else{
      setDisplay(true);
    }
  };

  useEffect(() => {
    // Call the function to disable mobile view when the component mounts
    disableMobileView();
    if(!isPageHasSideBar){
      setIsSidebarOpen(false);
    }
  }, []);
  const sidebarClass = isPageHasSideBar ? (isSidebarOpen ? 'sidebar-open' : 'sidebar-closed') : '';
  const combinedClassName = `${sidebarClass}`.trim();
  
  useEffect(() => {
    fetchData();
  }, [localStorage.getItem('user-email')])

  

  const fetchData = async () => {
    if(localStorage.getItem('user-email')){
      const response = await fetchDataWrapper('get-user', [['em', `'${localStorage.getItem('user-email')}'`]])
      setUserType(response['user-type']);
    }
  }
  return (
    <div>
      {isPageHasSideBar && <SideNavigationBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userType={userType}/>}
      {isPageHasNavBar && <TopNavigationBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}
      
      <div className={combinedClassName}>

      <Routes>
        {routes.map(route => (
          route.protected ? (
            <Route key={route.path} path={route.path} element={isAuthenticated() ? route.component : <Navigate to="/login" />} />
          ) : (
            <Route key={route.path} path={route.path} element={!isAuthenticated() ? route.component : <Navigate to={userType !== 'Concessionaire Officer' ? "/dashboard" : "/pos"}/> } />
          ))
        )}
      </Routes>
      </div>
    </div>
  );
}

export default App;
