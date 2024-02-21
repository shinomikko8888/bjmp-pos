import '../../../styles/navigation-bars/side-navigation-bar/general.css'
import '../../../assets/png/bjmp-logo.png'
import SidebarButtons from './buttons';
import BJMPLogo from '../../../assets/png/bjmp-logo.png'
import { useState, useEffect } from 'react';
import { LogoutModal } from './modals';

export default function SideNavigationBar({isSidebarOpen, toggleSidebar}){
    const [content, setContent] = useState('');
    useEffect(() => {
        const handleResize = () => {
          // Update content based on screen width
          if (window.innerWidth < 1368) {
            setContent('BJMP');
          } else {
            setContent('Bureau of Jail Management and Penology, Region III');
          }
        };
    
        // Listen for window resize
        window.addEventListener('resize', handleResize);
    
        // Call the handleResize function once to set the initial content
        handleResize();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); // Empty dependency array to run the effect only once
    
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [isSettingModalOpen, setSettingModalOpen] = useState(false); 
    const dashboardNavigationButtons = [
        //Main Dashboard Navigation
        {   
            type: 'Main',
            path: '/dashboard',
            icon: 'fa-solid fa-gauge',
            name: 'Dashboard',
        },
        {
            type: 'Main',
            path: '/pdls',
            icon: 'fa-solid fa-person',
            name: 'PDLs',
        },
        {
            type: 'Main',
            path: '/inventory',
            icon: 'fa-solid fa-boxes-stacked',
            name: 'Inventory',
        },
        {
            type: 'Main',
            path: '/pos',
            icon: 'fa-solid fa-bag-shopping',
            name: 'Point-of-Sales',
        },
        {
            type: 'Main',
            path: '/load',
            icon: 'fa-solid fa-money-bill-transfer',
            name: 'Load PDL',
        },
        {
            type: 'Main',
            path: '/audit',
            icon: 'fa-solid fa-chart-simple',
            name: 'Audit Trail',
        },
        {
            type: 'Main',
            path: '/users',
            icon: 'fa-solid fa-user',
            name: 'Users',
        },
        //Modal Dashboard Navigation
        {
            type: 'Modal',
            stateChecker: isSettingModalOpen,
            stateControl: () => setSettingModalOpen((prev) => !prev), 
            icon: 'fa-solid fa-gear',
            name: 'Settings',
        },
        {
            type: 'Modal',
            stateChecker: isLogoutModalOpen,
            stateControl: () => setLogoutModalOpen((prev) => !prev), 
            icon: 'fa-solid fa-right-from-bracket',
            name: 'Logout',
        },
    ]
    const mainButtons = dashboardNavigationButtons.filter(button => button.type === 'Main');
    const modalButtons = dashboardNavigationButtons.filter(button => button.type === 'Modal');

    
    return(
        <>
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'close'}`}>
        <div className='logo-details' onClick={toggleSidebar}>
          <img className='logo' src={BJMPLogo} alt="BJMP Logo" style={{cursor: 'pointer'}}/>
          <div className='logo-name'>{content}</div>
          {isSidebarOpen && ( // Render only when the sidebar is open
            <i className="bx bx-menu" id="btn" onClick={toggleSidebar} style={{cursor: 'pointer'}}></i>
            )}
        </div>
        <ul>
            {mainButtons.map(value => (
                <SidebarButtons key={value.path} props={value} isSidebarOpen={isSidebarOpen}/>
            ))}
            <div className='bottom-links'>
            {modalButtons.map(value => (
                <SidebarButtons key={value.component} props={value} isSidebarOpen={isSidebarOpen}/>
            ))}
            </div>
        </ul>

        </div>
        <LogoutModal stateChecker={isLogoutModalOpen} stateControl={() => setLogoutModalOpen((prev) => !prev)}/>
        </>
    );


}