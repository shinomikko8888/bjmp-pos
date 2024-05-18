import React from "react";

export default function LoadTopRowPage2(props){
    return(
        <>
            <div>
                <div className="row g-3 align-items-center">
                    <div className="col-6">
                        <label htmlFor="load-amount" className="col-form-label">Enter amount to load:<span className='form-required'>*</span></label>
                        <input type="number" id="load-amount" name="load-amount" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter amount" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="pdl-creditor" className="col-form-label">Select 'Paabot' Creditor:<span className='form-required'>*</span></label>
                            <select id="pdl-creditor" name="pdl-creditor" className="form-select" style={{ boxShadow: 'none' }}>
                                    <option value="" disabled hidden>Select 'paabot' creditor</option>
                        </select>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}