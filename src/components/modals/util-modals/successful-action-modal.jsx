import React from 'react';
import '../../../styles/buttons/general.css'
import Modal from '..';

export default function SuccessfulActionModal(props) {
    const {stateChecker, stateControl, actionTitle, actionDescription, isSubmitted, isSubmittedControl} = props;

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
