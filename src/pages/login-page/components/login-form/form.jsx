import React, { useEffect } from "react";
import '../../../../styles/auth-page/general.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Axios } from '../../../../config'
import { DOMAIN } from "../../../../constants";
import '../../../../styles/buttons/general.css'
import { fetchDataWrapper, handleSubmitWrapper, handleChangeWrapper } from "../../../../utils";

export default function LoginFormLayout(){
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        "user-email": '',
        "user-password": '',
        "action": 'login-user'
      });
    const handleSubmit = async (event) => {
      try {
        const response = await handleSubmitWrapper(event, formData);
        if (response.success) {
          localStorage.setItem('login-token', response.user.login_token)
          localStorage.setItem('user-email', response.user.email)
          localStorage.setItem('bjmp-branch', response.user.bjmp_branch)
          navigate('/dashboard');
        } else {
          setErrorMessage(response.message || "Login failed"); 
        }
      } catch (error) {
        console.error('Error: ', error);
        setErrorMessage(`Error: ${error}`);
      }
    }
    const handleChange = async (event) => {
      await handleChangeWrapper(event, formData, setFormData);
  };
    return(
        <div className='d-flex form-layout justify-content-center'>
        <div className="input-details" style={{ width: '400px' }}>
          <form>
          <label htmlFor="email" className="form-label" style={{ textAlign: 'left' }}>
            Email address<span className='form-required'>*</span>
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="user-email"
            name="user-email"
            placeholder="Enter your email"
            value={formData['user-email'] || ''}
            onChange={handleChange}
          />

          <label htmlFor="password" className="form-label" style={{ textAlign: 'left' }}>
            Password<span className='form-required'>*</span>
          </label>
          <input
            type="password"
            className="form-control mb-2"
            id="user-password"
            name="user-password"
            placeholder="Enter your password"
            value={formData['user-password'] || ''}
            onChange={handleChange}
          />
          
            <button type="button" onClick={handleSubmit} className="back-btn btn-secondary mt-4" style={{marginBottom: '10px'}}>
              Login
            </button>
            </form>
            <p className="error-message">{errorMessage}</p>
          <hr />
          <div className='row'>
            <div className='col-12'>
              <Link to={"/forgot-pass"} style={{textDecoration: 'none'}}>
                <button type="button" className="hollow-btn"
>
                  Forgot Password
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
}

