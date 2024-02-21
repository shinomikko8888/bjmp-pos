import React, { useEffect } from "react";
import '../../../../styles/auth-page/general.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Axios } from '../../../../config'
import { domain } from "../../../../constants";

export default function ForgotPassFormLayout(){
    const [emailData, setEmailData] = useState({});
    const {email} = emailData;
    const [errorMessage, setErrorMessage] = useState("");
  
    return(<>
    
    <form className='d-flex form-layout justify-content-center' onSubmit={'handleSubmit'}>
        <div className="input-details" style={{ width: '400px' }}>
            <label htmlFor="email" className="form-label" style={{ textAlign: 'left' }}>
                Email address<span className="form-required">*</span>
            </label>
            <input
                type="text"
                className="form-control mb-2"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={'handleChange'}
            />
            <hr></hr>
                <button type="submit" className="back-btn btn-secondary mt-4">
                Send Request
                </button>
                <p style={{color: 'red', fontSize: '16px', margin: '0'}}>{errorMessage}</p>
            </div>
        </form>
    
    </>);
}

