import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components";
import { handleChangeWrapper, handleSubmitWrapper } from "../../../../utils";
import { DOMAIN } from "../../../../constants";

export default function LoadDetails(props){
    const {stateControl, stateChecker, loadData, setLoadData, isSubmitted, isSubmittedControl, setResultValue} = props
    const [confirmChecked, setConfirmChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonState, setButtonState] = useState(false);
    
    const handleChange = async (event) => {
        await handleChangeWrapper(event, loadData, setLoadData)
        if (event.target.name === 'confirm-checkbox') {
            setConfirmChecked(event.target.checked);
        }
    }

    const handleSubmit = async (event) => {
        try {
            
            if (confirmChecked) {
                setButtonState(true);
                const response = await handleSubmitWrapper(event, loadData);
                if(response.success){
                    setResultValue(`${(loadData['pdl-data'] && loadData['load-amount']) && ((parseFloat(loadData['load-amount']) + parseFloat(loadData['pdl-data']['pdl-balance'])).toFixed(2)) }`);
                    stateControl((prev) => !prev)
                    isSubmittedControl((prev) => !prev)
                    setButtonState(false);
                    window.open(`${DOMAIN}/files/docs/receipts/load/${response.filepath}`, '_blank');
                }
            } else {
                setErrorMessage('Please check the terms before submitting')
                setButtonState(false);
            }
        } catch (error) {
            console.error('Error: ', error);
            setErrorMessage('Error: ', error);
            setButtonState(false);
        }
        
    }

    const loadDetailsHeader = (
        <>
            <div className='row w-100'>
                <div className='col-12 d-flex align-items-center'>
                <i className='fa-solid fa-receipt'></i>
                <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>Load Details</h6>
                </div>
            </div>
        </>
    )
    const loadDetailsBody = (
        <>
            <div className="row g-3 align-items-center my-2">
                <label htmlFor="pdl-id" className="col-form-label d-block m-0">
                    <b>PDL No.:</b>
                    <h6>PDL#{loadData['pdl-data'] && loadData['pdl-data']['pdl-id']}</h6>
                </label>
                <label htmlFor="pdl-full-name" className="col-form-label d-block m-0">
                    <b>PDL's Full Name:</b>
                    <h6>{`${loadData['pdl-data'] && (loadData['pdl-data']['pdl-last-name']).toUpperCase()}, ${loadData['pdl-data'] && loadData['pdl-data']['pdl-first-name']} ${loadData['pdl-data'] && loadData['pdl-data']['pdl-middle-name']}`}</h6>
                </label>
                <label htmlFor="pdl-creditor-full-name" className="col-form-label d-block m-0">
                    <b>'Paabot' Creditor's Full Name:</b>
                    <h6>{loadData['pdl-creditor'] && loadData['pdl-creditor']}</h6>
                </label>
                <label htmlFor="pdl-old-balance" className="col-form-label d-block m-0">
                    <b>Old Balance</b>
                    <h6>₱{loadData['pdl-data'] && loadData['pdl-data']['pdl-balance']}</h6>
                </label>
                <label htmlFor="amount-loaded" className="col-form-label d-block m-0">
                    <b>Amount Loaded:</b>
                    <h6>₱{loadData['load-amount'] && parseFloat(loadData['load-amount']).toFixed(2)}</h6>
                </label>
                <label htmlFor="pdl-new-balance" className="col-form-label d-block m-0">
                    <b>New Balance:</b>
                    <h6>₱{(loadData['pdl-data'] && loadData['load-amount']) && ((parseFloat(loadData['load-amount']) + parseFloat(loadData['pdl-data']['pdl-balance'])).toFixed(2)) }</h6>
                </label>
                <hr className="m-0 p-0"></hr>
                <div className="d-flex align-items-center mt-2">
                    <input type="checkbox" id="confirm-checkbox" name="confirm-checkbox" className="form-check-input" onChange={handleChange} />
                    <label htmlFor="confirm-checkbox" className="col-form-label m-0 ms-2 text-muted">
                        I bear witness to this transaction and I will be held accountable if there are dire consequences that are related to this transaction.
                    </label>
                </div>
            </div>
            
        </>
    )
    const loadDetailsFooter = (
        <>
            <div className="d-flex justify-content-end">
                <p className="error-message mx-3">{errorMessage}</p>
                <button type="button" className="link-btn" onClick={() => stateControl((prev) => !prev)} disabled={buttonState}>
                    Discard
                    </button>
                <button type="button" className="main-btn" onClick={handleSubmit} disabled={!confirmChecked || buttonState}>Submit</button>
            </div>
        </>
    )
    return(
        <Modal 
        headerContent={loadDetailsHeader}
        bodyContent={loadDetailsBody}
        footerContent={loadDetailsFooter}
        stateControl={stateControl}
        stateChecker={stateChecker}
        customWidth={'30%'}
        customZIndex={30}
        />
    )
}