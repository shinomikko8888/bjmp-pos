import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from '../../../../utils';


export default function ResetPassFormLayout(props){
    const {openModal} = props
    const urlparams = new URLSearchParams(window.location.search);
    const resettoken = urlparams.get('resettoken');
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const handleChange = async(event) => {
        await handleChangeWrapper(event, formData, setFormData);
    }
    useEffect(() => {
        setFormData({
            ...formData,
            'password': '',
            'confirm-pass': '',
            'action': 'change-password',
            'reset-token': resettoken,
        })
    }, [])

    const handleSubmit = async(event) => {
        if (formData['password'] !== formData['confirm-pass']) {
            setErrorMessage('Passwords must match!');
        } else if (!isFormDataValid(formData)) {
            setErrorMessage('Please fill out all fields!');
        } else {
            try {
                const response = await handleSubmitWrapper(event, formData);
                if (response.success) {
                    setErrorMessage('');
                    openModal((prev) => !prev);
                } else {
                    setErrorMessage('Submission failed!');
                }
            } catch (error) {
                setErrorMessage('An error occurred during submission!');

            }
        }
        
    }
    return(<>
        <div className='d-flex form-layout justify-content-center' >
                <div className="input-details" style={{ width: '400px' }}>
                <label htmlFor="password" className="form-label" style={{ textAlign: 'left' }}>
                        New Password<span className='form-required'>*</span>
                    </label>
                    <input
                        type="password"
                        className="form-control mb-2"
                        id="password" name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />

                    <label htmlFor="confirmPass" className="form-label" style={{ textAlign: 'left' }}>
                        Confirm Password<span className='form-required'>*</span>
                    </label>
                    <input
                        type="password"
                        className="form-control mb-2"
                        id="confirm-pass" name="confirm-pass"
                        placeholder="Confirm your password"
                        onChange={handleChange}
                    />
                <hr></hr>
                    <button type="submit" className="nextBtn btn-secondary mt-4" onClick={handleSubmit}>
                    Send Request
                    </button>
                    <p className='error-message'>{errorMessage}</p>
                </div>
            </div>
    </>);


}


