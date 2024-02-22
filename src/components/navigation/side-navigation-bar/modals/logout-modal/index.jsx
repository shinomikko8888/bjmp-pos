import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../../../../../styles/buttons/general.css'
import { Modal } from '../../../../../components'

export default function LogoutModal({stateChecker, stateControl}) {
  const history = useNavigate(); // Get the history object

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to the login page or wherever you want after logout
    history('/');
  };

  const logoutHeader = (
    <div className='w-100 text-center'>
        <i className='fa-regular fa-circle-check' style={{ fontSize: '40px' }}></i>
    </div>
    
  );

  const logoutBody = (
    <div className='text-center'>
      <h3>Logout?</h3>
      <p>Are you sure you want to logout?</p>
    </div>
  );

  const logoutFooter = (
    <div className='d-flex align-items-center justify-content-end'>
      <button
        type="button"
        className='link-btn mx-2'
        onClick={() => stateControl((prev) => !prev)}
      >
        No, Cancel
      </button>
      <button
        type="button"
        className='main-btn'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );

  return <Modal headerContent={logoutHeader} 
  bodyContent={logoutBody} 
  footerContent={logoutFooter} 
  stateChecker={stateChecker} 
  stateControl={stateControl}
  customWidth={'25%'}
  customZIndex={20}/>;
}
