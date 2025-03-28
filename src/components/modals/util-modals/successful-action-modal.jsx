import React from 'react';
import '../../../styles/buttons/general.css'
import Modal from '..';
import { useNavigate } from 'react-router-dom';

export default function SuccessfulActionModal(props) {
    const {stateChecker, stateControl, actionTitle, actionDescription, isSubmitted, isSubmittedControl, isLogOut, isResetPass} = props;
    const nav = useNavigate();
    const successfulActionHeader = (
        <div className='w-100 text-center'>
            <i className='fa-regular fa-circle-check' style={{ fontSize: '40px' }}></i>
        </div>
        
    );

    const successfulActionBody = (
        <div className='text-center'>
        <h3>{actionTitle}</h3>
        <p>{actionDescription}</p>
        </div>
    );

    const successfulActionFooter = (
        <div className='d-flex align-items-center justify-content-end '>
        <button
            type="button"
            className='main-btn'
            onClick={() => {
                stateControl((prev) => !prev);
                isSubmittedControl((prev) => !prev);
                if (isLogOut || isResetPass) {
                    nav('/');
                } 
            }}
        >
            OK
        </button>
        </div>
    );

    return <Modal headerContent={successfulActionHeader} 
    bodyContent={successfulActionBody} 
    footerContent={successfulActionFooter} 
    stateChecker={isSubmitted} 
    stateControl={stateControl}
    customWidth={'30%'}
    customZIndex={20}/>;
}
