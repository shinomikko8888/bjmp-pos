import React from "react";
import { Modal } from "../../../../components";

export default function LoadDetails(props){
    const {stateControl, stateChecker} = props
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
                    <h6>PDL#000001</h6>
                </label>
                <label htmlFor="pdl-full-name" className="col-form-label d-block m-0">
                    <b>PDL's Full Name:</b>
                    <h6>DELA CRUZ, Juan Tamad</h6>
                </label>
                <label htmlFor="pdl-creditor-full-name" className="col-form-label d-block m-0">
                    <b>'Paabot' Creditor's Full Name:</b>
                    <h6>DELA CRUZ, Maria Santos</h6>
                </label>
                <label htmlFor="pdl-old-balance" className="col-form-label d-block m-0">
                    <b>Old Balance</b>
                    <h6>₱100.00</h6>
                </label>
                <label htmlFor="amount-loaded" className="col-form-label d-block m-0">
                    <b>Amount Loaded:</b>
                    <h6>₱100.00</h6>
                </label>
                <label htmlFor="pdl-new-balance" className="col-form-label d-block m-0">
                    <b>New Balance:</b>
                    <h6>₱200.00</h6>
                </label>
                <hr className="m-0 p-0"></hr>
                <div className="d-flex align-items-center mt-2">
                    <input type="checkbox" id="confirm-checkbox" className="form-check-input" />
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
                <button type="button" className="link-btn" onClick={() => stateControl((prev) => !prev)}>
                    Discard
                    </button>
                <button type="button" className="main-btn">Submit</button>
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
        customWidth={'20%'}
        customZIndex={30}
        />
    )
}