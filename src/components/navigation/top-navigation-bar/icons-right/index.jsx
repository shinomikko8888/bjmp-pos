import React, { useState } from "react";
import '../../../../styles/navigation-bars/top-navigation-bar/general.css';
import BJMPLogo from '../../../../assets/png/bjmp-logo.png'
import { DOMAIN } from "../../../../constants";

export default function IconsRightTopNavBar({props, userData, imageSrc}){
  const { stateChecker: isNotifModalOpen, stateControl: setNotifModalOpen } = props[0];
  const { stateChecker: isUserProfileModalOpen, stateControl: setUserProfileModalOpen } = props[1];
    return(
      <>
    <div className='row d-flex justify-content-center align-items-center mt-3 ms-3'>
        <div className='col-4 mt-2'>
          <i
            className="fa-regular fa-bell fa-sm"
            onClick={() => setNotifModalOpen((prev) => !prev)}
            style={{ color: '#858D9D', cursor: 'pointer', fontSize: '20px' }}
          ></i>
        </div>
        <div className='col-8' style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${DOMAIN}/files/images/users/${imageSrc}`} // Use the imported image
            alt="profileImage"
            className='me-4'
            onClick={() => setUserProfileModalOpen((prev) => !prev)}
            style={{ width: '35px', height: '35px', cursor: 'pointer', borderRadius: '50%', marginRight: '10px' }}
          />
          
          {/* You can adjust the styles above to control the spacing */}
        </div>
        
      </div>

      </>
    );



}