import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../../../../../styles/buttons/general.css'
import { Modal } from '../../../../../components'
import { handleSubmitWrapper } from '../../../../../utils';

export default function LogoutModal({stateChecker, stateControl}) {
  const history = useNavigate(); // Get the history object
  const userData = {
    "user-email": localStorage.getItem('user-email'),
    "user-login-token": localStorage.getItem('login-token'),
    "action": 'logout-user'
  }

  const handleSubmit = async (event) => {
    try{
      const response = await handleSubmitWrapper(event, userData);
      if(response.success){
        localStorage.clear();
        history('/');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

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
       Cancel
      </button>
      <button
        type="button"
        className='main-btn'
        onClick={handleSubmit}
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
