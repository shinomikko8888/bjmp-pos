import React from "react";

export default function SearchPdlForm(props) {

    return(
        <>
        <div>
            <label className="col-form-label">Selected PDL:<span className='form-required'>*</span></label>
            <input className="text-input" id="pdl-info" name="pdl-info" placeholder="Enter PDL Info"></input>
        </div>
        <div className="mt-3">
            <label className="col-form-label">PDL Full Name:</label>
            <h4>XXXXXXXXXX</h4>
        </div>
        <div className="mt-3">
            <label  className="col-form-label">Balance:</label>
            <h4>XX.XX</h4>
        </div>
        <div className="mt-3">
            <label className="col-form-label">Payment Method:</label>
            <div className="custom-select-wrapper">
                <select >
                    <option className="pdl-modal-option" value="Biometrics">Biometrics</option>
                    <option className="pdl-modal-option" value="Permission">Permission</option>
                </select>
            </div>
            
        </div>
        <div className="my-3 d-flex align-items-center">
            <input type="checkbox" id="payment-method" className="form-check-input mx-2" disabled/>
            <label htmlFor="payment-method" className="col-form-label ml-2 my-0">I have permission to conduct this transaction according to the warden in command.</label>
        </div>
        <div className="my-3">
            <label  className="col-form-label">Fingerprint ID:</label>
            <h4>Not Available</h4>
        </div>
        <hr></hr>
        <div className="d-flex align-items-center justify-content-between">
            <h5>Total: </h5>
            <h5>XX.XX </h5>
        </div>
        </>
    )
}