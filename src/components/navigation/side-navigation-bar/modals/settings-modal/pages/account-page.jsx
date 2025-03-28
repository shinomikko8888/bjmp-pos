import React, { useState } from 'react'

export default function AccountSettings(props){
    const {conf, openConf, formData, handleChange, setIsLogout} = props
    const [errorMessage, setErrorMessage] = useState('');
    return (
        <>
            <div className='row g-3 align-items-center'>
                <label htmlFor="change-email" className="col-form-label">Change Email:</label>
                <div className="col-12 d-flex m-0">
                    <input type="email" id="change-email" name="change-email" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter new email" value={formData['change-email'] || ''} onChange={handleChange}/>
                    <button className='main-btn ms-4' disabled={formData['change-email'] === localStorage.getItem('user-email')} onClick={() => {conf('email');
                        openConf();
                        setIsLogout(true)}}>Confirm</button>
                </div>
            </div>
            <div className='row g-3 align-items-center'>
                <div className="col-6">
                    <label htmlFor="change-email" className="col-form-label">Request Password Change:</label>
                    <button className='main-btn w-100' onClick={() => {conf('password'); openConf(); setIsLogout(true)  }}>Request</button>
                </div>
                <div className="col-6">
                    <label htmlFor="change-email" className="col-form-label">Archive Account:</label>
                    <button className='main-btn-red w-100' onClick={() => {conf('archive'); openConf(); setIsLogout(true) }}>Archive</button>
                </div>
            </div>
        </>
    )
}
