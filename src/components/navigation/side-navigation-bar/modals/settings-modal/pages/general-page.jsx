import React from 'react'

export default function GeneralSettings(props){
    const {formData, handleChange, conf, openConf, spendingLimit, userType} = props
    return (
        <>  
        
            <div className='row g-3 align-items-center'>
                <label htmlFor="spending-limit" className="col-form-label">{userType === 'Administrator' && 'Change'} Spending Limit:</label>
                <div className="col-12 d-flex m-0">
                    <input type="number" id="spending-limit" name="spending-limit" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter spending limit" value={parseFloat(formData['spending-limit']) || ''} onChange={handleChange} 
                    disabled={userType != 'Administrator'}/>
                    <button className='main-btn ms-4' disabled={spendingLimit === formData['spending-limit']} onClick={() => {
                        conf('spending'); 
                        openConf()  
                    }} style={{display: userType !== 'Administrator' && 'none'}}>Confirm</button>
                </div>
            </div>
            <div className='row g-3 align-items-center'>
                <label htmlFor="bjmp-logo" className="col-form-label">Fingerprint Reader:</label>
                <div className="col-12 d-flex m-0">
                    <select className='form-select' value="">
                        <option value="" disabled hidden>--Select Reader--</option>
                    </select>
                    <button className='main-btn ms-4'>Confirm</button>
                </div>
                <label htmlFor="bjmp-logo" className="col-form-label m-0 text-muted">Note: Fingerprint Reader can only accept SecuGen branded readers. For more inquiries, contact the page administrator.</label>
            </div>
        </>
    )
}
