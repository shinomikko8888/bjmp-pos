import React, { useEffect } from "react";
import '../../../../styles/auth-page/general.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Axios } from '../../../../config'
import { domain } from "../../../../constants";

export default function LoginFormLayout(){
    const [imageSrc, setImageSrc] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    useEffect(() => {
        Axios.get(`${domain}/index.php`).then(
          response => {
            const imageUrl = response.data[0].logo_path;
            const fileName = imageUrl ? imageUrl.split('/').pop() : null;
            setImageSrc(fileName);
          }
        )
    
    }, [])

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
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={'handleChange'}
          />

          <label htmlFor="password" className="form-label" style={{ textAlign: 'left' }}>
            Password<span className='form-required'>*</span>
          </label>
          <input
            type="password"
            className="form-control mb-2"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={'handleChange'}
          />
          
            <button type="button" onClick={'handleSubmit'} className="back-btn btn-secondary mt-4" style={{marginBottom: '10px'}}>
              Login
            </button>
            </form>
            <p style={{color: 'red', fontSize: '16px', margin: '0'}}>{errorMessage}</p>
          <hr />
          <div className='row'>
            <div className='col-12'>
              <Link className='hollow-btn' to={"/forgot-pass"}>
                <button type="button" className="mt-2"
                  style={{
                    background: '#ffffff',
                    border: '2px solid #D0D3D9',
                    color: '#5D6679',
                  }}>
                  Forgot Password
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
}

