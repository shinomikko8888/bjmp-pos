import React, { useEffect, useState } from 'react'
import Modal from '../../../../../modals';
import { handleSubmitWrapper, isFormDataValid } from '../../../../../../utils';

export default function ConfirmPasswordModal(props){
    const {fromWhere, stateChecker, stateControl, formData, setFormData, handleChange, setAction, isSubmittedControl, fetchData} = props;
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        setFormData({
            ...formData,
            'confirm-password': '',
            'action': 'change-settings',
            'bjmp-branch': localStorage.getItem('bjmp-branch'),
            'active-email': localStorage.getItem('user-email'),
            'account-action': (() => {
                switch (fromWhere) {
                    case 'email':
                        return 'change-email';
                    case 'password':
                        return 'change-password';
                    case 'archive':
                        return 'archive-account';
                    case 'spending':
                        return 'spending-total';
                    default:
                        return ''; 
                }
            })()
        })
        setErrorMessage('');
    }, [fromWhere, stateChecker])

    const handleSubmit = async (event) => {
        try {
            if(!isFormDataValid(formData)){
                setErrorMessage('Please input your password')
            } else {
                
                setErrorMessage('')
                const response = await handleSubmitWrapper(event, formData);
                if(response.success){
                    stateControl((prev) => !prev);
                    isSubmittedControl((prev) => !prev);
                    fetchData();
                    setAction({
                        title: response.title,
                        description: response.description
                    })
                    if(fromWhere !== 'spending'){
                        localStorage.clear();
                    }
                } else {
                    setErrorMessage(response.message || "Password doesn't match")
                }
            }
            
        } catch (error) {
            
        }
    }

    const confirmPassHeader = (
        <>
            <div className='row w-100'>
                <div className='col-12 d-flex align-items-center'>
                <i className="fa-solid fa-lock"></i>
                <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>Confirm Password</h6>
                </div>
            </div>
        </>
    )
    const confirmPassBody = (
        <>
           <label className="col-form-label m-0 text-muted">Before we confirm this action. We need to make sure you are the right user. Please enter your password</label>
           <div>
                <input type="password" name="confirm-password" id="confirm-password" className='form-control' placeholder='Enter password' value={formData['confirm-password'] || ''} onChange={handleChange}/>
           </div>
        </>
    )
    const confirmPassFooter = (
        <>
            <div className='d-flex align-items-center justify-content-end'>
                <p className="error-message">{errorMessage}</p>
                <button type="button" className='link-btn mx-2' onClick={() => stateControl((prev) => !prev)}>Cancel</button>
                <button type="button" className='main-btn' onClick={handleSubmit} >Proceed</button>
            </div>
           
        </>
    )
    return <Modal
        headerContent={confirmPassHeader}
        bodyContent={confirmPassBody}
        footerContent={confirmPassFooter}
        stateChecker={stateChecker}
        stateControl={stateControl}
        customWidth={'35%'}
    />
}
