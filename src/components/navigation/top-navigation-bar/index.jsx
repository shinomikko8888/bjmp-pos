import React, { useEffect } from "react";
import '../../../styles/navigation-bars/top-navigation-bar/general.css'
//import TopNavSearchBar from "./search-bar";
import IconsRightTopNavBar from "./icons-right";
import { useState } from "react";
import { UserProfileModal } from "./modals";
import { fetchDataWrapper } from "../../../utils";
export default function TopNavigationBar({isSidebarOpen, toggleSidebar}){
    const [isNotifModalOpen, setNotifModalOpen] = useState(false);
    const [isUserProfileModalOpen, setUserProfileModalOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
      fetchData();
    }, [isUserProfileModalOpen])

    const fetchData = async () => {
      const rawData = await fetchDataWrapper('get-user', [['em', `'${localStorage.getItem('user-email')}'`]]);
      const userImage = rawData['user-image'] ? rawData['user-image'].replace('../api/files/images/users/', '') : '';
      setUserData(rawData);
      setImageSrc(userImage);
    }

    const iconFunctions = [
        {
            stateChecker: isNotifModalOpen,
            stateControl: setNotifModalOpen
        },
        {
            stateChecker: isUserProfileModalOpen,
            stateControl: setUserProfileModalOpen
        },
    ]

    
    return(<>
        <div className={`topnav ${isSidebarOpen ? 'open' : 'close'}`} >
            <div className="d-flex align-items-center justify-content-end">
                {/*<TopNavSearchBar />*/}
                <IconsRightTopNavBar props={iconFunctions} userData={userData} imageSrc={imageSrc}/>
            </div>
        </div>
        <UserProfileModal 
            stateChecker={isUserProfileModalOpen} 
            stateControl={() => setUserProfileModalOpen((prev) => !prev)} 
            userData={userData}
            imageSrc={imageSrc} 
            fetchOuterData={fetchData}/>
    </>);
}