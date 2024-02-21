import React from "react";
import '../../../styles/navigation-bars/top-navigation-bar/general.css'
import TopNavSearchBar from "./search-bar";
import IconsRightTopNavBar from "./icons-right";
import { useState } from "react";
import { UserProfileModal } from "./modals";
export default function TopNavigationBar({isSidebarOpen, toggleSidebar}){
    const [isNotifModalOpen, setNotifModalOpen] = useState(false);
    const [isUserProfileModalOpen, setUserProfileModalOpen] = useState(false);

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
            <div className="d-flex align-items-center justify-content-between">
                <TopNavSearchBar />
                <IconsRightTopNavBar props={iconFunctions}/>
            </div>
        </div>
        <UserProfileModal stateChecker={isUserProfileModalOpen} stateControl={() => setUserProfileModalOpen((prev) => !prev)}/>
    </>);
}