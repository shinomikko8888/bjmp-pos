import React from "react";

export default function LoadTopRowPage1(props){
    return(
        <>
            <div>
                <div className="row g-3 align-items-center">
                    <div className="col-12">
                        <label htmlFor="pdl-information" className="col-form-label">Enter PDL:<span className='form-required'>*</span></label>
                        <input type="text" id="pdl-information" name="pdl-information" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter PDL Information" />
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col-12">
                        <label htmlFor="loading-type" className="col-form-label">Load Type:<span className='form-required'>*</span></label>
                        <select id="loading-type" name="loading-type" className="form-select" style={{ boxShadow: 'none' }}>
                                <option value="" disabled hidden>Select load type</option>
                                <option value="Livelihood">Livelihood</option>
                                <option value="Visitor">Visitor</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )

}