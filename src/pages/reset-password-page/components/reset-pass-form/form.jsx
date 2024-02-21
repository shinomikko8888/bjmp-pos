import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';


export default function ResetPassFormLayout(){
    const [passwordData, setPasswordData] = useState({});
    const {password, confirmPass} = passwordData;
    const [errorMessage, setErrorMessage] = useState("");
    return(<>
        <form className='d-flex form-layout justify-content-center' onSubmit={'handleSubmit'}>
                <div className="input-details" style={{ width: '400px' }}>
                <label htmlFor="password" className="form-label" style={{ textAlign: 'left' }}>
                        New Password<span className='form-required'>*</span>
                    </label>
                    <input
                        type="password"
                        className="form-control mb-2"
                        id="password" name="password"
                        placeholder="Enter your password"
                        onChange={'handleChange'}
                    />

                    <label htmlFor="confirmPass" className="form-label" style={{ textAlign: 'left' }}>
                        Confirm Password<span className='form-required'>*</span>
                    </label>
                    <input
                        type="password"
                        className="form-control mb-2"
                        id="confirmPass" name="confirmPass"
                        placeholder="Confirm your password"
                        onChange={'handleChange'}
                    />
                <hr></hr>
                    <button type="submit" className="nextBtn btn-secondary mt-4">
                    Send Request
                    </button>
                    <p style={{color: 'red', fontSize: '16px', margin: '0'}}>{errorMessage}</p>
                </div>
            </form>
    </>);


}


