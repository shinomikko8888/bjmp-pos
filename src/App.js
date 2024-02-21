import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./config";
import { hideNavBar, hideSideBar } from "./utils";

function App() {
  const location = useLocation();
  const isPageHasNavBar = hideNavBar(location, routes);
  // const isPageHasSideBar = hideSideBar(location, routes);
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
    document.title = "BJMP |"
  }, []);

  return (
    <div>
      {/*isPageHasNavBar && <Navbar />*/}
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
