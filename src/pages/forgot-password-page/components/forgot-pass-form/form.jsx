import React, { useEffect } from "react";
import '../../../../styles/auth-page/general.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Axios } from '../../../../config'
import { domain } from "../../../../constants";
import { handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../utils";

export default function ForgotPassFormLayout(props){
    const {openModal} = props
    const [emailData, setEmailData] = useState({});
    const {email} = emailData;
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({});
    useEffect(() => {
        setFormData({
            ...formData,
            'action': 'change-settings',
            'active-email': '',
            'account-action': 'change-password',
            'from-home': true,
        })
    }, [])
    console.log(formData)
    const handleChange = async(event) => {
        await handleChangeWrapper(event, formData, setFormData);
    }

    const handleSubmit = async(event) => { 
        if (!isFormDataValid(formData)) {
            setErrorMessage('Please fill out all fields!');
        } else {
            try {
                const response = await handleSubmitWrapper(event, formData);
                if (response.success) {
                    setErrorMessage('');
                    openModal((prev) => !prev);
                } else {
                    setErrorMessage(response.message ||'Submission failed!');
                }
            } catch (error) {
                setErrorMessage('Error: ', error)
            }
        }
        
    }
    return(<>
    
    <div className='d-flex form-layout justify-content-center'>
        <div className="input-details" style={{ width: '400px' }}>
            <label htmlFor="email" className="form-label" style={{ textAlign: 'left' }}>
                Email address<span className="form-required">*</span>
            </label>
            <input
                type="text"
                className="form-control mb-2"
                id="active-email"
                name="active-email"
                placeholder="Enter your email"
                onChange={handleChange}
            />
            <hr></hr>
                <button  className="back-btn btn-secondary mt-4" onClick={handleSubmit}>
                Send Request
                </button>
                <p className='error-message'>{errorMessage}</p>
            </div>
        </div>
    
    </>);
}

