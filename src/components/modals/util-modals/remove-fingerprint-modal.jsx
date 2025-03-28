import React, { useEffect, useState } from 'react'
import Modal from '..'
import { handleSubmitWrapper } from '../../../utils';

export default function RemoveFingerprintModal(props){
    const {stateChecker, stateControl, pid, fetchData} = props
    const [buttonState, setButtonState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fingerprintValue, setFingerprintValue] = useState({})

    useEffect(() => {
        setFingerprintValue({
          ...fingerprintValue,
          pk: pid && pid,
          action: 'remove-fingerprint',
          user: localStorage.getItem('user-email'),
        })
      }, [pid] )
      const handleSubmit = async (event) => {
        if(fingerprintValue.reason === '')
          setErrorMessage('Please set a reason for archiving!');
        else{
          setErrorMessage('');
          setButtonState(true);
          try{
            const response = await handleSubmitWrapper(event, fingerprintValue, true);
            if (response.success) {
                stateControl((prev) => !prev)
                setButtonState(false);
                fetchData();
            } else {
                setButtonState(false);
            }
          } catch (error) {
            console.error('Error: ', error);
            setButtonState(false);
          }
        }
        
    }
    const removeFingerprintModalHeader = (
        <div className='w-100 text-center'>
            <i className='fa-solid fa-fingerprint' style={{ fontSize: '40px' }}></i>
        </div> 
    )

    const removeFingerprintModalBody = (
        <>
        <div className='text-center'>
            <h3>Unenroll Fingerprint?</h3>
            <p>Are you sure you want to remove the enrolled fingerprint? 
                </p>
        </div>
        </>
    )
    const removeFingerprintModalFooter = (
    <><div className='d-flex align-items-center justify-content-end'>
          <p className="error-message">{errorMessage}</p>
          <button
            type="button"
            className='link-btn mx-2'
            onClick={() => stateControl((prev) => !prev)}
            disabled={buttonState}
          >
            Cancel
          </button>
          <button
            type="button"
            className='main-btn'
            onClick={handleSubmit}
            disabled={buttonState}
          >
            Proceed
          </button>
        </div>
    </>
    )


    return (
    <Modal
    headerContent={removeFingerprintModalHeader}
    bodyContent={removeFingerprintModalBody}
    footerContent={removeFingerprintModalFooter}
    stateChecker={stateChecker}
    stateControl={stateControl}
    customWidth={'40%'}
    />
    )
}