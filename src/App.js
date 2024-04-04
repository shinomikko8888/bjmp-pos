import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { routes } from "./config";
import { hideNavBar, hideSideBar } from "./utils";
import { SideNavigationBar, TopNavigationBar } from "./components";
import './App.css'
import Modal from "./components/modals";
import { ProtectedRoute, isAuthenticated } from "./utils/auth";


function App() {
  const location = useLocation();
  const isPageHasNavBar = hideNavBar(location, routes);
  const isPageHasSideBar = hideSideBar(location, routes);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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


  return (
    <div>
      {isPageHasSideBar && <SideNavigationBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      {isPageHasNavBar && <TopNavigationBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}


      <div className={isPageHasSideBar && isSidebarOpen ? 'sidebar-open' : 
      isPageHasSideBar && !isSidebarOpen ? 'sidebar-closed' : ''}>

      <Routes>
        {routes.map(route => (
          route.protected ? (
            <Route key={route.path} path={route.path} element={isAuthenticated() ? route.component : <Navigate to="/login" />} />
          ) : (
            <Route key={route.path} path={route.path} element={route.component} />
          ))
        )}
      </Routes>
      </div>
    </div>
  );
}

export default App;
